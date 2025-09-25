import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { Head, useForm } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { id } from "date-fns/locale";
import axios from "axios";

const HOURS_AHEAD = 5;
const Add = ({ auth, services, employees, config }) => {
    const [reservedTimes, setReservedTimes] = useState([]);
    const { data, setData, post, processing, reset } = useForm({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        date: new Date(),
        time: "",
        date_display: "",
        artist_id: "",
        service_id: "",
    });

    const options = employees.map((employee) => ({
        value: employee.id,
        label: employee.name,
        image: (
            <img
                src={`/storage/${employee.image}`}
                className="rounded-full"
                width="40"
                alt={employee.name}
                style={{ marginRight: 10 }}
            />
        ),
    }));

    const customOption = ({ label, image }) => (
        <div
            className="text-sm font-inter text-black py-2"
            style={{ display: "flex", alignItems: "center", zIndex: 100 }}
        >
            {image}
            {label}
        </div>
    );

    // Saat pilih hair artist
    function handleSelectChange(selectedOption) {
        setData({
            ...data,
            artist_id: selectedOption.value, // simpan ID artist
            service_id: "", // reset layanan
        });
    }

    // Filter service berdasarkan artist terpilih
    const filteredServices = services.filter(
        (service) => service.employee_id === data.artist_id
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("dashboard.reservation.store"), {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Data berhasil ditambahkan.",
                    confirmButtonText: "Ok",
                    customClass: {
                        popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                        title: "text-sm font-bold font-inter text-blue-700",
                        htmlContainer:
                            "text-foreground text-xs font-inter text-foreground",
                        confirmButton:
                            "bg-blue-700 text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700",
                    },
                });
                reset();
            },
            onError: (errors) => {
                const firstError =
                    errors.customer_name ||
                    errors.customer_phone ||
                    errors.customer_email ||
                    errors.date ||
                    errors.time ||
                    errors.service_id ||
                    "Periksa kembali data yang Anda masukkan";
                Swal.fire({
                    title: "Gagal!",
                    text: firstError,
                    confirmButtonText: "Ok",
                    customClass: {
                        popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                        title: "text-sm font-bold font-inter text-red-700",
                        htmlContainer:
                            "text-foreground text-xs font-inter text-foreground",
                        confirmButton:
                            "bg-red-600 text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-600",
                    },
                });
            },
        });
    };

    const handleCalendarChange = (date) => {
        if (!date) return;

        const formattedDisplay = date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const dateOnly = date.toLocaleDateString("sv-SE");

        setData({
            ...data,
            date: dateOnly,
            date_display: formattedDisplay,
        });
    };

    const today = new Date();

    useEffect(() => {
        if (!data.date) return;

        const fetchReservedTimes = async () => {
            try {
                const response = await axios.get(`/api/reservations`, {
                    params: { date: data.date, service_id: data.service_id },
                });
                // backend sebaiknya return array of string jam ["09:00", "13:00", ...]
                setReservedTimes(response.data);
            } catch (error) {
                console.error("Gagal mengambil data reservasi:", error);
                setReservedTimes([]);
            }
        };

        fetchReservedTimes();
    }, [data.date, data.service_id]);

    const getAvailableTimes = () => {
        if (!config?.open_time || !config?.closing_time) return [];

        const openHour = parseInt(config.open_time.split(":")[0], 10);
        const closeHour = parseInt(config.closing_time.split(":")[0], 10);

        let startHour = openHour;
        const now = new Date();

        // Pastikan selectedDateObj aman dari shifting timezone
        let selectedDateObj;
        if (typeof data.date === "string") {
            const [y, m, d] = data.date.split("-").map(Number);
            selectedDateObj = new Date(y, m - 1, d);
        } else if (data.date instanceof Date) {
            selectedDateObj = new Date(
                data.date.getFullYear(),
                data.date.getMonth(),
                data.date.getDate()
            );
        } else {
            return [];
        }

        // Jika tanggal terpilih adalah hari ini → terapkan aturan HOURS_AHEAD
        if (
            selectedDateObj.getFullYear() === now.getFullYear() &&
            selectedDateObj.getMonth() === now.getMonth() &&
            selectedDateObj.getDate() === now.getDate()
        ) {
            let minHour = now.getHours() + HOURS_AHEAD;
            if (now.getMinutes() > 0) minHour += 1;
            startHour = Math.max(startHour, minHour);
            if (startHour > closeHour) return [];
        }

        // Buat daftar jam
        const times = [];
        for (let h = startHour; h <= closeHour; h++) {
            times.push(`${String(h).padStart(2, "0")}:00`);
        }

        // Filter jam yang sudah direservasi
        return times.filter((t) => !reservedTimes.includes(t));
    };

    // getAvailableTimes() akan otomatis exclude jam yang sudah reserved
    const availableTimes = getAvailableTimes();

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Reservasi" />

            <div className="w-full h-auto md:px-2 pt-5 pb-36 bg-white md:bg-transparent shadow rounded-3xl px-5 md:shadow-none md:rounded-none">
                <div className="mb-5">
                    <BackButton href={route("dashboard.reservations")} />

                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Buat Reservasi
                    </h1>
                    <p className="text-xs font-normal text-black">
                        Masukkan informasi pada formulir berikut
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="customer_name"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Nama Customer
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            required
                            id="customer_name"
                            name="customer_name"
                            autoComplete="off"
                            value={data.customer_name}
                            onChange={(e) =>
                                setData("customer_name", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="customer_phone"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Nomor Telepon
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            required
                            id="customer_phone"
                            name="customer_phone"
                            placeholder="628xxxxxxx"
                            autoComplete="off"
                            value={data.customer_phone}
                            onChange={(e) =>
                                setData("customer_phone", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="customer_email"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Email (Opsional)
                        </label>
                        <input
                            type="email"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            
                            id="customer_email"
                            name="customer_email"
                            autoComplete="off"
                            value={data.customer_email}
                            onChange={(e) =>
                                setData("customer_email", e.target.value)
                            }
                        />
                    </div>

                    {/* Pilih Hair Artist */}
                    <div>
                        <h1 className="text-xs mb-2 font-medium">
                            Pilih Hair Artist
                        </h1>

                        <Select
                            placeholder="Pilih Hair Artist..."
                            value={options.find(
                                (option) => option.value === data.artist_id
                            )}
                            onChange={handleSelectChange}
                            options={options}
                            isSearchable
                            formatOptionLabel={customOption}
                        />
                    </div>

                    {/* Pilih Layanan */}
                    {data.artist_id && (
                        <div className="space-y-2">
                            <h1 className="text-xs mb-2 font-medium">
                                Layanan
                            </h1>

                            <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-2">
                                {filteredServices.map((srv) => (
                                    <label
                                        key={srv.id}
                                        className={clsx(
                                            "flex items-center text-xs font-bold capitalize px-3 border p-2 gap-2 rounded-lg cursor-pointer",
                                            data.service_id === srv.id
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-50"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="service_id"
                                            // className="hidden"
                                            value={srv.id}
                                            checked={data.service_id === srv.id}
                                            onChange={() =>
                                                setData("service_id", srv.id)
                                            }
                                        />
                                        <div className="flex flex-col w-full">
                                            <span className="mb-1">
                                                {srv.service_item.service_name}
                                            </span>
                                            {srv.employee
                                                .is_conditional_serve == 0 ? (
                                                <div className="flex items-center justify-between font-normal">
                                                    <span>Harga</span>
                                                    <span className="font-bold">
                                                        {formatRupiah(
                                                            srv.normal_price
                                                        )}
                                                    </span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between font-normal">
                                                        <span>Weekday</span>
                                                        <span className="font-bold">
                                                            {formatRupiah(
                                                                srv.weekday_price
                                                            )}
                                                        </span>
                                                    </div>
                                                    <hr className="my-1 border-neutral-100" />
                                                    <div className="flex items-center justify-between font-normal">
                                                        <span>Weekend</span>
                                                        <span className="font-bold">
                                                            {formatRupiah(
                                                                srv.weekend_price
                                                            )}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}


                    {data.service_id && (
                        <>
                        <h1 className="text-xs font-medium">Pilih Tanggal & Jam</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        <div className="w-fit md:w-full bg-white border border-gray-300 rounded-md shadow-sm p-4">
                            <DayPicker
                                mode="single"
                                selected={
                                    data.date ? new Date(data.date) : today
                                }
                                onSelect={(date) => handleCalendarChange(date)}
                                locale={id}
                                disabled={{ before: today }} // ⬅ ini mencegah pilih tanggal sebelum hari ini
                                className="text-sm"
                                styles={{
                                    caption: {
                                        textAlign: "center",
                                        fontWeight: 600,
                                    },
                                    head_cell: {
                                        textTransform: "none",
                                        fontSize: "0.5rem",
                                        color: "#6b7280",
                                    },
                                    day: {
                                        borderRadius: "50%",
                                        padding: "0",
                                        fontSize: "12px",
                                    },
                                    day_selected: {
                                        backgroundColor: "#c2185b",
                                        color: "white",
                                    },
                                    day_today: {
                                        border: "1px solid #c2185b",
                                        color: "#c2185b",
                                    },
                                }}
                                footer={
                                    <div className="text-right mt-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCalendarChange(today)
                                            }
                                            className="text-xs text-c2185b hover:underline font-medium"
                                        >
                                            Hari ini
                                        </button>
                                    </div>
                                }
                            />

                            {data.date_display && (
                                <p className="text-sm text-gray-500 mt-3 text-center">
                                    {data.date_display}
                                </p>
                            )}
                        </div>

                        {data.date && (
                            <div className="lg:col-span-2 p-4 border rounded-md text-xs border-gray-300 shadow-sm">
                                <label className="block mb-1 font-medium">
                                    Pilih Jam
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {availableTimes.length > 0 ? (
                                        availableTimes.map((time) => (
                                            <button
                                                type="button"
                                                key={time}
                                                className={`border rounded-lg p-2 text-center ${
                                                    data.time === time
                                                        ? "bg-black text-white"
                                                        : "hover:bg-gray-100"
                                                }`}
                                                onClick={() =>
                                                    setData({ ...data, time })
                                                }
                                            >
                                                {time}
                                            </button>
                                        ))
                                    ) : (
                                        <span>Tidak ada jam tersedia</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                        </>
                    )}

                    <div className="pt-4">
                        <button
                            disabled={processing}
                            className="px-5 py-2.5 font-[Montreal-Medium] tracking-wide rounded bg-blue-700 border border-blue-700 hover:text-blue-700 hover:bg-white text-white text-xs w-full transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;
