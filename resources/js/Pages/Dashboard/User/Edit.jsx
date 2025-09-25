import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Layouts/Components/BackButton";
import { Head, useForm } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import Swal from "sweetalert2";

const Edit = ({ auth, userAccount }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const { data, setData, patch, processing } = useForm({
        name: userAccount.name || "",
        username: userAccount.username || "",
        password: "",
        role: userAccount.role || "staff",
    });

    useEffect(() => {
        const { password } = data;
        if (password.length > 0 && password.length < 8) {
            setPasswordError("Minimal 8 karakter");
        } else if (/\s/.test(password)) {
            setPasswordError("Tidak boleh mengandung spasi");
        } else {
            setPasswordError("");
        }
    }, [data.password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("dashboard.users.update", userAccount.id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "User berhasil diperbarui.",
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
                    text: "Periksa kembali data yang Anda masukkan.",
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
            <Head title="Edit User" />

            <div className="w-full h-auto px-2 pt-5 pb-36">
                <div className="mb-5">
                    <BackButton href={route("dashboard.users")} />

                    <h1 className="text-sm text-black font-[Montreal-Medium] tracking-wide">Edit User</h1>
                    <p className="text-xs font-normal text-black">
                        Perbarui informasi user pada formulir berikut
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
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
                            htmlFor="username"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            required
                            id="username"
                            name="username"
                            autoComplete="off"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Password (biarkan kosong jika tidak diubah)
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={clsx(
                                    "w-full border rounded-md py-2.5 px-2 pr-10 text-xs font-normal text-black bg-white",
                                    passwordError
                                        ? "border-red-500"
                                        : "border-gray-300"
                                )}
                                id="password"
                                name="password"
                                autoComplete="off"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <PiEyeClosed size={18} />
                                ) : (
                                    <PiEye size={18} />
                                )}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-xs text-red-500 mt-1 animate-fade-in">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="text-xs font-medium text-black mb-2 block"
                        >
                            Role
                        </label>
                        <select
                            className="w-full border rounded-md py-2.5 px-2 text-xs font-normal text-black bg-white"
                            required
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>

                    <div className="pt-3">
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
