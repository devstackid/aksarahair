import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Trash } from "lucide-react";

const Add = ({ auth }) => {
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        description: "",
        min_price: null,
        max_price: null,
        items: [],
    });

    function addItem() {
        setData("items", [
            ...data.items,
            { name: "", min_price: 0, max_price: 0 },
        ]);
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

        post(route("dashboard.pricelist.store"), {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Data berhasil ditambahkan.",
                    confirmButtonText: "Ok",
                    customClass: {
                        popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                        title: "text-sm font-bold font-inter text-blue-700",
                        htmlContainer:
                            "text-foreground text-xs font-inter text-foreground",
                        confirmButton:
                            "bg-blue-700 text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700",
                    },
                });
                reset();
            },
            onError: (errors) => {
                const firstError =
                    errors.name ||
                    errors.description ||
                    errors.min_price ||
                    errors.max_price ||
                    errors.is_custom_price ||
                    "Periksa kembali data yang Anda masukkan";
                Swal.fire({
                    title: "Gagal!",
                    text: firstError,
                    confirmButtonText: "Ok",
                    customClass: {
                        popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                        title: "text-sm font-bold font-inter text-red-700",
                        htmlContainer:
                            "text-foreground text-xs font-inter text-foreground",
                        confirmButton:
                            "bg-red-600 text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-600",
                    },
                });
            },
        });
    };

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Pricelist" />

            <div className="w-full h-auto md:px-2 pt-5 pb-36 bg-white md:bg-transparent shadow rounded-3xl px-5 md:shadow-none md:rounded-none">
                <div className="mb-5">
                    <BackButton href={route("dashboard.pricelists")} />

                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Buat Pricelist
                    </h1>
                    <p className="text-xs font-normal text-black">
                        Masukkan informasi pada formulir berikut
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-3 md:gap-10 items-center">
                        <label
                            htmlFor="name"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Judul
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white md:col-span-2"
                            required
                            id="name"
                            name="name"
                            autoComplete="off"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
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
                            placeholder=""
                            autoComplete="off"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-10 items-center">
                        <label
                            htmlFor="min_price"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Harga (Mulai dari)
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white md:col-span-2"
                            id="min_price"
                            name="min_price"
                            placeholder="tidak wajib diisi"
                            autoComplete="off"
                            value={
                                data.min_price
                                    ? new Intl.NumberFormat("id-ID").format(
                                          data.min_price
                                      )
                                    : ""
                            }
                            onChange={(e) => {
                                // Ambil hanya angka
                                const numeric = e.target.value.replace(
                                    /\D/g,
                                    ""
                                );
                                // Simpan sebagai integer (tanpa format)
                                setData(
                                    "min_price",
                                    numeric ? parseInt(numeric, 10) : 0
                                );
                            }}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 md:gap-10 items-center">
                        <label
                            htmlFor="max_price"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Sampai (Harga)
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white md:col-span-2"
                            id="max_price"
                            name="max_price"
                            placeholder="tidak wajib diisi"
                            autoComplete="off"
                            value={
                                data.max_price
                                    ? new Intl.NumberFormat("id-ID").format(
                                          data.max_price
                                      )
                                    : ""
                            }
                            onChange={(e) => {
                                // Ambil hanya angka
                                const numeric = e.target.value.replace(
                                    /\D/g,
                                    ""
                                );
                                // Simpan sebagai integer (tanpa format)
                                setData(
                                    "max_price",
                                    numeric ? parseInt(numeric, 10) : 0
                                );
                            }}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 items-start">
                        <h3 className="text-sm font-bold md:mb-0 mb-5">
                            Tambahkan item untuk pricelist ini{" "}
                            <span className="text-red-500">*</span>
                        </h3>

                        <div className=" md:col-span-2 bg-neutral-100 p-5 space-y-5">
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-wrap items-center gap-2"
                                >
                                    <div className="md:flex-1 w-full md:w-auto">
                                        <label
                                            htmlFor={`name${index}`}
                                            className="text-xs font-medium text-black mb-2 block"
                                        >
                                            Deskripsi
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                                            id={`name${index}`}
                                            name={`name${index}`}
                                            placeholder=""
                                            required
                                            autoComplete="off"
                                            value={item.name}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="md:flex-1 w-full md:w-auto">
                                        <label
                                            htmlFor={`min_price${index}`}
                                            className="text-xs font-medium text-black mb-2 block"
                                        >
                                            Harga (Mulai dari)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                                            id={`min_price${index}`}
                                            name={`min_price${index}`}
                                            placeholder="tidak wajib diisi"
                                            autoComplete="off"
                                            value={
                                                item.min_price
                                                    ? new Intl.NumberFormat(
                                                          "id-ID"
                                                      ).format(item.min_price)
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const numeric =
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    );
                                                updateItem(
                                                    index,
                                                    "min_price",
                                                    numeric
                                                        ? parseInt(numeric, 10)
                                                        : null
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="md:flex-1 w-full md:w-auto">
                                        <label
                                            htmlFor={`max_price${index}`}
                                            className="text-xs font-medium text-black mb-2 block"
                                        >
                                            Sampai (Harga)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                                            id={`max_price${index}`}
                                            name={`max_price${index}`}
                                            placeholder="tidak wajib diisi"
                                            autoComplete="off"
                                            value={
                                                item.max_price
                                                    ? new Intl.NumberFormat(
                                                          "id-ID"
                                                      ).format(item.max_price)
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const numeric =
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    );
                                                updateItem(
                                                    index,
                                                    "max_price",
                                                    numeric
                                                        ? parseInt(numeric, 10)
                                                        : null
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
                                className="px-3 py-2 block w-full rounded-md text-blue-700 bg-white border border-blue-700 text-xs hover:bg-blue-700 hover:text-white transition"
                            >
                                + Tambah Item
                            </button>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={processing}
                            className="px-5 py-2.5 font-[Montreal-Medium] tracking-wide rounded bg-blue-700 border border-blue-700 hover:text-blue-700 hover:bg-white text-white text-xs w-full transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;
