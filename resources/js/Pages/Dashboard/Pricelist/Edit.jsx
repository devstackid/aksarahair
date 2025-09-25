import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { Head, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Trash } from "lucide-react";

const Edit = ({ auth, pricelist }) => {
    const { data, setData, put, processing } = useForm({
        name: pricelist.name || "",
        description: pricelist.description || "",
        min_price: pricelist.min_price || null,
        max_price: pricelist.max_price || null,
        items: pricelist.items || [],
    });

    function addItem() {
        setData("items", [...data.items, { name: "", min_price: 0, max_price: 0 }]);
    }

    function updateItem(index, field, value) {
        const newItems = [...data.items];
        newItems[index][field] = value;
        setData("items", newItems);
    }

    function removeItem(index) {
        const newItems = data.items.filter((_, i) => i !== index);
        setData("items", newItems);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("dashboard.pricelist.update", pricelist.id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Data berhasil diperbarui.",
                    confirmButtonText: "Ok",
                    customClass: {
                        popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                        title: "text-sm font-bold font-inter text-blue-700",
                        htmlContainer: "text-foreground text-xs font-inter text-foreground",
                        confirmButton:
                            "bg-blue-700 text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700",
                    },
                });
            },
            onError: (errors) => {
                const firstError =
                    errors.name ||
                    errors.description ||
                    errors.min_price ||
                    errors.max_price ||
                    errors.items?.[0]?.name ||
                    "Periksa kembali data yang Anda masukkan";
                Swal.fire({
                    title: "Gagal!",
                    text: firstError,
                    confirmButtonText: "Ok",
                    customClass: {
                        popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                        title: "text-sm font-bold font-inter text-red-700",
                        htmlContainer: "text-foreground text-xs font-inter text-foreground",
                        confirmButton:
                            "bg-red-600 text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-600",
                    },
                });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Pricelist" />

            <div className="w-full h-auto md:px-2 pt-5 pb-36 bg-white md:bg-transparent shadow rounded-3xl px-5 md:shadow-none md:rounded-none">
                <div className="mb-5">
                    <BackButton href={route("dashboard.pricelists")} />
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">Edit Pricelist</h1>
                    <p className="text-xs font-normal text-black">
                        Perbarui informasi pada formulir berikut
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Input Judul */}
                    <div className="grid md:grid-cols-3 md:gap-10 items-center">
                        <label htmlFor="name" className="text-xs font-medium text-black mb-2 block">
                            Judul
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white md:col-span-2"
                            required
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>

                    {/* Input Deskripsi */}
                    <div className="grid md:grid-cols-3 md:gap-10 items-center">
                        <label
                            htmlFor="description"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Deskripsi
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white md:col-span-2"
                            required
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                        />
                    </div>

                    {/* Input Harga */}
                    <div className="grid md:grid-cols-3 md:gap-10 items-center">
                        <label htmlFor="min_price" className="text-xs font-medium text-black mb-2 block">
                            Harga (Mulai dari)
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white md:col-span-2"
                            id="min_price"
                            name="min_price"
                            placeholder="tidak wajib diisi"
                            value={
                                data.min_price
                                    ? new Intl.NumberFormat("id-ID").format(data.min_price)
                                    : ""
                            }
                            onChange={(e) => {
                                const numeric = e.target.value.replace(/\D/g, "");
                                setData("min_price", numeric ? parseInt(numeric, 10) : null);
                            }}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 md:gap-10 items-center">
                        <label htmlFor="max_price" className="text-xs font-medium text-black mb-2 block">
                            Sampai (Harga)
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white md:col-span-2"
                            id="max_price"
                            name="max_price"
                            placeholder="tidak wajib diisi"
                            value={
                                data.max_price
                                    ? new Intl.NumberFormat("id-ID").format(data.max_price)
                                    : ""
                            }
                            onChange={(e) => {
                                const numeric = e.target.value.replace(/\D/g, "");
                                setData("max_price", numeric ? parseInt(numeric, 10) : null);
                            }}
                        />
                    </div>

                    {/* Items */}
                    <div className="grid md:grid-cols-3 items-start">
                        <h3 className="text-sm font-bold md:mb-0 mb-5">
                            Item Pricelist <span className="text-red-500">*</span>
                        </h3>

                        <div className="md:col-span-2 bg-neutral-100 p-5 space-y-5">
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-wrap items-center gap-2"
                                >
                                    <div className="md:flex-1 w-full md:w-auto">
                                        <label
                                            htmlFor={`itemName${index}`}
                                            className="text-xs font-medium text-black mb-2 block"
                                        >
                                            Deskripsi
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                                            id={`itemName${index}`}
                                            value={item.name}
                                            onChange={(e) =>
                                                updateItem(index, "name", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="md:flex-1 w-full md:w-auto">
                                        <label
                                            htmlFor={`itemMin${index}`}
                                            className="text-xs font-medium text-black mb-2 block"
                                        >
                                            Harga (Mulai dari)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                                            id={`itemMin${index}`}
                                            value={
                                                item.min_price
                                                    ? new Intl.NumberFormat("id-ID").format(
                                                          item.min_price
                                                      )
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const numeric = e.target.value.replace(/\D/g, "");
                                                updateItem(
                                                    index,
                                                    "min_price",
                                                    numeric ? parseInt(numeric, 10) : null
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="md:flex-1 w-full md:w-auto">
                                        <label
                                            htmlFor={`itemMax${index}`}
                                            className="text-xs font-medium text-black mb-2 block"
                                        >
                                            Sampai (Harga)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                                            id={`itemMax${index}`}
                                            value={
                                                item.max_price
                                                    ? new Intl.NumberFormat("id-ID").format(
                                                          item.max_price
                                                      )
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const numeric = e.target.value.replace(/\D/g, "");
                                                updateItem(
                                                    index,
                                                    "max_price",
                                                    numeric ? parseInt(numeric, 10) : null
                                                );
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="text-black flex-1 justify-end flex md:flex-initial"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addItem}
                                className="px-3 py-2 block w-full font-bold rounded-md text-blue-700 bg-white border border-blue-700 text-xs hover:bg-blue-700 hover:text-white transition"
                            >
                                + Tambah Item
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            disabled={processing}
                            className="px-5 font-[Montreal-Medium] tracking-wide py-2.5 rounded bg-blue-700 border border-blue-700 hover:text-blue-700 hover:bg-white text-white text-xs w-full transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
