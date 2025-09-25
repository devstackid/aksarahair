import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Head, Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { PiDotsThreeVerticalBold, PiKey } from "react-icons/pi";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import CreateButton from "@/Layouts/Components/CreateButton";
import { useDeleteStore } from "../utils/store/UseDeleteStore";
import BulkDeleteButton from "@/Layouts/Components/BulkDeleteButton";
import Pagination from "@/Layouts/Components/Pagination";
const Index = ({ auth, artists }) => {
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);

    const openModal = (artist) => {
        setSelectedArtist(artist);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedArtist(null), 200);
    };

    const {
        selectedIds,
        setSelectedIds,
        handleBulkDelete,
        handleSingleDelete,
    } = useDeleteStore();
    const handleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const isSelected = (id) => selectedIds.includes(id);

    // fitur pencarian client side
    const filteredArtist = useMemo(() => {
        return artists.filter((artist) =>
            [artist.name].join(" ").toLowerCase().includes(search.toLowerCase())
        );
    }, [search, artists]);

    // fitur pagination

    const paginatedArtist = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredArtist.slice(start, start + perPage);
    }, [filteredArtist, currentPage, perPage]);

    const totalPages = Math.ceil(filteredArtist.length / perPage);

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Hair Artist " />

            <div className="w-full pb-32">
                <div className="flex items-center justify-between md:p-4 pb-4">
                    <h1 className="text-sm text-black font-[Montreal-Medium] tracking-wide">
                        Hair Artist
                    </h1>
                    <CreateButton href={route("dashboard.artist.add")} />
                </div>
                <div className="w-full h-full">
                    {/* Heading */}
                    <div className="flex md:flex-row flex-col md:items-center md:justify-between md:p-5 pb-5">
                        <div className="flex items-center gap-3 md:mb-0 mb-2">
                            <span className="text-xs font-normal text-black">
                                Tampilkan
                            </span>
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    setPerPage(parseInt(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="rounded-md text-xs  font-[Montreal-Medium] tracking-wide text-black"
                            >
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span className="text-xs  font-normal text-black">
                                Data
                            </span>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-center gap-3">
                            {selectedIds.length > 0 ? (
                                <BulkDeleteButton
                                    onDelete={() =>
                                        handleBulkDelete(
                                            "dashboard.artist.bulkDelete"
                                        )
                                    }
                                    count={selectedIds.length}
                                    disabled={selectedIds.length === 0}
                                    label="Hapus Pilihan"
                                />
                            ) : (
                                <span className="text-xs">Dipilih (0)</span>
                            )}
                            <form className="pl-3 pr-2 md:order-2 order-1 border bg-white flex items-center rounded-3xl gap-2">
                                <label htmlFor="search">
                                    <BiSearch width={8} height={8} />
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="py-2.5 md:py-1.5 bg-transparent text-xs w-full font-normal text-black outline-none"
                                    placeholder="Search.."
                                    autoComplete="off"
                                />
                            </form>
                        </div>
                    </div>

                    <div className="md:grid grid-cols-1 gap-2 flex flex-col w-full overflow-x-auto md:px-5">
                        {paginatedArtist?.map((artist, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelect(artist.id)}
                                className={clsx(
                                    "flex items-center justify-between md:gap-0 gap-10 border rounded border-neutral-100 border-s-2 border-s-teal-500 p-2 mb-1.5 cursor-pointer transition hover:bg-neutral-50 text-nowrap w-min md:w-auto",
                                    isSelected(artist.id)
                                        ? "bg-red-200 border border-red-500"
                                        : "bg-white"
                                )}
                            >
                                <div className="flex items-center gap-2 w-[50%]">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden text-sm">
                                        <img
                                            src={`/storage/${artist.image}`}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <h1 className="text-sm">
                                        {artist.name}
                                        {artist.is_conditional_serve == 1 && (
                                            <span className="block text-xs text-black">
                                                Weekday & Weekend
                                            </span>
                                        )}
                                    </h1>
                                </div>

                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-3"
                                >
                                    <button
                                        onClick={(e) => openModal(artist)}
                                        type="button"
                                        className="w-8 h-8 flex rounded-full text-sm items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition"
                                    >
                                        <BsBoxArrowInUpRight className="" />
                                    </button>
                                    <Link
                                        href={route(
                                            "dashboard.services.add",
                                            artist.id
                                        )}
                                        className="text-xs py-1.5 px-3 rounded-3xl border bg-white border-neutral-200 hover:bg-black hover:text-white transition"
                                    >
                                        Atur Layanan
                                    </Link>
                                    <Menu>
                                        <MenuButton className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                                            <PiDotsThreeVerticalBold className="w-5 h-5 text-black" />
                                        </MenuButton>

                                        <MenuItems
                                            transition
                                            anchor="bottom end"
                                            className="w-52 origin-top-right space-y-1 rounded-2xl border border-neutral-100 bg-white text-sm p-1 shadow-xl text-foreground transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                        >
                                            <MenuItem>
                                                <Link
                                                    href={route(
                                                        "dashboard.artist.edit",
                                                        artist.id
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
                                                            "dashboard.artist.destroy",
                                                            artist.id
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
                        ))}
                    </div>

                    {/* footer pagination */}
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
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
                                    <div className="w-20 h-20 rounded-full mb-5 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`/storage/${selectedArtist.image}`}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <div className="pb-2 border-b border-gray-100 mb-2">
                                        <h1 className="text-sm font-[Montreal-Medium] tracking-wide">
                                            {selectedArtist.name}
                                        </h1>
                                        {selectedArtist.is_conditional_serve ==
                                            1 && (
                                            <span className="block text-xs w-max text-blue-600">
                                                Weekday & Weekend
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        {selectedArtist.services.map(
                                            (service, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs pb-2 border-b border-gray-100 mb-2"
                                                >
                                                    <h1 className="text-xs font-[Montreal-Medium] tracking-wide mb-1">
                                                            {" "}
                                                            {
                                                                service
                                                                    .service_item
                                                                    .service_name
                                                            }
                                                    </h1>
                                                    {selectedArtist.is_conditional_serve ==
                                                    1 ? (
                                                        <>
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="">
                                                                    {" "}
                                                                    Weekday
                                                                </span>
                                                                    <span className="font-[Montreal-Medium] tracking-wide">
                                                                        {" "}
                                                                        {formatRupiah(
                                                                            service.weekday_price
                                                                        )}
                                                                    </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="">
                                                                    {" "}
                                                                    Weekend
                                                                </span>
                                                                    <span className="font-[Montreal-Medium] tracking-wide">
                                                                        {" "}
                                                                        {formatRupiah(
                                                                            service.weekend_price
                                                                        )}
                                                                    </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center justify-between">
                                                            <span className="">
                                                                {" "}
                                                                Price
                                                            </span>
                                                                <span className="font-[Montreal-Medium] tracking-wide">
                                                                    {" "}
                                                                    {formatRupiah(
                                                                        service.normal_price
                                                                    )}
                                                                </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
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
