import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import debounce from "lodash.debounce";
import { Spinner } from "@radix-ui/themes";
import { Calendar, Star } from "lucide-react";
import { IoStar } from "react-icons/io5";
import { useDeleteStore } from "../utils/store/UseDeleteStore";
import Pagination from "@/Layouts/Components/Pagination";
import BulkDeleteButton from "@/Layouts/Components/BulkDeleteButton";
const Index = ({ auth }) => {
    const [testimonial, setTestimonial] = useState([]);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

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

    const fetchTestimonial = async (params = {}) => {
        try {
            setLoading(true);
            const res = await axios.get("/api/testimonials/data", {
                params: {
                    search,
                    date,
                    page: currentPage,
                    per_page: perPage,
                    ...params,
                },
            });
            setTestimonial(res.data.data);
            setTotalPages(res.data.last_page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetch = useMemo(
        () => debounce(fetchTestimonial, 500),
        [search, date, perPage, currentPage]
    );

    useEffect(() => {
        debouncedFetch();
        return () => debouncedFetch.cancel();
    }, [search, date, perPage, currentPage]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Review Pelanggan " />

            <div className="w-full pb-32">
                <div className="flex items-center justify-between md:p-4 pb-4">
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Review Pelanggan
                    </h1>
                </div>
                <div className="w-full h-full">
                    {/* Heading */}
                    <div className="flex md:flex-row flex-col md:items-center md:justify-between md:p-5 pb-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:mb-0 mb-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-normal text-black">
                                    Tampilkan
                                </span>
                                <select
                                    value={perPage}
                                    onChange={(e) =>
                                        setPerPage(parseInt(e.target.value))
                                    }
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

                            <div className="flex w-full md:w-auto items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <input
                                    className="text-sm min-w-[120px] px-2 md:px-3 w-full md:w-auto md:text-xs border py-2.5 md:py-1 md:p-1 rounded-3xl"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-center gap-3">
                            {selectedIds.length > 0 ? (
                                <BulkDeleteButton
                                    onDelete={() =>
                                        handleBulkDelete(
                                            "dashboard.testimonial.bulkDelete"
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

                    {loading ? (
                        <div className="w-full h-full mt-20 flex items-center gap-2 justify-center">
                            <Spinner size={3} />{" "}
                            <span className="text-sm">Sedang Mencari..</span>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto md:px-5">
                                <table className="w-full text-xs border-collapse text-nowrap">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-neutral-200">
                                            <th className="p-2 text-left">#</th>
                                            <th className="p-2 text-left">
                                                Nama
                                            </th>
                                            <th className="p-2 text-left">
                                                Tanggal
                                            </th>
                                            <th className="p-2 text-left">
                                                Review
                                            </th>
                                            <th className="p-2 text-left">
                                                Rating
                                            </th>

                                            <th className="p-2 text-left">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testimonial?.map((test, i) => {
                                            return (
                                                <tr
                                                    key={test.id}
                                                    onClick={() =>
                                                        handleSelect(test.id)
                                                    }
                                                    className={clsx(
                                                        "border-b border-neutral-100 cursor-pointer transition hover:bg-neutral-50",
                                                        isSelected(test.id)
                                                            ? "bg-red-200 border border-red-500"
                                                            : "bg-white"
                                                    )}
                                                >
                                                    <td className="p-2 w-10 text-center">
                                                        {i + 1}
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-xs mb-1">
                                                            {test.user.name}
                                                        </div>
                                                        <div className="text-xs">
                                                            {test.user.email}
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-xs flex items-center gap-1.5">
                                                            {new Date(
                                                                test.created_at
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    weekday:
                                                                        "long",
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="p-2 capitalize text-wrap">
                                                        {test.text}
                                                    </td>
                                                    <td className="p-2 capitalize text-wrap">
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map(
                                                                (_, i) => {
                                                                    const starValue =
                                                                        i + 1;
                                                                    const isActive =
                                                                        starValue <=
                                                                        test.stars;

                                                                    return (
                                                                        <IoStar
                                                                            key={
                                                                                i
                                                                            }
                                                                            className={`w-3 h-3 ${
                                                                                isActive
                                                                                    ? test.stars <=
                                                                                      3
                                                                                        ? "text-yellow" // ⭐ jika rating 1–3 → hitam
                                                                                        : "text-yellow" // ⭐ jika rating 4–5 → kuning
                                                                                    : "text-gray-300" // ☆ sisa → kosong
                                                                            }`}
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="p-2"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        } // biar klik tombol tidak trigger select
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                 onClick={() =>
                                                                                            handleSingleDelete(
                                                                                                "dashboard.testimonial.destroy",
                                                                                                test.id
                                                                                            )
                                                                                        }
                                                                className="text-xs py-1.5 px-3  rounded-3xl border transition font-bold bg-white border-neutral-200 hover:bg-black hover:text-white"
                                                            >
                                                                <TrashIcon className="size-4 text-black/70" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* footer pagination */}
                            <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
