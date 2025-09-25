import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Image } from "lucide-react";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ auth, artist }) => {
    const fileInputRef = useRef(null);
    const [values, setValues] = useState({
        name: artist.name || "",
        image: null,
        is_conditional_serve: artist.is_conditional_serve === 0 ? 0 : 1,
    });

    function handleChange(e) {
        const { id, files, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [id]: files ? files[0] : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                formData.append(key, values[key]);
            }
        });

        router.post(route("dashboard.artist.update", artist.id), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onSuccess: () => {
                setValues({
                    ...values,
                    image: null,
                });
                fileInputRef.current.value = null;
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
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ubah Data" />

            <div className="w-full h-auto px-2 pt-5 pb-36 relative">
                <div className="mb-5">
                    <BackButton href={route("dashboard.artists")} />
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black"><strong>Ubah Data</strong></h1>
                    <p className="text-xs font-normal text-black">
                        Perbarui informasi pada formulir berikut
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                       <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition border border-dashed border-gray-700 rounded p-5 py-10"
                        >
                            <Image className="mb-2" />
                            <span className="text-xs font-medium text-black">Klik disini untuk mengubah gambar</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white hidden"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            ref={fileInputRef}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="service_name"
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
                            value={values.name}
                            onChange={(e) =>
                                setValues("name", e.target.value)
                            }
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
                            value={values.is_conditional_serve}
                            onChange={handleChange}
                        >
                            <option value="1">Aktifkan Harga Weekday & Weekend</option>
                            <option value="0">Jangan Aktiftan</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button className="px-5 py-2.5 rounded bg-blue-700 border border-blue-700 hover:text-blue-700 hover:bg-white text-white text-xs w-full transition">
                            <strong>Update</strong>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
