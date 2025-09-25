import { Link } from "@inertiajs/react";
import { BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="w-full bg-neutral-100 md:p-20 py-20 px-5 relative overflow-hidden">
            <div className="flex flex-wrap justify-between w-full z-30 relative">
                <div className="md:max-w-[40%]">
                    <div className="flex gap-5 items-start mb-5">
                        <div>
                            <h1 className="text-xl md:text-3xl text-black font-[Montreal-Medium] mb-10">
                                Nexiro Hair
                            </h1>
                            <p className="text-sm md:text-xl font-[Montreal-Medium] text-black">
                                Where Precision Meets Perfection
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm md:text-base font-[Montreal-Book] tracking-wide text-black/80 ">
                            Jl. Pangeran Antasari No. 77, Kel. Kemuning, Kec.
                            Banjarbaru Selatan Kalimantan Selatan, Indonesia
                            70713
                        </p>
                    </div>
                </div>

                <div className=" mt-5 md:mt-20">
                    <div className="flex flex-col gap-5">
                        <Link
                            href={route("index")}
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Beranda
                        </Link>
                        <Link
                            href={route("reservation")}
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Reservasi
                        </Link>
                        <a
                            href='#about'
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Tentang Kami
                        </a>
                        <a
                            href='#teams'
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Tim Kami
                        </a>
                        <a
                            href='#pricelist'
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Pricelist
                        </a>
                    </div>
                    
                </div>

                <div className=" mt-5 md:mt-20">
                    <div className="flex flex-col gap-5">
                        
                        <a
                            href='#gallery'
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Gallery
                        </a>
                        <a
                            href='#review'
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Reviews
                        </a>
                        <a
                            href='#product'
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Produk
                        </a>
                        <Link
                            href={route('index')}
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Ketentuan Layanan
                        </Link>
                        <Link
                            href={route('index')}
                            className="text-sm font-[Montreal-Medium] text-black/80 tracking-wide"
                        >
                            Kebijakan Privasi
                        </Link>
                    </div>
                    
                </div>



                

                <div className="flex items-center self-start gap-3 mt-5 md:mt-20">
                    <a href="" className="text-black">
                        <BsInstagram />
                    </a>
                    <a href="" className="text-black">
                        <BsTiktok />
                    </a>
                    <a href="" className="text-black">
                        <BsWhatsapp />
                    </a>
                </div>
            </div>

            <div className="text-sm mt-10 font-[Montreal-Medium] tracking-wide text-black">
                <span>Copyright, 2025 @nexiro</span>
            </div>
        </div>
    );
};

export default Footer;
