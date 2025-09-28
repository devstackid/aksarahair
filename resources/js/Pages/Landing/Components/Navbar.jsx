import LinkButton from "@/Components/Atoms/Button/LinkButton";
import LinkHref from "@/Components/Atoms/Button/LinkHref";
import LogoWithLink from "@/Components/Atoms/Logo/LogoWithLink";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";

const Navbar = ({ auth }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Navbar utama */}
            <div className="lg:px-20 flex px-5 items-center bg-white justify-between sticky top-0 z-50 pt-3 pb-3">
                <div className="md:flex w-full items-center gap-5">
                    <div className="flex items-center justify-between pr-5 md:pr-0">
                        <LogoWithLink
                            className={
                                "flex items-center gap-3 w-[40px] h-[40px] rounded-full bg-neutral-50 justify-center"
                            }
                            href={route("index")}
                            src={"assets/logo-nexiro.png"}
                            width={25}
                            alt={"Logo"}
                        />

                        <button
                            type="button"
                            onClick={toggleNavbar}
                            className="text-black md:hidden"
                        >
                            <FaBars className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navbar versi desktop */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-5 w-full py-2 mt-2 px-5 md:px-0 md:py-0 md:mt-0 md:border-none md:w-auto overflow-x-auto md:overflow-hidden text-nowrap">
                        <LinkHref href={route("index")} text="Beranda" />
                        <LinkHref href={route("reservation")} text="Reservasi" />
                        <LinkHref href={route("about")} text="Tentang Kami" />
                        <LinkHref href={route("teams")} text="Tim Kami" />
                        <LinkHref href={route("pricelist")} text="Pricelist" />
                        <LinkHref href={route("gallery")} text="Gallery" />
                        <LinkHref href={route("review")} text="Review" />
                        <LinkHref href={route("product")} text="Product" />
                    </div>
                </div>

                {!auth.user ? (
                    <LinkButton
                        className={"md:flex hidden"}
                        href={route("login")}
                    >
                        Login
                    </LinkButton>
                ) : (
                    <Link
                        method="post"
                        as="button"
                        className={"md:flex hidden py-2 bg-black px-5 text-white rounded items-center gap-2 transition text-xs tracking-wide font-[Montreal-Bold]"}
                        href={route("logout")}
                    >
                        Logout
                    </Link>
                )}
            </div>

            {/* Navbar fullscreen versi mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-[9999] flex"
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="bg-white w-full h-full p-6 flex flex-col"
                        >
                            {/* Tombol close */}
                            <button
                                type="button"
                                onClick={toggleNavbar}
                                className="self-end mb-6 text-black"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>

                            {/* Link navigasi */}
                            <nav className="flex flex-col gap-5 text-lg font-medium">
                                <LinkHref href={route("index")} text="Beranda" />
                                <LinkHref href={route("reservation")} text="Reservasi" />
                                <LinkHref href={route("about")} text="Tentang Kami" />
                                <LinkHref href={route("teams")} text="Tim Kami" />
                                <LinkHref href={route("pricelist")} text="Pricelist" />
                                <LinkHref href={route("gallery")} text="Gallery" />
                                <LinkHref href={route("review")} text="Review" />
                                <LinkHref href={route("product")} text="Product" />
                            </nav>

                            {/* Auth buttons */}
                            <div className="mt-auto">
                                {!auth.user ? (
                                    <LinkButton
                                        className={"bg-black w-full block !m-0 px-5 py-2.5 text-white rounded"}
                                        href={route("login")}
                                    >
                                        Login
                                    </LinkButton>
                                ) : (
                                    <Link
                                        method="post"
                                        as="button"
                                        className={"bg-black w-full block !m-0 px-5 py-2.5 text-white rounded items-center gap-2 transition text-xs tracking-wide font-[Montreal-Bold]"}
                                        href={route("logout")}
                                    >
                                        Logout
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
