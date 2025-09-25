import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
const Add = ({ auth }) => {
    const { data, setData, post, processing, reset } = useForm({
        service_name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dashboard.services.items.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Layanan berhasil ditambahkan.",
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
            <Head title="Create new service" />

            <div className="w-full h-auto md:px-2 pt-5 pb-36 bg-white md:bg-transparent shadow rounded-3xl px-5 md:shadow-none md:rounded-none">
                <div className="mb-5">
                    <BackButton href={route("dashboard.services.items")} />

                    <h1 className="text-sm font-[Montreal-Medium] tracking-wide text-black">
                        Tambah Layanan / Service
                    </h1>
                    <p className="text-xs font-normal text-black">
                        Masukkan informasi pada formulir berikut
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                        <label
                            htmlFor="service_name"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Nama Layanan
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            required
                            id="service_name"
                            name="service_name"
                            autoComplete="off"
                            value={data.service_name}
                            onChange={(e) =>
                                setData("service_name", e.target.value)
                            }
                        />
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
