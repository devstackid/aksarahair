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
const Index = ({ auth, pricelists }) => {
    const {
        selectedIds,
        setSelectedIds,
        handleBulkDelete,
        handleSingleDelete,
    } = useDeleteStore();
    const [selectedPricelist, setSelectedPricelist] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (artist) => {
        setSelectedPricelist(artist); // simpan data artist yang diklik
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedPricelist(null), 200);
    };
    const handleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const isSelected = (id) => selectedIds.includes(id);

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const formatPrice = (min_price) => {
        if (min_price >= 1000) {
            const result = min_price / 1000;
            return result % 1 === 0 ? result + "k" : result.toFixed(1) + "k";
        }
        return min_price;
    };
    const { url } = usePage();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pricelist " />

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
                        Atur Pricelist
                    </h1>
                    <CreateButton href={route("dashboard.pricelist.add")} />
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
                                    "dashboard.pricelist.bulkDelete"
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

                    {pricelists.length > 0 ? (
                        <div className="overflow-x-auto md:px-5">
                            <table className="w-full text-xs border-collapse text-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-neutral-200">
                                        <th className="p-2 text-left">#</th>
                                        <th className="p-2 text-left">Judul</th>
                                        <th className="p-2 text-left">
                                            Deskripsi
                                        </th>
                                        <th className="p-2 text-left">
                                            Mulai Dari
                                        </th>
                                        <th className="p-2 text-left">
                                            Sampai
                                        </th>

                                        <th className="p-2 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pricelists.map((pricelist, i) => {
                                        return (
                                            <tr
                                                key={pricelist.id}
                                                onClick={() =>
                                                    handleSelect(pricelist.id)
                                                }
                                                className={clsx(
                                                    "border-b border-neutral-100 cursor-pointer transition hover:bg-neutral-50",
                                                    isSelected(pricelist.id)
                                                        ? "bg-red-200 border border-red-500"
                                                        : "bg-white"
                                                )}
                                            >
                                                <td className="p-2 w-10 text-center">
                                                    {i + 1}
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-xs mb-1">
                                                        {pricelist.name}
                                                    </div>
                                                </td>

                                                <td className="p-2 capitalize text-wrap">
                                                    {pricelist.description}
                                                </td>
                                                <td className="p-2 capitalize text-wrap">
                                                    {pricelist.min_price > 0 ? (
                                                        <>
                                                            {formatRupiah(
                                                                pricelist.min_price
                                                            )}
                                                        </>
                                                    ) : (
                                                        "Tidak ditampilkan"
                                                    )}
                                                </td>
                                                <td className="p-2 capitalize text-wrap">
                                                    {pricelist.max_price > 0 ? (
                                                        <>
                                                            {formatRupiah(
                                                                pricelist.max_price
                                                            )}
                                                        </>
                                                    ) : (
                                                        "Tidak ditampilkan"
                                                    )}
                                                </td>
                                                <td
                                                    className="p-2"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={(e) =>
                                                                openModal(
                                                                    pricelist
                                                                )
                                                            }
                                                            type="button"
                                                            className="w-8 h-8 flex rounded-full text-sm items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition"
                                                        >
                                                            <BsBoxArrowInUpRight className="" />
                                                        </button>
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
                                                                            "dashboard.pricelist.edit",
                                                                            pricelist.id
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
                                                                                                "dashboard.pricelist.destroy",
                                                                                                pricelist.id
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
                                Pricelist belum ditambahkan..
                            </h1>
                            <Link
                                href={route("dashboard.pricelist.add")}
                                className="text-xs mt-2 font-[Montreal-Medium] tracking-wide text-white bg-black px-5 py-2 rounded-3xl"
                            >
                                Tambahkan
                            </Link>
                        </div>
                    )}
                </div>

                {isOpen && (
                    <>
                        <AnimatePresence>
                            {/* Overlay */}
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                            >
                                <motion.div
                                    className="z-50 bg-white rounded-lg shadow-lg p-6 w-[95%] md:w-[35%] max-h-[80vh] overflow-y-auto"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div>
                                        <div>
                                            <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                                                {selectedPricelist.name}
                                            </h1>
                                            <p className="text-xs font-normal text-black">
                                                {selectedPricelist.description}
                                            </p>
                                            {(selectedPricelist.min_price > 0 ||
                                                selectedPricelist.max_price >
                                                    0) && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-medium text-black">
                                                        Mulai dari
                                                    </span>
                                                    <span className="text-base font-bold text-black ">
                                                        {selectedPricelist.min_price >
                                                        0
                                                            ? formatPrice(
                                                                  selectedPricelist.min_price
                                                              )
                                                            : formatPrice(
                                                                  selectedPricelist.max_price
                                                              )}
                                                        {selectedPricelist.min_price >
                                                            0 &&
                                                            selectedPricelist.max_price >
                                                                0 &&
                                                            ` - ${formatPrice(
                                                                selectedPricelist.max_price
                                                            )}`}
                                                    </span>
                                                </div>
                                            )}

                                            {selectedPricelist.items.length >
                                                0 && (
                                                <div className="pb-1 border-b border-gray-100 mt-3">
                                                    {selectedPricelist.items.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between"
                                                            >
                                                                <h1 className="text-xs font-medium text-black">
                                                                    {item.name}
                                                                </h1>

                                                                {(item.min_price >
                                                                    0 ||
                                                                    item.max_price >
                                                                        0) && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-base font-bold text-black">
                                                                            {item.min_price >
                                                                            0
                                                                                ? formatPrice(
                                                                                      item.min_price
                                                                                  )
                                                                                : formatPrice(
                                                                                      item.max_price
                                                                                  )}
                                                                            {item.min_price >
                                                                                0 &&
                                                                            item.max_price >
                                                                                0
                                                                                ? ` - ${formatPrice(
                                                                                      selectedPricelist.max_price
                                                                                  )}`
                                                                                : ""}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="bg-black text-white font-[Montreal-Medium] tracking-wide block w-full mt-5 text-xs px-4 py-1.5 rounded hover:bg-gray-800"
                                    >
                                        Tutup
                                    </button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
