import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { Head, useForm } from "@inertiajs/react";
import clsx from "clsx";
import { Image } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

const Add = ({ auth }) => {
    const [preview, setPreview] = useState(null);
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        image: null,
        is_conditional_serve: "0",
    });

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setData("image", file);

        // Hapus URL lama jika ada
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        // Set preview baru
        setPreview(URL.createObjectURL(file));
    }
};

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("dashboard.artist.store"), {
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
            onError: () => {
                Swal.fire({
                    title: "Gagal!",
                    text: "Periksa kembali data yang Anda masukkan",
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambahkan Hair Artist" />

            <div className="w-full h-auto md:px-2 pt-5 pb-36 bg-white md:bg-transparent shadow rounded-3xl px-5 md:shadow-none md:rounded-none">
                <div className="mb-5">
                    <BackButton href={route("dashboard.artists")} />

                    <h1 className="text-sm text-black font-[Montreal-Medium] tracking-wide">Tambah Hair Artist</h1>
                    <p className="text-xs font-normal text-black">
                        Masukkan informasi pada formulir berikut
                    </p>
                </div>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    className="space-y-2"
                >
                    <div className="mb-3">
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-md border"
                            />
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition border border-dashed border-gray-700 rounded p-5 py-10"
                        >
                            <Image className="mb-2" />
                            <span className="text-xs font-medium text-black">Klik disini untuk upload gambar</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white hidden"
                            id="image"
                            name="image"
                            required
                            onChange={handleImageChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Nama
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            required
                            id="name"
                            name="name"
                            autoComplete="off"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="is_conditional_serve"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Pilihan Harga
                        </label>
                        <select
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            id="is_conditional_serve"
                            name="is_conditional_serve"
                            value={data.is_conditional_serve}
                            onChange={(e) =>
                                setData("is_conditional_serve", e.target.value)
                            }
                        >
                            <option value="1">
                                Aktifkan Harga Weekday & Weekend
                            </option>
                            <option value="0">Jangan Aktifkan</option>
                        </select>
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
