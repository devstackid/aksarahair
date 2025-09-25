import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { TrashIcon } from "@heroicons/react/16/solid";
import { Head, router, useForm } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

const Add = ({ auth, artist, layanans }) => {
    const { data, setData, post, processing, reset } = useForm({
        employee_id: artist.id || "",
        service_item_id: "",
        weekday_price: "0",
        weekend_price: "0",
        normal_price: "0",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("dashboard.services.store"), {
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
                    errors.service_item_id ||
                    errors.normal_price ||
                    errors.weekday_price ||
                    errors.weekend_price ||
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

    const handleSingleDelete = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus data ini?",
            text: "Tindakan ini tidak dapat dibatalkan!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                title: "text-sm font-bold font-inter text-foreground",
                htmlContainer:
                    "text-foreground text-xs font-inter text-foreground",
                confirmButton:
                    "bg-black text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black",
                cancelButton:
                    "bg-gray-100 text-xs font-inter text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("dashboard.services.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Data berhasil dihapus.",
                            "success"
                        );
                    },
                });
            }
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
            <Head title="Tambahkan Layanan Hair Artist" />

            <div className="w-full h-auto md:px-2 pt-5 pb-36">
                <div className="mb-5">
                    <BackButton href={route("dashboard.artists")} />

                    <h1 className="text-sm text-black font-[Montreal-Medium] tracking-wide">
                       Tambah Layanan Hair Artist</h1>
                </div>
                <div className="flex flex-wrap md:flex-nowrap w-full gap-10 mt-10">
                    <div className="w-full bg-white p-5 md:p-0 md:bg-transparent rounded-3xl md:shadow-none md:rounded-none shadow md:w-[30%]">
                        <div className="w-20 h-20 rounded-full mb-5 flex items-center justify-center overflow-hidden">
                            <img
                                src={`/storage/${artist.image}`}
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        </div>
                        <div className="pb-2 border-b border-gray-100 mb-2">
                            <h1 className="text-sm"><strong>{artist.name}</strong></h1>
                            {artist.is_conditional_serve == 1 && (
                                <span className="block text-xs w-max text-blue-600">
                                    Weekday & Weekend
                                </span>
                            )}
                        </div>

                        <div>
                            {artist.services.map((service, i) => (
                                <div
                                    key={i}
                                    className="text-xs pb-2 border-b border-gray-100 mb-2"
                                >
                                    <h1 className="text-xs  mb-1">
                                        <strong>{service.service_item.service_name}</strong>
                                    </h1>
                                    {artist.is_conditional_serve == 1 ? (
                                        <>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="">
                                                    {" "}
                                                    Weekday
                                                </span>
                                                <strong><span className="">
                                                    {" "}
                                                    {formatRupiah(
                                                        service.weekday_price
                                                    )}
                                                </span></strong>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="">
                                                    {" "}
                                                    Weekend
                                                </span>
                                                <strong>
                                                    <span className="">
                                                    {" "}
                                                    {formatRupiah(
                                                        service.weekend_price
                                                    )}
                                                </span>
                                                </strong>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <span className=""> Price</span>
                                            <strong>
                                                <span className="">
                                                {" "}
                                                {formatRupiah(
                                                    service.normal_price
                                                )}
                                            </span>
                                            </strong>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSingleDelete(service.id)
                                        }
                                        className="group flex w-full justify-center mt-1 items-center bg-gray-100 gap-2 px-3 rounded-lg py-1.5 transition hover:bg-black hover:text-white"
                                    >
                                        <TrashIcon className="size-4" />
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2 w-full p-5 md:p-0 md:bg-transparent bg-white rounded-3xl shadow md:rounded-none md:shadow-none">
                        <div>
                            <label
                                htmlFor="service_item_id"
                                className="text-xs font-medium text-black mb-2 block"
                            >
                                Tambahkan Layanan
                            </label>
                            <select
                                className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                                id="service_item_id"
                                name="service_item_id"
                                value={data.service_item_id}
                                onChange={(e) =>
                                    setData("service_item_id", e.target.value)
                                }
                            >
                                <option>Pilih Layanan</option>
                                {layanans.map((layanan, i) => (
                                    <option key={i} value={layanan.id}>
                                        {layanan.service_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {artist.is_conditional_serve == 1 ? (
                            <>
                                <div>
                                    <label
                                        htmlFor="weekday_price"
                                        className="text-xs font-medium text-black mb-2 block"
                                    >
                                        Atur Harga Weekday
                                    </label>

                                    <CurrencyInput
                                        className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white font-inter"
                                        id="weekday_price"
                                        name="weekday_price"
                                        placeholder="Please enter a number"
                                        value={data.weekday_price}
                                        decimalsLimit={2}
                                        onValueChange={(value, name) => {
                                            setData(name, value);
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="weekend_price"
                                        className="text-xs font-medium text-black mb-2 block"
                                    >
                                        Atur Harga Weekend
                                    </label>

                                    <CurrencyInput
                                        className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white font-inter"
                                        id="weekend_price"
                                        name="weekend_price"
                                        placeholder="Please enter a number"
                                        value={data.weekend_price}
                                        decimalsLimit={2}
                                        onValueChange={(value, name) => {
                                            setData(name, value);
                                        }}
                                        required
                                    />
                                </div>
                            </>
                        ) : (
                            <div>
                                <label
                                    htmlFor="normal_price"
                                    className="text-xs font-medium text-black mb-2 block"
                                >
                                    Atur Harga
                                </label>

                                <CurrencyInput
                                    className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white font-inter"
                                    id="normal_price"
                                    name="normal_price"
                                    placeholder="Please enter a number"
                                    value={data.normal_price}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => {
                                        setData(name, value);
                                    }}
                                    required
                                />
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                disabled={processing}
                                className="px-5 py-2.5 rounded bg-blue-700 border border-blue-700 hover:text-blue-700 hover:bg-white text-white text-xs w-full transition"
                            >
                                <strong>Submit</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;
