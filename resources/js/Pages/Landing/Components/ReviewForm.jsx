import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";

const ReviewForm = ({ auth }) => {
    const { data, setData, post, processing, reset } = useForm({
        user_id: auth?.user?.id || "",
        text: "",
        website: "",
        stars: 5,
    });
    const [hover, setHover] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!auth?.user) return;

        post(route("review.store"), {
            onSuccess: () => reset("text"),
        });
    };

    return (
        <div className="w-full lg:px-20 px-5 md:py-20 pb-20 bg-white">
            <div className="text-center">
                <h1 className="text-5xl font-[Montreal-Medium] text-black tracking-wide">
                    Review
                </h1>
                <p className="text-sm md:text-base font-[Montreal-Book] text-black tracking-wide md:max-w-[50%] mx-auto">
                    Sampaikan pengalaman Anda mengenai layanan atau produk kami.
                    Masukan dan penilaian Anda sangat berharga serta dapat
                    membantu pelanggan lain dalam membuat keputusan.
                </p>
            </div>

            {/* Form hanya muncul jika user login */}
            {auth?.user ? (
                <form
                    onSubmit={handleSubmit}
                    className="mt-10 max-w-2xl mx-auto flex flex-col gap-5"
                >
                    <input type="hidden" name="user_id" value={data.user_id} />
                    <input
                        type="text"
                        name="website"
                        value={data.website}
                        onChange={(e) => setData("website", e.target.value)}
                        className="hidden"
                        autoComplete="off"
                        tabIndex="-1"
                    />

                    {/* beri bintang minimal 1 maksimal 5 */}
                    <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        type="button"
                        key={star}
                        onClick={() => setData("stars", star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="text-3xl focus:outline-none transition"
                    >
                        <span
                            className={`transition ${
                                star <= (hover || data.stars)
                                    ? "text-yellow"
                                    : "text-gray-300"
                            }`}
                        >
                            ★
                        </span>
                    </button>
                ))}
            </div>

                    <textarea
                        name="text"
                        value={data.text}
                        onChange={(e) => setData("text", e.target.value)}
                        placeholder="Tulis review Anda di sini..."
                        className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        rows="5"
                        required
                    />

                    <button
                        type="submit"
                        disabled={processing || !data.text.trim()}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {processing ? "Mengirim..." : "Kirim Review"}
                    </button>
                </form>
            ) : (
                <a
                    href="/auth/redirect/google"
                    className="bg-black hover:bg-white border border-black hover:text-black w-max mx-auto transition text-white font-[Montreal-Medium] tracking-wide px-4 py-2 mt-4 flex items-center justify-center gap-2 rounded-3xl"
                >
                    <FaGoogle /> Lanjutkan dengan Google
                </a>
            )}
        </div>
    );
};

export default ReviewForm;
