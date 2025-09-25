import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import {
    User2,
    UsersRound,
    Clock9,
    CalendarCheck2,
    ListTodo,
} from "lucide-react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsBoxArrowInUpRight } from "react-icons/bs";

export default function DashboardIndex({
    auth,
    customers,
    artists,
    reservations,
    pendingReservation,
    confirmedReservation,
    cancelledReservation,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);

    const openModal = (artist) => {
        setSelectedArtist(artist); // simpan data artist yang diklik
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedArtist(null), 200);
    };

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="pb-36">
                <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-gray-800 mb-5">
                  Dashboard Overview
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className=" border border-neutral-100 p-4 rounded-3xl bg-white md:bg-transparent ">
                        <div className="w-8 h-8 rounded-full mb-2 bg-gray-100 text-black flex items-center justify-center">
                            <User2 />
                        </div>
                        <div>
                            <h2 className="text-xs  text-black">
                                Pelanggan Terdaftar
                            </h2>
                            <p className="text-lg font-[Montreal-Medium] tracking-wide text-black">
                                {customers.length > 0 ? customers.length : 0}
                            </p>
                        </div>
                    </div>
                    <div className=" border border-neutral-100 p-4 rounded-3xl bg-white md:bg-transparent ">
                        <div className="w-8 h-8 rounded-full mb-2 bg-gray-50 text-black flex items-center justify-center">
                            <UsersRound />
                        </div>
                        <div>
                            <h2 className="text-xs  text-black">Hair Artist</h2>
                            <p className="text-lg font-[Montreal-Medium]  text-black">
                                {artists.length > 0 ? artists.length : 0}
                            </p>
                        </div>
                    </div>
                    <div className=" border border-neutral-100 p-4 rounded-3xl bg-white md:bg-transparent ">
                        <div className="w-8 h-8 rounded-full mb-2 bg-gray-50 text-black flex items-center justify-center">
                            <Clock9 />
                        </div>
                        <div>
                            <h2 className="text-xs  text-black">
                                Reservasi Pending
                            </h2>
                            <p className="text-lg font-[Montreal-Medium] tracking-wide text-black">
                               {pendingReservation > 0
                                    ? pendingReservation
                                    : 0}
                            </p>
                        </div>
                    </div>
                    <div className=" border border-neutral-100 p-4 rounded-3xl bg-white md:bg-transparent ">
                        <div className="w-8 h-8 rounded-full mb-2 bg-neutral-50 text-black flex items-center justify-center">
                            <CalendarCheck2 />
                        </div>
                        <div>
                            <h2 className="text-xs  text-black">
                                Reservasi Diterima
                            </h2>
                            <p className="text-lg font-[Montreal-Medium] tracking-wide">
                                {confirmedReservation > 0
                                    ? confirmedReservation
                                    : 0}
                            </p>
                        </div>
                    </div>
                    <div className=" border border-neutral-100 p-4 rounded-3xl bg-white md:bg-transparent ">
                        <div className="w-8 h-8 rounded-full mb-2 bg-neutral-50 text-black flex items-center justify-center">
                            <ListTodo />
                        </div>
                        <div>
                            <h2 className="text-xs  text-black">
                                Reservasi Dibatalkan
                            </h2>
                            <p className="text-lg font-[Montreal-Medium] tracking-wide text-black">
                                {cancelledReservation > 0
                                    ? cancelledReservation
                                    : 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <ul className="list bg-base-100 rounded-3xl border border-neutral-100">
                        <li className="p-4 pb-2 text-xs text-black font-[Montreal-Medium] tracking-wide ">
                            Pelanggan Terdaftar
                        </li>

                        {customers.length > 0 ? (
                            <>
                                {customers.map((cust, i) => (
                                    <li className="list-row">
                                        <div>
                                            <img
                                                className="size-10 rounded-box"
                                                src={cust.google_image_url}
                                            />
                                        </div>
                                        <div>
                                            <div className="capitalize">
                                                {cust.name}
                                            </div>
                                            <div className="text-xs font-[Montreal-Medium] tracking-wide text-black/80">
                                                {cust.email}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center pb-10">
                                <img
                                    src="/assets/401.svg"
                                    className="w-[30%] mb-10"
                                    alt=""
                                />
                                <h1 className="text-xs text-black px-10 text-center">
                                    Belum ada pelanggan yang mendaftar
                                </h1>
                            </div>
                        )}
                    </ul>

                    <ul className="list bg-base-100 rounded-3xl border border-neutral-100 md:col-span-2">
                        <li className="p-4 pb-2 text-xs text-black font-[Montreal-Medium] tracking-wide flex items-center justify-between">
                            <span>Hair Artist</span>
                        </li>

                        {artists.length > 0 ? (
                            <>
                                {artists.map((artist, i) => (
                                    <li
                                        key={i}
                                        className="list-row items-center"
                                    >
                                        <div>
                                            <img
                                                className="size-10 rounded-box"
                                                src={`/storage/${artist.image}`}
                                            />
                                        </div>
                                        <div>
                                            <div className="capitalize">
                                                {artist.name}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) =>
                                                    openModal(artist)
                                                }
                                                type="button"
                                                className="w-8 h-8 flex rounded-full text-sm items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition"
                                            >
                                                <BsBoxArrowInUpRight className="" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center pb-10">
                                <img
                                    src="/assets/429.svg"
                                    className="w-[30%] mb-10"
                                    alt=""
                                />
                                <h1 className="text-xs text-black px-10 text-center">
                                    Hair Artist Belum ditambahkan
                                </h1>
                                <Link
                                    href={route("dashboard.artists")}
                                    className="text-xs mt-2  text-white bg-black px-5 py-2 rounded-3xl"
                                >
                                    Tambahkan
                                </Link>
                            </div>
                        )}
                    </ul>
                </div>

                <h1 className="my-5 text-xs text-black font-[Montreal-Medium]  tracking-wide">
                    Reservasi Terbaru
                </h1>
                {reservations.length > 0 ? (
                    <div className="overflow-x-auto border rounded-3xl">
                        <table className="w-full text-xs border-collapse text-nowrap">
                            <thead>
                                <tr className="bg-gray-50 border-b border-neutral-200 font-[Montreal-Medium] tracking-wide">
                                    <th className="p-2 text-left">#</th>
                                    <th className="p-2 text-left">Nama</th>
                                    <th className="p-2 text-left">Waktu</th>
                                    <th className="p-2 text-left">Layanan</th>
                                    <th className="p-2 text-left">Hair Artist</th>
                                    <th className="p-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, i) => {
                                    const formattedDate = (() => {
                                        const [y, m, d] = reservation.date
                                            .split("-")
                                            .map(Number);
                                        return new Date(
                                            y,
                                            m - 1,
                                            d
                                        ).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        });
                                    })();

                                    const message = encodeURIComponent(
                                        `Yth. Bapak/Ibu ${reservation.customer_name},\n\n` +
                                            `Kami informasikan bahwa status reservasi Anda adalah: *${reservation.status}*.\n` +
                                            `Tanggal Reservasi: ${formattedDate}\n` +
                                            `Waktu Reservasi: ${reservation.time} WITA\n\n` +
                                            `Terima kasih atas kepercayaan Anda menggunakan layanan kami. ` +
                                            `Apabila ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.\n\n` +
                                            `Salam hormat,\n` +
                                            `Tim Reservasi`
                                    );

                                    return (
                                        <tr
                                            key={reservation.id}
                                            onClick={() =>
                                                handleSelect(reservation.id)
                                            }
                                            className={clsx(
                                                "border-b border-neutral-100 bg-white"
                                            )}
                                        >
                                            <td className="p-2 w-10 text-center">
                                                {i + 1}
                                            </td>
                                            <td className="p-2">
                                                <div className="text-xs mb-1">
                                                    {reservation.customer_name}
                                                </div>
                                                <div className="text-xs">
                                                    +
                                                    {reservation.customer_phone}
                                                </div>
                                            </td>
                                            <td className="p-2 ">
                                                <div className="text-xs flex items-center gap-1.5">
                                                    {(() => {
                                                        const [y, m, d] =
                                                            reservation.date
                                                                .split("-")
                                                                .map(Number);
                                                        return new Date(
                                                            y,
                                                            m - 1,
                                                            d
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                weekday: "long",
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        );
                                                    })()}
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    {reservation.time}
                                                </div>
                                            </td>
                                            <td className="p-2 capitalize">
                                                {
                                                    reservation.service
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
                                                            reservation.service
                                                                .employee.name
                                                        }
                                                    </h1>
                                                </div>
                                            </td>
                                            <td className="p-2 capitalize">
                                                {reservation.status}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center pb-10">
                        <BiSearch
                            className="w-[100px] h-[100px] mb-10"
                        />
                        <h1 className="text-xs text-black px-10 text-center">
                            Belum ada pelanggan yang melakukan reservasi
                        </h1>
                    </div>
                )}

                {isOpen && (
                    <>
                        <AnimatePresence>
                            {/* Overlay */}
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                            >
                                <motion.div
                                    className="z-50 bg-white rounded-lg shadow-lg p-6 w-[95%] md:w-[35%] max-h-[80vh] overflow-y-auto"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-20 h-20 rounded-full mb-5 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`/storage/${selectedArtist.image}`}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <div className="pb-2 border-b border-gray-100 mb-2">
                                        <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                                            {selectedArtist.name}
                                        </h1>
                                        {selectedArtist.is_conditional_serve ==
                                            1 && (
                                            <span className="block text-xs w-max text-blue-600">
                                                Weekday & Weekend
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        {selectedArtist.services.map(
                                            (service, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs pb-2 border-b border-gray-100 mb-2"
                                                >
                                                    <h1 className="text-xs font-[Montreal-Medium] tracking-wide mb-1">
                                                        {
                                                            service.service_item
                                                                .service_name
                                                        }
                                                    </h1>
                                                    {selectedArtist.is_conditional_serve ==
                                                    1 ? (
                                                        <>
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="">
                                                                    {" "}
                                                                    Weekday
                                                                </span>
                                                                <span className="font-[Montreal-Medium] tracking-wide">
                                                                    {" "}
                                                                    {formatRupiah(
                                                                        service.weekday_price
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="">
                                                                    {" "}
                                                                    Weekend
                                                                </span>
                                                                <span className="font-[Montreal-Medium] tracking-wide">
                                                                    {" "}
                                                                    {formatRupiah(
                                                                        service.weekend_price
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center justify-between">
                                                            <span className="">
                                                                {" "}
                                                                Price
                                                            </span>
                                                            <span className="font-[Montreal-Medium] tracking-wide">
                                                                {" "}
                                                                {formatRupiah(
                                                                    service.normal_price
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="bg-black text-white block font-[Montreal-Medium] tracking-wide w-full mt-5 text-xs px-4 py-1.5 rounded hover:bg-gray-800"
                                    >
                                    Tutup
                                    </button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
