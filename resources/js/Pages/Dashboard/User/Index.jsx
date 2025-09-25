import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Head, Link, router } from "@inertiajs/react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { PiDotsThreeVerticalBold, PiKey } from "react-icons/pi";
import CreateButton from "@/Layouts/Components/CreateButton";
import { useDeleteStore } from "../utils/store/UseDeleteStore";
import BulkDeleteButton from "@/Layouts/Components/BulkDeleteButton";
import Pagination from "@/Layouts/Components/Pagination";
const Index = ({ auth, users }) => {
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

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
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            [user.name, user.username, user.role, user.department]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, users]);

    // fitur pagination

    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredUsers.slice(start, start + perPage);
    }, [filteredUsers, currentPage, perPage]);

    const totalPages = Math.ceil(filteredUsers.length / perPage);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Pengguna" />

            <div className="w-full pb-32">
                <div className="flex items-center justify-between md:p-4 pb-4">
                    <h1 className="text-sm text-black font-[Montreal-Medium] tracking-wide">
                        Akun Pengguna
                    </h1>
                    <CreateButton href={route("dashboard.users.add")} />
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
                                className="rounded-md text-xs text-black"
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
                                            "dashboard.users.bulkDelete"
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

                    <div className="grid grid-cols-1 gap-2 md:px-5">
                        {paginatedUsers?.map((user, i) => (
                            <div
                                key={i}
                                onClick={
                                    user.id !== auth.user.id
                                        ? () => handleSelect(user.id)
                                        : undefined
                                }
                                className={clsx(
                                    "flex items-center justify-between border rounded border-neutral-100 border-s-2 border-s-teal-500 p-2 mb-1.5 cursor-pointer transition hover:bg-neutral-50",
                                    isSelected(user.id)
                                        ? "bg-red-200 border border-red-500"
                                        : "bg-white"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                                        A
                                    </div>
                                    <div>
                                        <h1 className="text-sm">{user.name}</h1>
                                        <div className="flex flex-wrap text-xs items-center gap-2">
                                            <span>@{user.username}</span>
                                            <div className="flex items-center gap-1">
                                                <PiKey />
                                                <span className="text-green-700">
                                                    {user.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Menu>
                                    <MenuButton
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                                    >
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
                                                    "dashboard.users.edit",
                                                    user.id
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
                                                        "dashboard.users.destroy",
                                                        user.id
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
                        ))}
                    </div>

                    {/* footer pagination */}
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
