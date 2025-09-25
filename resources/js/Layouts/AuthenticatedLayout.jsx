import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import {
    BiCube,
    BiPaperPlane,
    BiSolidChevronLeft,
} from "react-icons/bi";
import { BsBoxSeam, BsGear, BsHouse } from "react-icons/bs";
import { PiChartPieDuotone, PiHandCoins, PiUserDuotone } from "react-icons/pi";
import { FaBarsStaggered, FaScissors, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { House } from "lucide-react";
const menuItems = [
    {
        name: "Overview",
        icon: <PiChartPieDuotone className="w-4 h-4" />,
        routeName: "dashboard",
        path: "/dashboard",
    },
    {
        name: "Akun Pengguna",
        icon: <PiUserDuotone className="w-4 h-4" />,
        routeName: "dashboard.users",
        path: "/dashboard/users",
    },
    {
        name: "Services",
        icon: <BsBoxSeam className="w-4 h-4" />,
        routeName: "dashboard.services.items",
        path: "/dashboard/services/item",
    },
    {
        name: "Hair Artist",
        icon: <FaScissors className="w-4 h-4" />,
        routeName: "dashboard.artists",
        path: "/dashboard/artist",
    },
    {
        name: "Reservasi",
        icon: <PiHandCoins className="w-4 h-4" />,
        routeName: "dashboard.reservations",
        path: "/dashboard/reservation",
    },
    {
        name: "Review Pelanggan",
        icon: <BiPaperPlane className="w-4 h-4" />,
        routeName: "dashboard.testimonials",
        path: "/dashboard/testimonial",
    },
    {
        name: "Pengaturan",
        icon: <BsGear className="w-4 h-4" />,
        routeName: "dashboard.settings",
        path: "/dashboard/setting",
    },
];

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };
    

    const { url } = usePage();

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const toggleMenu = () => {
        setIsOpenMenu((prev) => !prev);
    };

    return (
        <>
            <main className="flex h-screen overflow-hidden bg-bg text-foreground font-inter">
                <aside
                    className={clsx(
                        "h-screen overflow-hidden border-r border-gray-100 hidden md:flex flex-col justify-between",
                        isOpenSidebar
                            ? "lg:w-[25vw] md:w-[30vw] p-5"
                            : "w-max items-center px-3 py-5"
                    )}
                >
                    <div>
                        <div className="mb-10 h-min flex items-center justify-between">
                            {isOpenSidebar && (
                                <Link
                                    href={route("dashboard")}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        <BiCube className="w-4 h-4" />
                                    </div>
                                    <h1 className="text-xs font-[Montreal-Medium] tracking-wide">
                                        Nexiro Hair
                                    </h1>
                                </Link>
                            )}
                            <button
                                type="button"
                                onClick={toggleSidebar}
                                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                            >
                                {isOpenSidebar ? (
                                    <BiSolidChevronLeft className="w-5 h-5" />
                                ) : (
                                    <FaBarsStaggered className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <div className="max-h-[72vh] overflow-y-auto mb-3">
                            <ul className="space-y-1">
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={route(item.routeName)}
                                        className={clsx(
                                            "flex items-center font-[Montreal-Book] tracking-wide gap-2 transition rounded-md group px-3 py-2.5 text-xs hover:bg-gray-100",
                                            url === item.path && "bg-gray-100",
                                            isOpenSidebar ? "w-full" : "w-max"
                                        )}
                                    >
                                        <span>{item.icon}</span>
                                        <span
                                            className={clsx(
                                                isOpenSidebar
                                                    ? "inline"
                                                    : "hidden"
                                            )}
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className={clsx("bg-indigo-500/25 w-full py-5 rounded-3xl mt-3 flex flex-col items-center justify-center px-10", !isOpenSidebar && 'hidden' )}>
                            <h1 className="text-xs mb-3 text-black font-[Montreal-Medium] tracking-wide">Butuh Bantuan?</h1>
                            <a href="https://wa.me/62895631780343" target="_blank" className="inline-block w-full py-2 text-center text-xs bg-black font-[Montreal-Medium] tracking-wide text-white hover:bg-white hover:text-black transition border border-black rounded-3xl">Hubungi Kami</a>
                        </div>
                        </div>
                    </div>
                    <ul className="h-min">
                        <li>
                            <Link
                                href={route("profile.edit")}
                                className={clsx(
                                    "flex items-center font-[Montreal-Book] tracking-wide gap-2 transition rounded-md group px-3 py-2.5 text-xs hover:bg-gray-100"
                                )}
                            >
                                <div className="flex w-7 h-7 uppercase rounded-full items-center justify-center text-sm relative bg-gray-200">
                                    {user.name[0]}
                                    <div className="w-2 h-2 rounded-full bg-green-500 absolute bottom-0 right-0">
                                        {""}
                                    </div>
                                </div>
                                <span
                                    className={clsx(
                                        "capitalize",
                                        isOpenSidebar ? "inline" : "hidden"
                                    )}
                                >
                                    {user.name}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </aside>
                <div className="w-full h-screen overflow-hidden">
                    <header className="border-b border-gray-100 w-full h-[70px] p-5 flex items-center justify-between">
                        <h1 className="text-xs md:flex items-center gap-1 hidden">
                            <BsHouse /> {url}
                        </h1>
                        <h1 className="text-sm md:hidden font-[Montreal-Medium] tracking-wide items-center gap-1 flex">
                            <BiCube className="w-4 h-4" />
                            Nexiro Hair
                        </h1>
                        <button
                            onClick={toggleMenu}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                        >
                            <FaBarsStaggered className="w-5 h-5" />
                        </button>
                    </header>
                    <div className="w-full h-full overflow-y-auto p-5 pb-36 md:bg-white bg-neutral-100">
                        {children}
                    </div>
                </div>
            </main>


            <nav className="fixed left-0 right-0 bottom-0 pb-2.5 grid grid-cols-5 px-3 gap-2 bg-white md:hidden z-[39]">
                <Link href={route('dashboard')} className={clsx("py-5 flex flex-col gap-1.5 text-black/50 items-center justify-center group font-[Montreal-Book]", url == '/dashboard' && '!text-black !font-[Montreal-Medium]')}>
                    <span><PiChartPieDuotone className="w-7 h-7"/></span>
                    <span className="text-sm  tracking-wide">Beranda</span>
                </Link>
                <Link href={route('dashboard.artists')} className={clsx("py-5 flex flex-col gap-1.5 text-black/50 items-center justify-center group font-[Montreal-Book]", url == '/dashboard/artist' && '!text-black !font-[Montreal-Medium]')}>
                    <span><PiUserDuotone className="w-7 h-7"/></span>
                    <span className="text-sm  tracking-wide">Layanan</span>
                </Link>
                <Link href={route('dashboard.reservations')} className={clsx("py-5 flex flex-col gap-1.5 text-black/50 items-center justify-center group font-[Montreal-Book]", url == '/dashboard/reservation' && '!text-black !font-[Montreal-Medium]')}>
                    <span><PiHandCoins className="w-7 h-7"/></span>
                    <span className="text-sm  tracking-wide">Reservasi</span>
                </Link>
                <Link href={route('dashboard.testimonials')} className={clsx("py-5 flex flex-col gap-1.5 text-black/50 items-center justify-center group font-[Montreal-Book]", url == '/dashboard/testimonial' && '!text-black !font-[Montreal-Medium]')}>
                    <span><BiPaperPlane className="w-7 h-7"/></span>
                    <span className="text-sm  tracking-wide">Review</span>
                </Link>
                <Link href={route('dashboard.settings')} className={clsx("py-5 flex flex-col gap-1.5 text-black/50 items-center justify-center group font-[Montreal-Book]", url == '/dashboard/setting' && '!text-black !font-[Montreal-Medium]')}>
                    <span><BsGear className="w-7 h-7"/></span>
                    <span className="text-sm  tracking-wide">Pengaturan</span>
                </Link>
            </nav>

            <AnimatePresence>
                {isOpenMenu && (
                    <>
                        {/* Overlay background */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu} // klik luar untuk close
                        />

                        {/* Sidebar Menu */}
                        <motion.div
                            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-4"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        >
                            <aside
                                className={clsx(
                                    " h-full flex flex-col justify-between w-full"
                                )}
                            >
                                <div>
                                    <div className="mb-10 flex items-center justify-between">
                                        <Link
                                            href={route("dashboard")}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                                <BiCube className="w-4 h-4" />
                                            </div>
                                            <h1 className="text-xs font-medium">
                                                Nexiro Hair
                                            </h1>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                                        >
                                            <FaXmark className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <ul className="space-y-1">
                                        {menuItems.map((item) => (
                                            <li key={item.path}>
                                                <Link
                                                    href={route(item.routeName)}
                                                    className={clsx(
                                                        "flex w-full items-center gap-2 transition rounded-md group px-3 py-2.5 text-xs hover:bg-gray-100",
                                                        url === item.path &&
                                                            "bg-gray-100"
                                                    )}
                                                >
                                                    <span>{item.icon}</span>
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <ul>
                                    <li>
                                        <Link
                                            href={route("profile.edit")}
                                            className={clsx(
                                                "flex items-center font-[Montreal-Book] tracking-wide gap-2 transition rounded-md group px-3 py-2.5 text-xs hover:bg-gray-100"
                                            )}
                                        >
                                            <div className="flex w-7 h-7 uppercase rounded-full items-center justify-center text-sm relative bg-gray-200">
                                                {user.name[0]}
                                                <div className="w-2 h-2 rounded-full bg-green-500 absolute bottom-0 right-0">
                                                    {""}
                                                </div>
                                            </div>
                                            <span
                                                className={clsx("capitalize")}
                                            >
                                                {user.name}
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            method="post"
                                            as="button"
                                            href={route("logout")}
                                            className={clsx(
                                                "flex items-center gap-2 bg-black text-white justify-center font-[Montreal-Medium] tracking-wide transition mt-1 rounded-md group px-3 py-2.5 text-sm w-full hover:bg-gray-100 hover:text-black"
                                            )}
                                        >
                                            <span
                                                className={clsx("capitalize")}
                                            >
                                                Logout
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </aside>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
