/* eslint-disable react/prop-types */
import clsx from "clsx";
import dayjs from "dayjs";
// Aktifkan plugin
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { BsList, BsBoxSeam, BsDatabase, BsBell } from "react-icons/bs";
import {
    PiChartBarDuotone,
    PiChartLineUp,
    PiChartPieDuotone,
    PiHandCoins,
    PiNotePencilDuotone,
    PiUser,
    PiUserCircleGear,
} from "react-icons/pi";
import {
    BiCategoryAlt,
    BiChevronDown,
    BiChevronRight,
    BiLogOut,
} from "react-icons/bi";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";


const Header = ({ isSidebarClosed, user, name, isNewMessageReceive, onNotificationRead }) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const { url } = usePage();

    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const toggleOpenDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // const handleNotificationClick = () => {
    //     openOffCanvasNotification();
    //     if (typeof onNotificationRead === "function") {
    //         onNotificationRead();
    //     }
    // };

    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleOffCanvas = async () => {
        setShowOffCanvas(!showOffCanvas);

        if (!showOffCanvas) {
            try {
                const response = await axios.get("/api/notifications");
                setNotifications(response.data);
                await axios.post("/api/notifications/read-all");
                onNotificationRead();
            } catch (err) {
                console.error("Gagal mengambil notifikasi:", err);
            }
        }
    };

    return (
        <div
            className={clsx(
                "w-full flex items-center justify-between relative"
            )}
        >
            <div className="pl-3">
                <h1
                    className={clsx(
                        "text-sm font-bold tracking-wide text-black"
                    )}
                >
                    {!isSidebarClosed ? (
                        <span>Hi, {user?.name}</span>
                    ) : (
                        <span>{name}</span>
                    )}
                    <span className="block font-normal tracking-wide text-xs">
                        Welcome to Dahsboard
                    </span>
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={toggleOffCanvas} className="relative">
                    <BsBell className="w-5 h-5" />
                    {isNewMessageReceive && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                </button>
                <button
                    onClick={toggleDropdown}
                    className="w-10 h-10 rounded-full overflow-hidden transition-all"
                >
                    <img
                        src={
                            "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_24.png"
                        }
                        alt="User Profile"
                    />
                </button>
            </div>

            {isOpenDropdown && (
                <div className="md:absolute fixed top-0 md:top-12 right-0 md:p-1.5 md:bg-white bg-white backdrop-blur-md shadow min-w-[200px] transition-all md:rounded-md z-[51] left-0 md:left-auto bottom-0 md:bottom-auto px-5 py-5 md:py-1.5">
                    <div className="md:hidden">
                        <div className="flex items-center justify-between mb-3 px-3">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold tracking-wide text-black">
                                    {name}
                                </h1>
                            </div>
                            <button
                                onClick={toggleDropdown}
                                className="text-black"
                            >
                                <BsList className="w-10 h-10" />
                            </button>
                        </div>
                    </div>

                    <ul className={clsx("flex flex-col gap-2 px-3 py-3")}>
                        <li>
                            <Link
                                href={route("profile.edit")}
                                className={clsx(
                                    "flex items-center gap-2 transition rounded-md group",
                                    url == "/profile" &&
                                        "text-blue-700 font-bold bg-blue-50 pl-3"
                                )}
                            >
                                <span className="">
                                    <PiUserCircleGear className="w-5 h-5" />
                                </span>
                                <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                    Profil
                                </span>
                            </Link>
                        </li>
                        {/* link to dashboard */}
                        <li className="md:hidden">
                            <Link
                                href={route("dashboard")}
                                className={clsx(
                                    "flex items-center gap-2 transition rounded-md group",
                                    url == "/dashboard" &&
                                        "text-blue-700 font-bold bg-blue-50 pl-3"
                                )}
                            >
                                <span className="">
                                    <PiChartPieDuotone className="w-5 h-5" />
                                </span>
                                <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                    Dashboard
                                </span>
                            </Link>
                        </li>

                        {/* link to manajemen */}
                        <li className="md:hidden">
                            <button
                                onClick={toggleOpenDropdown}
                                className={clsx(
                                    "flex items-center relative justify-between gap-2 transition rounded-md group w-full text-start"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="">
                                        <BsDatabase className="w-5 h-5" />
                                    </span>
                                    <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                        Manajemen Data
                                    </span>
                                </div>

                                <span className="absolute top-2 text-black -right-2">
                                    {isDropdownOpen ? (
                                        <BiChevronDown />
                                    ) : (
                                        <BiChevronRight />
                                    )}
                                </span>
                            </button>
                        </li>

                        {isDropdownOpen && (
                            <div
                                className={clsx(
                                    "bg-neutral-50 md:hidden p-3 space-y-2 rounded-md"
                                )}
                            >
                                {user?.role == "admin" && (
                                    <li>
                                        <Link
                                            href={"/dashboard/users"}
                                            className={clsx(
                                                "flex items-center gap-2 transition rounded-md group",
                                                url == "/dashboard/users" &&
                                                    "text-blue-700 font-bold bg-blue-50 pl-3 px-2"
                                            )}
                                        >
                                            <span className="">
                                                <PiUser className="w-5 h-5" />
                                            </span>
                                            <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                                Pengguna
                                            </span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        href={"/dashboard/categories"}
                                        className={clsx(
                                            "flex items-center gap-2 transition rounded-md group",
                                            url == "/dashboard/categories" &&
                                                "text-blue-700 font-bold bg-blue-50 pl-3 px-2"
                                        )}
                                    >
                                        <span className="">
                                            <BiCategoryAlt className="w-5 h-5" />
                                        </span>
                                        <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                            Kategori Produk
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/dashboard/products"}
                                        className={clsx(
                                            "flex items-center gap-2 transition rounded-md group",
                                            url == "/dashboard/products" &&
                                                "text-blue-700 font-bold bg-blue-50 pl-3 px-2"
                                        )}
                                    >
                                        <span className="">
                                            <BsBoxSeam className="w-5 h-5" />
                                        </span>
                                        <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                            Produk
                                        </span>
                                    </Link>
                                </li>
                            </div>
                        )}

                        {/* link to transaction */}
                        <li className="md:hidden">
                            <Link
                                href={route("dashboard.transactions.add")}
                                className={clsx(
                                    "flex items-center gap-2 transition rounded-md group",
                                    url == "/dashboard/transactions/create" &&
                                        "text-blue-700 font-bold bg-blue-50 pl-3"
                                )}
                            >
                                <span className="">
                                    <PiNotePencilDuotone className="w-5 h-5" />
                                </span>
                                <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                    Transaksi Baru
                                </span>
                            </Link>
                        </li>
                        <li className="md:hidden">
                            <Link
                                href={route("dashboard.transactions")}
                                className={clsx(
                                    "flex items-center gap-2 transition rounded-md group",
                                    url == "/dashboard/transactions" &&
                                        "text-blue-700 font-bold bg-blue-50 pl-3"
                                )}
                            >
                                <span className="">
                                    <PiHandCoins className="w-5 h-5" />
                                </span>
                                <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                    Data Transaksi
                                </span>
                            </Link>
                        </li>

                        {/* laporan penjualan */}
                        <li className="md:hidden">
                            <Link
                                href={route("dashboard.reviews.transaction")}
                                className={clsx(
                                    "flex items-center gap-2 transition rounded-md group",
                                    url == "/dashboard/review/transactions" &&
                                        "text-blue-700 font-bold bg-blue-50 pl-3"
                                )}
                            >
                                <span className="">
                                    <PiChartBarDuotone className="w-5 h-5" />
                                </span>
                                <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                    Laporan Penjualan
                                </span>
                            </Link>
                        </li>
                        <li className="md:hidden">
                            <Link
                                href={route("dashboard.reviews.product")}
                                className={clsx(
                                    "flex items-center gap-2 transition rounded-md group",
                                    url == "/dashboard/review/products" &&
                                        "text-blue-700 font-bold bg-blue-50 pl-3"
                                )}
                            >
                                <span className="">
                                    <PiChartLineUp className="w-5 h-5" />
                                </span>
                                <span className="text-sm tracking-wide text-text pl-3 lg:p-2 py-2.5 w-full rounded-md">
                                    Review Produk
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                method="post"
                                as="button"
                                href={route("logout")}
                                className={clsx(
                                    "flex items-center gap-2 transition rounded-md group border border-red-500 text-red-500 lg:bg-red-50  font-bold w-full lg:py-2 py-2.5 px-2"
                                )}
                            >
                                <span className="">
                                    <BiLogOut className="w-5 h-5" />
                                </span>
                                <span className="text-sm tracking-wide text-text rounded-md">
                                    Logout
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}

            <AnimatePresence>
                {showOffCanvas && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto border-l"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Notifikasi</h2>
                            <button className="primary-button-sm" onClick={() => setShowOffCanvas(false)}>
                                Tutup
                            </button>
                        </div>
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="mb-2 border-b pb-2"
                                >
                                    <p className="text-sm font-semibold">
                                        {notif.nama_pelanggan}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {notif.message}
                                    </p>
                                    <span className="text-xs font-normal text-black">
                        {dayjs(notif.created_at).fromNow()}
                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                Tidak ada notifikasi.
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
