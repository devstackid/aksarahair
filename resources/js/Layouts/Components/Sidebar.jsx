/* eslint-disable react/prop-types */
import clsx from "clsx";
import {
    BiCategoryAlt,
    BiChevronDown,
    BiChevronLeft,
    BiChevronRight,
} from "react-icons/bi";
import { BsBoxSeam, BsDatabase } from "react-icons/bs";
import {
    PiChartBarDuotone,
    PiChartLineUp,
    PiChartPieDuotone,
    PiHandCoins,
    PiNotePencilDuotone,
    PiUser,
} from "react-icons/pi";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

const Sidebar = ({ isSidebarClosed, toggleSidebar, user, name }) => {
    const [openDropdowns, setOpenDropdowns] = useState({
        manajemen: false,
    });
    const toggleDropdown = (key) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const { url } = usePage();

    return (
        <nav
            id="navbar"
            className={clsx(
                "fixed top-5 bg-white left-5 bottom-5 py-5 rounded-xl shadow transition-all duration-700 md:flex flex-col justify-between hidden z-[49]",
                isSidebarClosed
                    ? "min-w-[60px] "
                    : "md:min-w-[200px] lg:min-w-[250px]"
            )}
        >
            <div
                className={clsx(
                    "overflow-y-auto overflow-x-hidden",
                    isSidebarClosed ? "md:px-2 lg:px-5" : "px-5"
                )}
            >
                <div className="flex items-center gap-3 pl-1">
                    <img src={"/assets/logo.webp"} width={25} alt="" />
                    {!isSidebarClosed && (
                        <h1
                            className={clsx(
                                "text-sm text-black font-bold tracking-wide"
                            )}
                        >
                            {name}
                        </h1>
                    )}
                </div>
                <ul
                    className={clsx(
                        "mt-10 flex flex-col gap-2",
                        isSidebarClosed ? "items-center" : ""
                    )}
                >
                    {/* link to dashboard */}
                    <li>
                        <Link
                            href={route("dashboard")}
                            className={clsx(
                                "flex items-center gap-2 transition rounded-md group",
                                isSidebarClosed ? "p-2" : "pl-2",
                                url == "/dashboard" &&
                                    "text-white font-bold bg-blue-500"
                            )}
                        >
                            <span className="">
                                <PiChartPieDuotone className="w-5 h-5" />
                            </span>
                            {!isSidebarClosed && (
                                <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                    Dashboard
                                </span>
                            )}
                        </Link>
                    </li>


                    <li>
                        <button
                            onClick={() => toggleDropdown("manajemen")}
                            className={clsx(
                                "flex items-center relative justify-between gap-2 transition rounded-md group w-full text-start",
                                isSidebarClosed ? "p-2" : "pl-2 pr-2"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <span>
                                    <BsDatabase className="w-5 h-5" />
                                </span>
                                {!isSidebarClosed && (
                                    <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                        Kelola Data
                                    </span>
                                )}
                            </div>

                            <span className="absolute top-2 text-black -right-2">
                                {openDropdowns.manajemen ? (
                                    <BiChevronDown />
                                ) : (
                                    <BiChevronRight />
                                )}
                            </span>
                        </button>
                    </li>

                    {openDropdowns.manajemen && (
                        <div
                            className={clsx(
                                "bg-neutral-50",

                                isSidebarClosed
                                    ? "!bg-transparent flex flex-col gap-2"
                                    : "rounded-md py-2 pl-2"
                            )}
                        >
                            {user?.role == "admin" && (
                                <li>
                                    <Link
                                        href={"/dashboard/users"}
                                        className={clsx(
                                            "flex items-center gap-2 transition rounded-md group",
                                            isSidebarClosed
                                                ? "p-2 hover:bg-base-200 hover:!text-dark"
                                                : "pl-2",
                                            url == "/dashboard/users" &&
                                                "text-white font-bold bg-blue-500"
                                        )}
                                    >
                                        <span className="">
                                            <PiUser className="w-5 h-5" />
                                        </span>
                                        {!isSidebarClosed && (
                                            <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                                Pengguna
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link
                                    href={"/dashboard/categories"}
                                    className={clsx(
                                        "flex items-center gap-2 transition rounded-md group",
                                        isSidebarClosed
                                            ? "p-2 hover:bg-base-200 hover:!text-dark"
                                            : "pl-2",
                                        url == "/dashboard/categories" &&
                                            "text-white font-bold bg-blue-500"
                                    )}
                                >
                                    <span className="">
                                        <BiCategoryAlt className="w-5 h-5" />
                                    </span>
                                    {!isSidebarClosed && (
                                        <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                            Kategori Produk
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/dashboard/products"}
                                    className={clsx(
                                        "flex items-center gap-2 transition rounded-md group",
                                        isSidebarClosed
                                            ? "p-2 hover:bg-base-200 hover:!text-dark"
                                            : "pl-2",
                                        url == "/dashboard/products" &&
                                            "text-white font-bold bg-blue-500"
                                    )}
                                >
                                    <span className="">
                                        <BsBoxSeam className="w-5 h-5" />
                                    </span>
                                    {!isSidebarClosed && (
                                        <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                            Produk
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </div>
                    )}

                    {/* link to transaction */}
                    <li>
                        <Link
                            href={route("dashboard.transactions.add")}
                            className={clsx(
                                "flex items-center gap-2 transition rounded-md group",
                                isSidebarClosed ? "p-2" : "pl-2",
                                url == "/dashboard/transactions/create" &&
                                    "text-white font-bold bg-blue-500"
                            )}
                        >
                            <span className="">
                                <PiNotePencilDuotone className="w-5 h-5" />
                            </span>
                            {!isSidebarClosed && (
                                <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                    Transaksi Baru
                                </span>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("dashboard.transactions")}
                            className={clsx(
                                "flex items-center gap-2 transition rounded-md group",
                                isSidebarClosed ? "p-2" : "pl-2",
                                url == "/dashboard/transactions" &&
                                    "text-white font-bold bg-blue-500"
                            )}
                        >
                            <span className="">
                                <PiHandCoins className="w-5 h-5" />
                            </span>
                            {!isSidebarClosed && (
                                <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                    Transaksi
                                </span>
                            )}
                        </Link>
                    </li>

                    {/* laporan penjualan */}
                    <li>
                        <Link
                            href={route("dashboard.reviews.transaction")}
                            className={clsx(
                                "flex items-center gap-2 transition rounded-md group",
                                isSidebarClosed ? "p-2" : "pl-2",
                                url == "/dashboard/review/transactions" &&
                                    "text-white font-bold bg-blue-500"
                            )}
                        >
                            <span className="">
                                <PiChartBarDuotone className="w-5 h-5" />
                            </span>
                            {!isSidebarClosed && (
                                <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                    Laporan Penjualan
                                </span>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("dashboard.reviews.product")}
                            className={clsx(
                                "flex items-center gap-2 transition rounded-md group",
                                isSidebarClosed ? "p-2" : "pl-2",
                                url == "/dashboard/review/products" &&
                                    "text-white font-bold bg-blue-500"
                            )}
                        >
                            <span className="">
                                <PiChartLineUp className="w-5 h-5" />
                            </span>
                            {!isSidebarClosed && (
                                <span className="text-sm tracking-wide text-text pl-3 p-2 w-full rounded-md">
                                    Review Produk
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="">
                <ul
                    className={clsx(
                        "mt-10 flex flex-col gap-2",
                        isSidebarClosed ? "items-center" : "px-5"
                    )}
                >
                    <li>
                        <Link
                            href={route("profile.edit")}
                            className="flex items-center gap-2 transition rounded-md group w-full"
                        >
                            <div className="rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white shadow">
                                <img
                                    src={
                                        "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_24.png"
                                    }
                                    className="object-cover"
                                    width={40}
                                    alt=""
                                />
                            </div>
                            {!isSidebarClosed && user && (
                                <span
                                    className={clsx(
                                        "text-sm capitalize tracking-wide text-text pl-5 group-hover:bg-base-200 group-hover:text-primary text-start p-2 w-full rounded-md transition"
                                    )}
                                >
                                    {user.username}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="absolute top-3 -right-4 ">
                <button
                    id="closeSidebar"
                    onClick={toggleSidebar}
                    className=" bg-white p-1 rounded-xl shadow"
                >
                    {isSidebarClosed ? (
                        <BiChevronRight className="w-5 h-5" />
                    ) : (
                        <BiChevronLeft className="w-5 h-5" />
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
