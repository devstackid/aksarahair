import { Head, Link, useForm, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { id } from "date-fns/locale";
import axios from "axios";
import GuestLayout from "@/Layouts/GuestLayout";
import { FaChevronLeft } from "react-icons/fa6";
import SkeletonComponent from "./Components/Skeleton";
import { Spinner } from "@radix-ui/themes";

const HOURS_AHEAD = 5;
const Reservation = ({ services, employees, config }) => {
    const today = new Date();

    const [isLoadingTime, setIsLoadingTime] = useState(false);
    const [reservedTimes, setReservedTimes] = useState([]);
    const { data, setData, post, processing, reset } = useForm({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        date: today.toLocaleDateString("sv-SE"), // format YYYY-MM-DD
    date_display: today.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }),
        time: "",
        artist_id: "",
        is_conditional_serve: "",
        artist_name: "",
        artist_image: "",
        service_id: "",
        service_name: "",
        normal_price: "",
        weekday_price: "",
        weekend_price: "",
    });

    const options = employees.map((employee) => ({
        value: employee.id,
        label: employee.name,
        img: employee.image,
        is_conditional_serve: employee.is_conditional_serve,
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
            className="text-sm font-[Montreal-Medium] tracking-wide text-black"
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
            artist_name: selectedOption.label, // simpan ID artist
            artist_image: selectedOption.img, // simpan ID artist
            is_conditional_serve: selectedOption.is_conditional_serve, // simpan ID artist
            service_id: "", // reset layanan
            service_name: "",
            normal_price: "",
            weekday_price: "",
            weekend_price: "",
        });
    }

    // Filter service berdasarkan artist terpilih
    const filteredServices = services.filter(
        (service) => service.employee_id === data.artist_id
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !data.customer_name ||
            !data.customer_phone ||
            !data.date ||
            !data.time ||
            !data.service_id
        ) {
            Swal.fire({
                title: "Data Tidak Lengkap",
                text: "Silakan periksa kembali dan lengkapi semua data sebelum melanjutkan.",
                confirmButtonText: "Mengerti",
                customClass: {
                    popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                    title: "text-sm font-[Montreal-Medium] text-black tracking-wide text-black",
                    htmlContainer:
                        "text-foreground text-xs font-inter text-foreground",
                    confirmButton:
                        "bg-black text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-white hover:text-black",
                },
            });
            return;
        }

        try {
            const response = await axios.post(
                route("reservation.store"),
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const reservation = response.data.reservation;

            const { id } = reservation;

            const {
                customer_name,
                customer_phone,
                date_display,
                time,
                service_name,
                artist_name,
                normal_price,
                weekday_price,
                is_conditional_serve,
                weekend_price,
            } = data;

            let hargaText = "";
            if (is_conditional_serve == 1) {
                hargaText = `*Weekday* : Rp${Number(
                    weekday_price
                ).toLocaleString()}\n*Weekend* : Rp${Number(
                    weekend_price
                ).toLocaleString()}`;
            } else {
                hargaText = `*Total*   : Rp${Number(
                    normal_price
                ).toLocaleString()}`;
            }

            const message = `*Konfirmasi Reservasi*

Halo Admin, saya ingin melakukan reservasi dengan detail berikut:

*Nama*      : ${customer_name}
*No. HP*    : ${customer_phone}
*Tanggal*   : ${date_display}
*Jam*         : ${time} WITA
*Layanan*   : ${service_name}
*Artist*      : ${artist_name}
${hargaText}

Terima kasih`;

            const adminPhone = config.whatsapp;
            window.open(
                `https://wa.me/${adminPhone}?text=${encodeURIComponent(
                    message
                )}`,
                "_blank"
            );

            window.location.href = `/reservation/history/${id}`;
        } catch (error) {
            const errors = error.response?.data?.errors || {};
            const firstError =
                errors.customer_name ||
                errors.customer_phone ||
                errors.customer_email ||
                errors.date ||
                errors.time ||
                errors.service_id ||
                "Periksa kembali data yang Anda masukkan";

            Swal.fire({
                title: "Terjadi Kesalahan",
                text: firstError,
                confirmButtonText: "Mengerti",
                customClass: {
                    popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                    title: "text-sm font-[Montreal-Medium] text-black tracking-wide text-black",
                    htmlContainer:
                        "text-foreground text-xs font-inter text-foreground",
                    confirmButton:
                        "bg-black text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-white hover:text-black",
                },
            });
        }
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


    useEffect(() => {
        if (!data.date || !data.service_id || !data.artist_id) return;

        let isMounted = true;

        const fetchReservedTimes = async () => {
            setIsLoadingTime(true);
            try {
                const response = await axios.get(`/api/reservations`, {
                    params: {
                        date: data.date,
                        service_id: data.service_id,
                        artist_id: data.artist_id,
                    },
                });
                if (isMounted) {
                    setReservedTimes(response.data || []);
                    setIsLoadingTime(false);
                }
            } catch (error) {
                if (isMounted) setReservedTimes([]);
                setIsLoadingTime(false);
            }
        };

        fetchReservedTimes();

        return () => {
            isMounted = false;
        };
    }, [data.date, data.service_id, data.artist_id]);

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
        <GuestLayout>
            <Head title="Buat Reservasi" />

            <div className="px-5 lg:px-20 sticky top-0 flex items-center bg-white shadow md:shadow-none z-[800] justify-between border-gray-100 border-b h-[55px]">
                <div className="flex items-center gap-3">
                    <Link
                        href={route("index")}
                        className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white border border-transparent hover:bg-white hover:text-black transition"
                    >
                        <FaChevronLeft className="w-3 h-3" />
                    </Link>
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Reservasi
                    </h1>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10 pb-36 px-2 md:px-5 lg:px-20"
            >
                <div className="lg:col-span-2 bg-white border shadow md:shadow-none border-gray-100 rounded-3xl h-full p-7">
                    {/* Pilih Hair Artist */}
                    <div className="mb-5">
                        <h1 className="text-sm mb-5 font-[Montreal-Medium] tracking-wide">
                            Pilih Hair Artist
                        </h1>

                        <Select
                            placeholder="Pilih Hair Artist..."
                            className="text-xs"
                            value={options.find(
                                (option) => option.value === data.artist_id
                            )}
                            onChange={handleSelectChange}
                            options={options}
                            isSearchable
                            formatOptionLabel={customOption}
                        />
                    </div>

                    <h1 className="text-sm mb-5 font-[Montreal-Medium] tracking-wide">
                        Pilih Layanan
                    </h1>

                    {/* Pilih Layanan */}
                    {data.artist_id ? (
                        <div className="space-y-2">
                            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-2 gap-2">
                                {filteredServices.map((srv) => (
                                    <label
                                        key={srv.id}
                                        className={clsx(
                                            "flex items-center text-xs font-[Montreal-Medium] tracking-wide capitalize px-3 border p-2 gap-2 rounded-lg cursor-pointer",
                                            data.service_id === srv.id
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-50"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="service_id"
                                            value={srv.id}
                                            className="hidden"
                                            checked={
                                                Number(data.service_id) ===
                                                Number(srv.id)
                                            }
                                            onChange={() =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    service_id: srv.id,
                                                    service_name:
                                                        srv.service_item
                                                            .service_name,
                                                    normal_price:
                                                        srv.normal_price,
                                                    weekday_price:
                                                        srv.weekday_price,
                                                    weekend_price:
                                                        srv.weekend_price,
                                                }))
                                            }
                                        />

                                        <div className="flex flex-col w-full">
                                            <span className="mb-1">
                                                {srv.service_item.service_name}
                                            </span>
                                            {srv.employee
                                                .is_conditional_serve == 0 ? (
                                                <div className="flex items-center justify-between font-[Montreal-Book] tracking-wide">
                                                    <span>Harga</span>
                                                    <span className="font-[Montreal-Medium] tracking-wide">
                                                        {formatRupiah(
                                                            srv.normal_price
                                                        )}
                                                    </span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between font-[Montreal-Book] tracking-wide mb-1">
                                                        <span>Weekday</span>
                                                        <span className="font-[Montreal-Medium] tracking-wide">
                                                            {formatRupiah(
                                                                srv.weekday_price
                                                            )}
                                                        </span>
                                                    </div>
                                                    {/* <hr className="my-1 border-neutral-100" /> */}
                                                    <div className="flex items-center justify-between font-[Montreal-Book] tracking-wide">
                                                        <span>Weekend</span>
                                                        <span className="font-[Montreal-Medium] tracking-wide">
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
                    ) : (
                        <SkeletonComponent />
                    )}

                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide mt-5 mb-5">
                        Pilih Tanggal & Jam
                    </h1>
                    {data.service_id ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 overflow-hidden">
                                <div className="w-full overflow-x-auto lg:overflow-hidden md:w-full bg-white border border-gray-100 rounded-md shadow-sm p-4">
                                    <DayPicker
                                        mode="single"
                                        selected={
                                            data.date
                                                ? new Date(data.date)
                                                : today
                                        }
                                        onSelect={(date) =>
                                            handleCalendarChange(date)
                                        }
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
                                                        handleCalendarChange(
                                                            today
                                                        )
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
                                    <div className="p-4 border rounded-md text-xs border-gray-100 shadow-sm">
                                        <label className="block mb-3 text-sm font-[Montreal-Medium] tracking-wide text-black">
                                            Pilih Jam
                                        </label>
                                        {isLoadingTime ? (
                                            <div className="w-full h-full flex items-center gap-2 justify-center">
                                                <Spinner size={3} />{" "}
                                                <span className="text-sm">
                                                    Sedang Mencari..
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full">
                                                {availableTimes.length > 0 ? (
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                        {availableTimes.map(
                                                            (time) => (
                                                                <button
                                                                    type="button"
                                                                    key={time}
                                                                    className={`border rounded-lg p-2 text-center ${
                                                                        data.time ===
                                                                        time
                                                                            ? "bg-black text-white"
                                                                            : "hover:bg-gray-100"
                                                                    }`}
                                                                    onClick={() =>
                                                                        setData(
                                                                            {
                                                                                ...data,
                                                                                time,
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    {time}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="h-full w-full flex flex-col items-center justify-center pb-10">
                                                        <img
                                                            src="/assets/402.svg"
                                                            className="w-[50%] mb-10"
                                                            alt=""
                                                        />
                                                        <h1 className="text-xs text-black px-10 text-center">
                                                            Maaf, Waktu
                                                            reservasi untuk
                                                            tanggal ini tidak
                                                            tersedia.
                                                        </h1>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <SkeletonComponent />
                    )}
                </div>
                <div className="">
                    <div className="w-full border border-gray-100 shadow md:shadow-none bg-white rounded-3xl mb-5 p-7 space-y-5">
                        <div className="mb-5">
                            <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                                Buat Reservasi
                            </h1>
                            <p className="text-xs font-[Montreal-Book] tracking-wide text-black">
                                Masukkan informasi pada formulir berikut
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="customer_name"
                                className="text-xs font-medium text-black mb-2 block"
                            >
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-3xl py-2.5 px-2 text-xs font-[Montreal-Book] tracking-wide text-black capitalize"
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

                            <div className="flex items-center border rounded-3xl py-2.5 px-3 text-xs font-[Montreal-Book] tracking-wide text-black focus-within:ring-2 focus-within:ring-blue-400">
                                <span className="text-black font-[Montreal-Medium] pr-2">+62</span>
                                <input
                                    type="tel"
                                    className="flex-1 outline-none text-xs"
                                    required
                                    id="customer_phone"
                                    name="customer_phone"
                                    placeholder="8123 456 789"
                                    autoComplete="off"
                                    value={data.customer_phone.replace(
                                        /^62/,
                                        ""
                                    )} // tampilkan tanpa 62 di UI
                                    onChange={(e) => {
                                        let value = e.target.value.replace(
                                            /\D/g,
                                            ""
                                        ); // hanya angka
                                        // tambahkan 62 di depan
                                        value = "62" + value.replace(/^0+/, "");
                                        setData("customer_phone", value);
                                    }}
                                />
                            </div>

                            
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
                                className="w-full border rounded-3xl py-2.5 px-2 text-xs font-[Montreal-Book] tracking-wide text-black"
                                id="customer_email"
                                name="customer_email"
                                autoComplete="off"
                                value={data.customer_email}
                                onChange={(e) =>
                                    setData("customer_email", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full border border-gray-100 bg-white rounded-3xl p-7">
                        <div className="mb-5">
                            <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                                Detail
                            </h1>
                            <p className="text-xs font-[Montreal-Book] tracking-wide text-black">
                                Detail reservasi anda
                            </p>
                        </div>

                        <div className="border-b border-neutral-50 pb-2 mb-2">
                            <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-1">
                                Nama
                            </div>
                            <div className="text-end text-xs font-[Montreal-Medium] tracking-wide text-black capitalize">
                                {data.customer_name ? data.customer_name : "-"}
                            </div>
                        </div>
                        <div className="border-b border-neutral-50 pb-2 mb-2">
                            <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-1">
                                Nomor Telepon
                            </div>
                            <div className="text-end text-xs font-[Montreal-Medium] tracking-wide text-black capitalize">
                                {data.customer_phone
                                    ? data.customer_phone
                                    : "-"}
                            </div>
                        </div>
                        <div className="border-b border-neutral-50 pb-2 mb-2">
                            <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-1">
                                Email
                            </div>
                            <div className="text-end text-xs font-[Montreal-Medium] tracking-wide text-black capitalize">
                                {data.email ? data.email : "-"}
                            </div>
                        </div>
                        <div className="border-b border-neutral-50 pb-2 mb-2">
                            <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-1">
                                Tanggal & Waktu
                            </div>
                            <div className="text-end text-xs font-[Montreal-Medium] tracking-wide text-black capitalize">
                                {data.date_display ? data.date_display : "-"} /{" "}
                                {data.time ? data.time : "-"} WITA
                            </div>
                        </div>
                        <div className="border-b border-neutral-50 pb-2 mb-2">
                            <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-3">
                                Layanan Dipilih
                            </div>
                            {data.service_id && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center w-full gap-2">
                                        <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center overflow-hidden">
                                            <img
                                                src={`/storage/${data.artist_image}`}
                                                className="w-full h-full object-cover"
                                                alt={data.artist_name}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-xs font-[Montreal-Book] tracking-wide text-black">
                                                {data.artist_name}
                                            </h1>
                                            <h1 className="text-xs font-[Montreal-Book] tracking-wide text-black capitalize">
                                                {data.service_name}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {data.service_id && data.is_conditional_serve == 1 ? (
                            <>
                                <div className="border-b border-neutral-50 pb-2 mb-2">
                                    <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-1">
                                        Weekday
                                    </div>
                                    <div className="text-end text-xs font-[Montreal-Medium] tracking-wide text-black capitalize">
                                        {formatRupiah(data.weekday_price)}
                                    </div>
                                </div>
                                <div className="border-b border-neutral-50 pb-2 mb-2">
                                    <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-1">
                                        Weekend
                                    </div>
                                    <div className="text-end text-xs font-[Montreal-Medium] tracking-wide text-black capitalize">
                                        {formatRupiah(data.weekend_price)}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="border-b border-neutral-50 pb-2 mb-2">
                                <div className="text-xs font-[Montreal-Book] tracking-wide text-black mb-1">
                                    Harga
                                </div>
                                <div className="text-end text-xs font-[Montreal-Medium] tracking-wide text-black capitalize">
                                    {formatRupiah(data.normal_price)}
                                </div>
                            </div>
                        )}

                        <button
                            disabled={processing}
                            className="px-5 py-2.5 rounded-xl mt-5 bg-black border border-black text-white text-xs w-full font-[Montreal-Medium] tracking-wide hover:bg-white hover:text-black transition"
                        >
                            Konfirmasi
                        </button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
};

export default Reservation;
