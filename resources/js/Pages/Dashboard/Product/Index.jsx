import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import Swal from "sweetalert2";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { PencilIcon, TrashIcon } from "lucide-react";
import CreateButton from "@/Layouts/Components/CreateButton";
import BulkDeleteButton from "@/Layouts/Components/BulkDeleteButton";
import { useDeleteStore } from "../utils/store/UseDeleteStore";
import Tabs from "@/Layouts/Components/Tabs";
const Index = ({ auth, products }) => {
    const {
        selectedIds,
        setSelectedIds,
        handleBulkDelete,
        handleSingleDelete,
    } = useDeleteStore();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedProduct(null), 200);
    };
    const handleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const isSelected = (id) => selectedIds.includes(id);


    const { url } = usePage();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Produk " />

            <div className="w-full h-auto md:px-2 pt-5 pb-36 bg-white md:bg-transparent shadow rounded-3xl px-5 md:shadow-none md:rounded-none">
                <div className="mb-5">
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Pengaturan
                    </h1>
                    <p className="text-xs font-normal text-black">
                        Atur aplikasi dengan mengubah informasi pada formulir
                        berikut
                    </p>
                </div>

                <Tabs
    currentUrl={url}
    tabs={[
        { name: "Umum", href: route("dashboard.settings"), activePath: "/dashboard/setting" },
        { name: "Pricelist", href: route("dashboard.pricelists"), activePath: "/dashboard/pricelist" },
        { name: "Produk Saya", href: route("dashboard.products"), activePath: "/dashboard/product" },
        { name: "Galeri Foto", href: route("dashboard.galleries"), activePath: "/dashboard/gallery" },
    ]}
/>


                <div className="flex items-center justify-between md:p-4 pb-4">
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Daftar Produk
                    </h1>
                    <CreateButton href={route("dashboard.product.add")} />
                </div>

                <div className="md:px-5 mb-3 flex items-center justify-between">
                    {selectedIds.length > 0 ? (
                        <span className="text-xs">
                            Dipilih ({selectedIds.length})
                        </span>
                    ) : (
                        <span className="text-xs">Dipilih (0)</span>
                    )}
                    {selectedIds.length > 0 && (
                        <BulkDeleteButton
                                                    onDelete={() =>
                                                        handleBulkDelete(
                                                            "dashboard.product.bulkDelete"
                                                        )
                                                    }
                                                    count={selectedIds.length}
                                                    disabled={selectedIds.length === 0}
                                                    label="Hapus Pilihan"
                                                />
                    )}
                </div>

                <div className="w-full h-full">
                    {/* Heading */}

                    {products.length > 0 ? (
                        <div className="overflow-x-auto md:px-5">
                            <table className="w-full text-xs border-collapse text-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-neutral-200">
                                        <th className="p-2 text-left">#</th>
                                        <th className="p-2 text-left">Foto</th>
                                        <th className="p-2 text-left">
                                            Produk
                                        </th>
                                        <th className="p-2 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => {
                                        return (
                                            <tr
                                                key={product.id}
                                                onClick={() =>
                                                    handleSelect(product.id)
                                                }
                                                className={clsx(
                                                    "border-b border-neutral-100 cursor-pointer transition hover:bg-neutral-50",
                                                    isSelected(product.id)
                                                        ? "bg-red-200 border border-red-500"
                                                        : "bg-white"
                                                )}
                                            >
                                                <td className="p-2 w-10 text-center">
                                                    {i + 1}
                                                </td>
                                                <td className="p-2">
                                                    <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden text-sm">
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            className="w-full h-full object-cover"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td className="p-2">
                                                    <div className="text-xs mb-1">
                                                        {product.name}
                                                        <p className="">
                                                            {
                                                                product.description
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                <td
                                                    className="p-2"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <a
                                                            href={product.link}
                                                            target="_blank"
                                                            className="flex rounded-3xl px-5 py-2 gap-2 text-sm items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition"
                                                        >
                                                            <span className="text-xs">
                                                                Kunjungi
                                                            </span>
                                                            <BsBoxArrowInUpRight className="" />
                                                        </a>
                                                        <Menu>
                                                            <MenuButton className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                                                                <PiDotsThreeVerticalBold className="w-5 h-5 text-black" />
                                                            </MenuButton>
                                                            <MenuItems
                                                                transition
                                                                anchor="bottom end"
                                                                className="w-52 origin-top-right space-y-1 rounded-2xl border border-neutral-100 bg-white text-sm p-1 shadow-xl text-foreground transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                                            >
                                                                <MenuItem>
                                                                    <Link
                                                                        href={route(
                                                                            "dashboard.product.edit",
                                                                            product.id
                                                                        )}
                                                                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition hover:bg-gray-100"
                                                                    >
                                                                        <PencilIcon className="size-4 text-black/70" />
                                                                        Edit
                                                                    </Link>
                                                                </MenuItem>
                                                                <MenuItem>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleSingleDelete(
                                                                                "dashboard.product.destroy",
                                                                                product.id
                                                                            )
                                                                        }
                                                                        className="group flex w-full items-center gap-2 px-3 rounded-lg py-1.5 transition hover:bg-gray-100"
                                                                    >
                                                                        <TrashIcon className="size-4 text-black/70" />
                                                                        Hapus
                                                                    </button>
                                                                </MenuItem>
                                                            </MenuItems>
                                                        </Menu>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center mt-10">
                            <img
                                src="/assets/429.svg"
                                className="w-[90%] md:w-[30%] mb-10"
                                alt=""
                            />
                            <h1 className="text-xs text-black px-10 text-center">
                                Product belum ditambahkan..
                            </h1>
                            <Link
                                href={route("dashboard.product.add")}
                                className="text-xs mt-2 font-[Montreal-Medium] tracking-wide text-white bg-black px-5 py-2 rounded-3xl"
                            >
                                Tambahkan
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
