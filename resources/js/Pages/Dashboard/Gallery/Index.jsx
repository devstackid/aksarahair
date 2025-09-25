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
import { useDeleteStore } from "../utils/store/UseDeleteStore";
import BulkDeleteButton from "@/Layouts/Components/BulkDeleteButton";
import Tabs from "@/Layouts/Components/Tabs";
const Index = ({ auth, galleries }) => {
    const {
        selectedIds,
        setSelectedIds,
        handleBulkDelete,
        handleSingleDelete,
    } = useDeleteStore();
    const [selectedGallery, setSelectedGallery] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (artist) => {
        setSelectedGallery(artist); // simpan data artist yang diklik
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedGallery(null), 200);
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
            <Head title="Gallery " />

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
                        {
                            name: "Umum",
                            href: route("dashboard.settings"),
                            activePath: "/dashboard/setting",
                        },
                        {
                            name: "Pricelist",
                            href: route("dashboard.pricelists"),
                            activePath: "/dashboard/pricelist",
                        },
                        {
                            name: "Produk Saya",
                            href: route("dashboard.products"),
                            activePath: "/dashboard/product",
                        },
                        {
                            name: "Galeri Foto",
                            href: route("dashboard.galleries"),
                            activePath: "/dashboard/gallery",
                        },
                    ]}
                />

                <div className="flex items-center justify-between md:p-4 pb-4">
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Galeri Foto
                    </h1>
                    <CreateButton href={route("dashboard.gallery.add")} />
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
                                handleBulkDelete("dashboard.gallery.bulkDelete")
                            }
                            count={selectedIds.length}
                            disabled={selectedIds.length === 0}
                            label="Hapus Pilihan"
                        />
                    )}
                </div>
                <div className="w-full h-full">
                    {/* Heading */}

                    {galleries.length > 0 ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:px-5">
                            {galleries.map((gallery, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(gallery.id)}
                                    className={clsx(
                                        "border p-2 rounded-md border-l-2 cursor-pointer border-l-blue-500",
                                        isSelected(gallery.id)
                                            ? "bg-red-200 border border-red-500"
                                            : "bg-white"
                                    )}
                                >
                                    <div className="flex items-center gap-3 justify-between">
                                        <div className="w-full h-20 rounded overflow-hidden flex items-center justify-center">
                                            <img
                                                src={`/storage/${gallery.image}`}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="p-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex items-center flex-col gap-3">
                                                <button
                                                    onClick={(e) =>
                                                        openModal(gallery)
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
                                                                    "dashboard.gallery.edit",
                                                                    gallery.id
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
                                                                        "dashboard.gallery.destroy",
                                                                        gallery.id
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center mt-10">
                            <img
                                src="/assets/429.svg"
                                className="w-[90%] md:w-[30%] mb-10"
                                alt=""
                            />
                            <h1 className="text-xs text-black px-10 text-center">
                                Galeri foto belum ditambahkan..
                            </h1>
                            <Link
                                href={route("dashboard.gallery.add")}
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
                                    className="z-50 rounded-lg shadow-lg w-[95%] md:w-[35%] max-h-[80vh] overflow-y-auto"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-full h-full overflow-hidden flex items-center justify-center">
                                        <img
                                            src={`/storage/${selectedGallery.image}`}
                                            className="w-full h-full object-cover"
                                            alt={selectedGallery.image}
                                        />
                                    </div>
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
