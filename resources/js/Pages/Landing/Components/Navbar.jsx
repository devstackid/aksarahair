import { Link } from "@inertiajs/react";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { FaBars } from "react-icons/fa6";

const Navbar = ({ auth }) => {
    return (
        <div className="lg:px-20 flex items-center bg-white justify-between sticky top-0 z-50 pt-3 md:pb-3 pb-0 border-b md:border-none">
            <div className="md:flex w-full items-center gap-5">
                <div className="flex items-center justify-between">
                    <Link
                        href={route("index")}
                        className="flex items-center gap-3 w-[40px] h-[40px] rounded-full bg-neutral-50 justify-center mx-5 md:mx-0"
                    >
                        <img src="assets/logo-nexiro.png" width={25} alt="" />
                    </Link>

                    {!auth.user ? (
                        <>
                            <Link
                                href={route("login")}
                                className="py-2  flex md:hidden mx-5 items-center gap-2 transition text-xs tracking-wide font-[Montreal-Bold]"
                            >
                                <LogInIcon className="w-5 h-5" /> Login
                            </Link>
                        </>
                    ) : (
                        <Link
                            method="post"
                            as="button"
                            href={route("logout")}
                            className="py-2 flex md:hidden mx-5 items-center gap-2 transition text-xs tracking-wide font-[Montreal-Bold]"
                        >
                            <LogOutIcon className="w-5 h-5"/> Logout
                        </Link>
                    )}
                </div>
                <div className="flex items-center gap-4 lg:gap-5 w-full py-2 mt-2 px-5 md:px-0 md:py-0 md:mt-0 border-t md:border-none md:w-auto overflow-x-auto md:overflow-hidden text-nowrap">
                    <Link
                        href={route("index")}
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Beranda
                    </Link>
                    <Link
                        href={route("reservation")}
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Reservasi
                    </Link>
                    <a
                        href="#about"
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Tentang Kami
                    </a>

                    <a
                        href="#teams"
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Tim Kami
                    </a>
                    <a
                        href="#pricelist"
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Pricelist
                    </a>
                    <a
                        href="#gallery"
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Gallery
                    </a>
                    <a
                        href="#review"
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Review
                    </a>
                    <a
                        href="#product"
                        className="text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide"
                    >
                        Produk
                    </a>
                </div>
            </div>

            {!auth.user ? (
                <>
                    <Link
                        href={route("login")}
                        className="px-5 py-2 bg-black rounded text-white hidden md:flex hover:bg-white hover:text-black transition text-xs tracking-wide shadow font-[Montreal-Bold]"
                    >
                        Login
                    </Link>
                </>
            ) : (
                <Link
                    method="post"
                    as="button"
                    href={route("logout")}
                    className="px-5 py-2 bg-black rounded text-white hidden md:flex hover:bg-white hover:text-black transition text-xs tracking-wide shadow font-[Montreal-Bold]"
                >
                    Logout
                </Link>
            )}
        </div>
    );
};

export default Navbar;
