// Edit.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Tabs from "@/Layouts/Components/Tabs";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import clsx from "clsx";
import Swal from "sweetalert2";

const Edit = ({ auth, config }) => {
    const { url } = usePage();

    const { data, setData, patch, processing } = useForm({
        open_time: config.open_time || "",
        closing_time: config.closing_time || "",
        whatsapp: config.whatsapp || "",
        alamat: config.alamat || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("dashboard.setting.update", config.id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Data berhasil diperbarui.",
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
            onError: (errors) => {
                const firstError =
                    errors.open_time ||
                    errors.closing_time ||
                    errors.whatsapp ||
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pengaturan" />

            <div className="w-full h-auto md:px-2 pt-5 pb-36 bg-white md:bg-transparent shadow rounded-3xl px-5 md:shadow-none md:rounded-none">
                <div className="mb-5">
                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">Pengaturan</h1>
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


                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="open_time"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Jam Buka
                        </label>
                        <input
                            type="time"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                            required
                            id="open_time"
                            name="open_time"
                            autoComplete="off"
                            value={data.open_time}
                            onChange={(e) =>
                                setData("open_time", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="closing_time"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Jam Tutup
                        </label>
                        <input
                            type="time"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                            required
                            id="closing_time"
                            name="closing_time"
                            autoComplete="off"
                            value={data.closing_time}
                            onChange={(e) =>
                                setData("closing_time", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="whatsapp"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Nomor WhatsAap
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                            required
                            id="whatsapp"
                            name="whatsapp"
                            placeholder="628xxxxxxx"
                            autoComplete="off"
                            value={data.whatsapp}
                            onChange={(e) =>
                                setData("whatsapp", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="alamat"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Alamat
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white bg-white"
                            required
                            id="alamat"
                            name="alamat"
                            placeholder=""
                            autoComplete="off"
                            value={data.alamat}
                            onChange={(e) =>
                                setData("alamat", e.target.value)
                            }
                        />
                    </div>

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
