import { Head, useForm } from "@inertiajs/react";
import { BiChevronRight } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="flex items-center justify-center w-full min-h-screen bg-white font-inter px-10">
                <form onSubmit={submit}>
                    <h1 className="text-xl font-[Montreal-Medium] tracking-wide text-black text-center mb-5">Login</h1>
                    <div className="">
                        <label
                            htmlFor="username"
                            value="Username"
                            className="md:text-xs text-sm font-normal text-black"
                        >
                            Nama Pengguna / Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={data.username}
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            required
                            className="w-full mt-2 p-2 rounded-3xl border border-base-200 bg-white text-sm font-normal text-black "
                        />
                        {errors.username && (
                                <p className="text-red-500 mt-2 md:text-xs text-sm font-normal">
                                    {errors.username}
                                </p>
                            )}
                            {errors.password && (
                                <p className="text-red-500 mt-4 md:text-xs text-sm font-normal">
                                    {errors.password}
                                </p>
                            )}
                    </div>
                    <div className="mt-3">
                        <label
                            htmlFor="password"
                            value="Password"
                            className="md:text-xs text-sm font-normal text-black"
                        >
                            Kata Sandi
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                            className="w-full mt-2 p-2 rounded-3xl border border-base-200 bg-white text-sm font-normal text-black "
                        />
                    </div>

                    
                            

                            <div className="flex flex-col items-start mt-5">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-black border border-black text-white px-5 py-3 md:text-xs text-sm font-[Montreal-Medium] tracking-wide rounded-3xl flex items-center gap-2 w-full justify-center mb-3 hover:text-black hover:bg-white transition"
                                >
                                    {processing ? "loading.." : "Login"}{" "}
                                    <BiChevronRight />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <hr className="w-full" />
                                <div className="text-xs font-normal text-black">Atau</div>
                                <hr className="w-full" />
                            </div>

                            <a
                                href="/auth/redirect/google"
                                className="px-5 py-3 hover:bg-gray-100 transition rounded-3xl text-center w-full flex items-center justify-center md:text-xs text-sm gap-3 border mt-3 border-gray-300 text-black"
                            >
                                <FaGoogle className="text-amber-500" /> Lanjutkan dengan Google
                            </a>


                </form>
            </div>

        </>
    );
}
