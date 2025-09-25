import { Link } from "@inertiajs/react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { BsXLg } from "react-icons/bs";

export default function OffCanvas({ openNavbar, auth }) {
    return (
        <AnimatePresence>
            {/* Panel OffCanvas */}
            <motion.div
                key="offcanvas"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.35 }}
                className="fixed top-0 right-0 h-full md:h-max md:w-max md:right-20 md:top-20 w-72 bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 flex flex-col font-inter rounded-l-2xl md:rounded-r-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        {auth?.user && (
                            <div className="w-9 h-9 shrink-0 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center font-semibold text-sm text-gray-700">
                                <img src={auth.user.google_image_url} className="w-full h-full object-coverr" alt="" />
                            </div>
                        )}
                        <h2 className="text-sm font-bold text-gray-800">
                            {auth?.user ? `${auth.user.name}` : "Selamat Datang"}
                        </h2>
                    </div>
                    <button
                        onClick={openNavbar}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <BsXLg className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Isi Menu */}
                <div className="flex-1 p-5 space-y-5">
                    <nav className="flex flex-col gap-3">
                        <Link
                            href={route("index")}
                            className="px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium text-black text-sm hover:text-blue-600"
                        >
                            Beranda
                        </Link>
                        <Link
                            href={route("reservation")}
                            className="px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium text-black text-sm hover:text-blue-600"
                        >
                            Reservasi
                        </Link>
                    </nav>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-200">
                    {auth?.user ? (
                        <Link
                            method="post"
                            as="button"
                            href={route("logout")}
                            className={clsx(
                                "w-full flex items-center justify-center text-sm px-3 py-2 rounded-lg bg-black text-white font-semibold transition hover:bg-gray-100 hover:text-black"
                            )}
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link
                            href={route("login")}
                            className={clsx(
                                "w-full flex items-center justify-center text-sm px-3 py-2 rounded-lg bg-black text-white font-semibold transition hover:bg-gray-100 hover:text-black"
                            )}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={openNavbar}
                className="fixed inset-0 bg-black z-40"
            />
        </AnimatePresence>
    );
}
