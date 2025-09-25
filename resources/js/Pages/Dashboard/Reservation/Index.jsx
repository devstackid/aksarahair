import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Head, Link } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { PiDotsThreeVerticalBold, PiWhatsappLogoFill } from "react-icons/pi";
import axios from "axios";
import debounce from "lodash.debounce";
import { Spinner } from "@radix-ui/themes";
import { Calendar } from "lucide-react";
import CreateButton from "@/Layouts/Components/CreateButton";
import { useDeleteStore } from "../utils/store/UseDeleteStore";
import Pagination from "@/Layouts/Components/Pagination";
import BulkDeleteButton from "@/Layouts/Components/BulkDeleteButton";
const Index = ({ auth }) => {
    const [reservations, setReservations] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const statusConfig = {
        pending: { label: "Terima", next: "confirmed" },
        confirmed: { label: "Batalkan", next: "cancelled" },
        cancelled: { label: "Pending", next: "pending" },
    };

    const {
        selectedIds,
        setSelectedIds,
        handleBulkDelete,
        handleSingleDelete,
    } = useDeleteStore();
    const handleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const isSelected = (id) => selectedIds.includes(id);

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const fetchReservations = async (params = {}) => {
        try {
            setLoading(true);
            const res = await axios.get("/api/reservations/data", {
                params: {
                    search,
                    status,
                    date,
                    page: currentPage,
                    per_page: perPage,
                    ...params,
                },
            });
            setReservations(res.data.data);
            setTotalPages(res.data.last_page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const res = await axios.patch(
                `/dashboard/reservation/status/update/${id}/${status}`
            );
            if (res.data?.message) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: res.data.message,
                    toast: true,
                    position: "top-end",
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
            fetchReservations();
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedFetch = useMemo(
        () => debounce(fetchReservations, 500),
        [search, status, date, perPage, currentPage]
    );

    useEffect(() => {
        debouncedFetch();
        return () => debouncedFetch.cancel();
    }, [search, status, date, perPage, currentPage]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Reservasi " />

            <div className="w-full pb-32">
                <div className="flex items-center justify-between md:p-4 pb-4">
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Reservation
                    </h1>
                    <CreateButton href={route("dashboard.reservation.add")} />
                </div>
                <div className="w-full h-full">
                    {/* Heading */}
                    <div className="flex md:flex-row flex-col md:items-center md:justify-between md:p-5 pb-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:mb-0 mb-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-normal text-black">
                                    Tampilkan
                                </span>
                                <select
                                    value={perPage}
                                    onChange={(e) =>
                                        setPerPage(parseInt(e.target.value))
                                    }
                                    className="rounded-md text-xs  font-[Montreal-Medium] tracking-wide text-black"
                                >
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <span className="text-xs  font-normal text-black">
                                    Data
                                </span>
                            </div>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="text-xs border p-2.5 md:p-1 rounded-3xl"
                            >
                                <option value="">Semua Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <div className="flex w-full md:w-auto items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <input
                                    className="text-sm min-w-[120px] px-2 md:px-3 w-full md:w-auto md:text-xs border py-2.5 md:py-1 md:p-1 rounded-3xl"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-center gap-3">
                            {selectedIds.length > 0 ? (
                                <BulkDeleteButton
                                    onDelete={() =>
                                        handleBulkDelete(
                                            "dashboard.reservation.bulkDelete"
                                        )
                                    }
                                    count={selectedIds.length}
                                    disabled={selectedIds.length === 0}
                                    label="Hapus Pilihan"
                                />
                            ) : (
                                <span className="text-xs">Dipilih (0)</span>
                            )}
                            <form className="pl-3 pr-2 md:order-2 order-1 border bg-white flex items-center rounded-3xl gap-2">
                                <label htmlFor="search">
                                    <BiSearch width={8} height={8} />
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="py-2.5 md:py-1.5 bg-transparent text-xs w-full font-normal text-black outline-none"
                                    placeholder="Search.."
                                    autoComplete="off"
                                />
                            </form>
                        </div>
                    </div>

                    {loading ? (
                        <div className="w-full h-full mt-20 flex items-center gap-2 justify-center">
                            <Spinner size={3} />{" "}
                            <span className="text-sm">Sedang Mencari..</span>
                        </div>
                    ) : (
                        <>
                            {reservations.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto md:px-5">
                                        <table className="w-full text-xs border-collapse text-nowrap">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-neutral-200">
                                                    <th className="p-2 text-left">
                                                        #
                                                    </th>
                                                    <th className="p-2 text-left">
                                                        Nama
                                                    </th>
                                                    <th className="p-2 text-left">
                                                        Waktu
                                                    </th>
                                                    <th className="p-2 text-left">
                                                        Layanan
                                                    </th>
                                                    <th className="p-2 text-left">
                                                        Hair Artist
                                                    </th>
                                                    <th className="p-2 text-left">
                                                        Status
                                                    </th>
                                                    <th className="p-2 text-left">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservations.map(
                                                    (reservation, i) => {
                                                        const formattedDate =
                                                            (() => {
                                                                const [
                                                                    y,
                                                                    m,
                                                                    d,
                                                                ] =
                                                                    reservation.date
                                                                        .split(
                                                                            "-"
                                                                        )
                                                                        .map(
                                                                            Number
                                                                        );
                                                                return new Date(
                                                                    y,
                                                                    m - 1,
                                                                    d
                                                                ).toLocaleDateString(
                                                                    "id-ID",
                                                                    {
                                                                        weekday:
                                                                            "long",
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    }
                                                                );
                                                            })();

                                                        const statusMap = {
                                                            confirmed:
                                                                "Diterima",
                                                            cancelled:
                                                                "Dibatalkan",
                                                            pending:
                                                                "Sedang menunggu konfirmasi",
                                                        };

                                                        const statusText =
                                                            statusMap[
                                                                reservation
                                                                    .status
                                                            ] ??
                                                            "Status tidak diketahui";

                                                        const message =
                                                            encodeURIComponent(
                                                                `Yth. ${reservation.customer_name},\n\n` +
                                                                    `Kami informasikan bahwa status Booking / Reservasi Anda adalah: *${statusText}*.\n` +
                                                                    `Tanggal Reservasi: ${formattedDate}\n` +
                                                                    `Waktu Reservasi: ${reservation.time} WITA\n\n` +
                                                                    `Terima kasih atas kepercayaan Anda menggunakan layanan kami. ` +
                                                                    `Apabila ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.\n\n` +
                                                                    `Salam hormat,\n` +
                                                                    `Tim Reservasi`
                                                            );

                                                        return (
                                                            <tr
                                                                key={
                                                                    reservation.id
                                                                }
                                                                onClick={() =>
                                                                    handleSelect(
                                                                        reservation.id
                                                                    )
                                                                }
                                                                className={clsx(
                                                                    "border-b border-neutral-100 cursor-pointer transition hover:bg-neutral-50",
                                                                    isSelected(
                                                                        reservation.id
                                                                    )
                                                                        ? "bg-red-200 border border-red-500"
                                                                        : "bg-white"
                                                                )}
                                                            >
                                                                <td className="p-2 w-10 text-center">
                                                                    {i + 1}
                                                                </td>
                                                                <td className="p-2">
                                                                    <div className="text-xs mb-1">
                                                                        {
                                                                            reservation.customer_name
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs">
                                                                        +
                                                                        {
                                                                            reservation.customer_phone
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <div className="text-xs flex items-center gap-1.5">
                                                                        {(() => {
                                                                            const [
                                                                                y,
                                                                                m,
                                                                                d,
                                                                            ] =
                                                                                reservation.date
                                                                                    .split(
                                                                                        "-"
                                                                                    )
                                                                                    .map(
                                                                                        Number
                                                                                    );
                                                                            return new Date(
                                                                                y,
                                                                                m -
                                                                                    1,
                                                                                d
                                                                            ).toLocaleDateString(
                                                                                "id-ID",
                                                                                {
                                                                                    weekday:
                                                                                        "long",
                                                                                    day: "numeric",
                                                                                    month: "long",
                                                                                    year: "numeric",
                                                                                }
                                                                            );
                                                                        })()}
                                                                    </div>

                                                                    <div className="flex items-center gap-1.5">
                                                                        {
                                                                            reservation.time
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="p-2 capitalize">
                                                                    {
                                                                        reservation
                                                                            .service
                                                                            .service_item
                                                                            .service_name
                                                                    }
                                                                </td>

                                                                <td className="p-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden text-sm">
                                                                            <img
                                                                                src={`/storage/${reservation.service.employee.image}`}
                                                                                className="w-full h-full object-cover"
                                                                                alt={
                                                                                    reservation
                                                                                        .service
                                                                                        .employee
                                                                                        .image
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <h1 className="text-xs">
                                                                            {
                                                                                reservation
                                                                                    .service
                                                                                    .employee
                                                                                    .name
                                                                            }
                                                                        </h1>
                                                                    </div>
                                                                </td>
                                                                <td className="p-2 capitalize">
                                                                    {
                                                                        reservation.status
                                                                    }
                                                                </td>
                                                                <td
                                                                    className="p-2"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    } // biar klik tombol tidak trigger select
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <a
                                                                            href={`https://wa.me/${reservation.customer_phone}?text=${message}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="w-8 h-8 flex rounded-full text-xs items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition"
                                                                        >
                                                                            <PiWhatsappLogoFill className="text-green-500" />
                                                                        </a>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleUpdateStatus(
                                                                                    reservation.id,
                                                                                    statusConfig[
                                                                                        reservation
                                                                                            .status
                                                                                    ]
                                                                                        .next
                                                                                )
                                                                            }
                                                                            className={clsx(
                                                                                "text-xs py-1.5 px-3 min-w-[100px] font-[Montreal-Medium] tracking-wide rounded-3xl border transition",
                                                                                "bg-white border-neutral-200 hover:bg-black hover:text-white",
                                                                                reservation.status ==
                                                                                    "confirmed" &&
                                                                                    "text-white !bg-red-500  border-red-500 hover:!bg-white hover:!text-red-700"
                                                                            )}
                                                                        >
                                                                                {
                                                                                    statusConfig[
                                                                                        reservation
                                                                                            .status
                                                                                    ]
                                                                                        .label
                                                                                }
                                                                        </button>
                                                                        <Menu>
                                                                            <MenuButton className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                                                                                <PiDotsThreeVerticalBold className="w-5 h-5 text-black" />
                                                                            </MenuButton>
                                                                            <MenuItems
                                                                                transition
                                                                                anchor="bottom end"
                                                                                className="w-52 origin-top-right space-y-1 rounded-2xl border border-neutral-100 bg-white text-sm p-1 shadow-xl text-foreground transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                                                            >
                                                                                <MenuItem>
                                                                                    <Link
                                                                                        href={route(
                                                                                            "dashboard.reservation.edit",
                                                                                            reservation.id
                                                                                        )}
                                                                                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition hover:bg-gray-100"
                                                                                    >
                                                                                        <PencilIcon className="size-4 text-black/70" />
                                                                                        Edit
                                                                                    </Link>
                                                                                </MenuItem>
                                                                                <MenuItem>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleSingleDelete(
                                                                                                "dashboard.reservation.destroy",
                                                                                                reservation.id
                                                                                            )
                                                                                        }
                                                                                        className="group flex w-full items-center gap-2 px-3 rounded-lg py-1.5 transition hover:bg-gray-100"
                                                                                    >
                                                                                        <TrashIcon className="size-4 text-black/70" />
                                                                                        Hapus
                                                                                    </button>
                                                                                </MenuItem>
                                                                            </MenuItems>
                                                                        </Menu>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={setCurrentPage}
                                    />
                                </>
                            ) : (
                                <div className="w-full flex flex-col items-center justify-center mt-10">
                                    <img
                                        src="/assets/429.svg"
                                        className="w-[90%] md:w-[30%] mb-10"
                                        alt=""
                                    />
                                    <h1 className="text-xs text-black px-10 text-center">
                                        Belum ada reservasi..
                                    </h1>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
