import { Link } from "@inertiajs/react";

const ProductSection = ({ products }) => {
    return (
        <section
            id="product"
            className="panel-products w-full h-auto overflow-hidden relative px-5 lg:px-20 pt-20 pb-10"
        >
            <div className="w-full flex flex-col items-center justify-center pb-20">
                <h1 className="text-5xl text-center max-w-full md:max-w-[50%] font-[Montreal-Medium] tracking-wide text-black">
                    Produk
                </h1>
                <h2 className="text-base text-center max-w-full md:max-w-[50%] font-[Montreal-Book] tracking-wide text-black">
                    Kunjungi marketplace kami dan temukan berbagai macam produk
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product, i) => (
                    <div
                        key={i}
                        className="bg-neutral-100 p-1.5 pb-5 rounded-3xl overflow-hidden h-full flex flex-col justify-between text-start group"
                    >
                        <div>
                            <div className="w-full h-[30vh] rounded-3xl overflow-hidden mb-5 group-hover:scale-90 transition">
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-125 transition"
                                />
                            </div>
                            <div className="px-3">
                                <h1 className="text-base font-[Montreal-Medium] text-black">
                                    {product.name}
                                </h1>
                                <p className="text-sm font-[Montreal-Book] text-black">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="font-[Montreal-Medium] mt-3 text-center">
                                <a
                                    target="_blank"
                                    href={product.link}
                                    className="block bg-white hover:bg-black hover:text-white transition tracking-wide rounded-3xl py-2.5 px-5 text-sm text-black"
                                >
                                    Lihat di Marketplace
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductSection;
