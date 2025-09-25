import { Link } from "@inertiajs/react";
import { CircleArrowOutUpRightIcon } from "lucide-react";
import { PiWhatsappLogoFill } from "react-icons/pi";

const Services = ({ pricelists, config }) => {
    const formatPrice = (min_price) => {
        if (min_price >= 1000) {
            const result = min_price / 1000;
            return result % 1 === 0 ? result + "k" : result.toFixed(1) + "k";
        }
        return min_price;
    };

    const generateWaLink = (number, serviceName) => {
        const message = `Halo min, Saya mau tanya mengenai cara booking dan untuk harga layanan *${serviceName}* gimana ya?`;
        return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    };

    return (
        <section
            id="pricelist"
            className="w-full min-h-screen lg:p-20 px-5 py-10"
        >
            <div className="mb-10 text-center">
                <h1 className="text-5xl font-[Montreal-Medium] text-black">
                    Pricelist
                </h1>
                <p className="text-sm font-[Montreal-Book] mx-auto md:max-w-[50%] text-black tracking-wide">
                    Kami menyediakan banyak layanan berdasarkan segala kebutuhan
                    pelanggan kami. Mulai dari haircut, hairwash, coloring dan
                    lain sebagainya.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="">
                    {pricelists.map((pricelist, i) => (
                        <div key={i} className="mb-2 bg-neutral-50 p-5 rounded-3xl">
                            <div className="flex items-center justify-between gap-10 mb-2">
                                <div>
                                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                                        {pricelist.name}
                                    </h1>
                                    <p className="text-xs font-[Montreal-Book] tracking-wide text-black/70">
                                        {pricelist.description}
                                    </p>
                                </div>
                                {pricelist.min_price > 0 && (
                                    <div>
                                        <span className="text-xs font-[Montreal-Book] text-black/70 text-nowrap block text-end">
                                            Start from
                                        </span>
                                        <span className="block text-base font-[Montreal-Medium] text-black text-nowrap text-end">
                                            {formatPrice(pricelist.min_price)}
                                            {pricelist.max_price && (
                                                <>
                                                    {" "}
                                                    -{" "}
                                                    {formatPrice(
                                                        pricelist.max_price
                                                    )}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                )}
                                {pricelist.items.length > 0 && (
                                    <span className="text-xs font-[Montreal-Book] text-black/70 text-nowrap block">
                                        Start from
                                    </span>
                                )}
                            </div>
                            {pricelist.items.length > 0 && (
                                <ul className="list-disc pl-5">
                                    {pricelist?.items.map((item, index) => (
                                        <li key={index} className="">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs font-[Montreal-Book] text-black tracking-wide">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                {item.min_price > 0 && (
                                                    <div className="">
                                                        <span className="block text-base font-[Montreal-Medium] text-black text-nowrap">
                                                            {formatPrice(
                                                                item.min_price
                                                            )}
                                                            {item.max_price >
                                                                0 && (
                                                                <>
                                                                    {" "}
                                                                    -{" "}
                                                                    {formatPrice(
                                                                        item.max_price
                                                                    )}
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {pricelist.is_custom_price == 1 && (
                                <div className="flex justify-start">
                                    <a
                                        href={generateWaLink(
                                            config.whatsapp,
                                            pricelist.name
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-[Montreal-Book] text-black tracking-wide bg-white border text-nowrap border-neutral-100 px-4 py-2.5 rounded-3xl flex items-center gap-2 justify-between w-full md:text-start text-center hover:text-green-700 hover:bg-white transition capitalize"
                                    >
                                        <span className="flex items-center gap-2">
                                            <PiWhatsappLogoFill className="text-green-500" />{" "}
                                            Ask to hair designer
                                        </span>
                                        <CircleArrowOutUpRightIcon className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-neutral-50 h-max p-5 rounded-3xl flex flex-col items-center justify-between py-20 md:sticky top-32">
                    <div className="flex flex-col items-center ">
                        <h1 className="text-3xl font-[Montreal-Bold] text-black">
                            Nexiro Hair
                        </h1>
                        <p className="text-sm font-[Montreal-Book] text-black tracking-wide">
                            Cukur gampang, tinggal booking
                        </p>

                        <p className="text-xs font-[Montreal-Book] text-black tracking-wide mt-10  text-center md:px-10 lg:px-20 mx-auto">
                            Lebih dari sekadar tempat potong rambut, kami hadir
                            untuk menciptakan pengalaman grooming yang sempurna
                            karna Kami percaya setiap gaya adalah cerminan
                            kepribadian—dan kami di sini untuk mewujudkannya.
                        </p>

                        <div className="flex items-center justify-center gap-3 mt-10">
                            <Link
                                href={route("reservation")}
                                className="text-white bg-black hover:text-black hover:bg-white transition font-[Montreal-book] text-sm tracking-wide border border-black px-4 py-2.5 rounded shadow"
                            >
                                Klik disini untuk reservasi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
