import { useEffect, useState } from "react";
import axios from "axios";
import { IoStar } from "react-icons/io5";
import { formatTimeAgo } from "@/utils/time";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { DotIcon } from "lucide-react";

const Testimonial = ({ auth }) => {
    const [reviews, setReviews] = useState([]);
    const [sort, setSort] = useState("recent");
    const [summary, setSummary] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchReviews = async (sortOption = "recent") => {
        try {
            const { data } = await axios.get("/api/reviews/fetch", {
                params: { sort: sortOption },
            });
            setReviews(data);
            calculateSummary(data);
        } catch (error) {
            console.error(error);
        }
    };

    const calculateSummary = (reviews) => {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        reviews.forEach((r) => {
            const stars = Number(r.stars);
            if (stars >= 1 && stars <= 5) {
                counts[stars] += 1;
            }
        });

        setSummary(counts);
    };

    useEffect(() => {
        fetchReviews(sort);
    }, [sort]);

    const totalReviews = Object.values(summary).reduce((a, b) => a + b, 0);
    const totalStars = Object.entries(summary).reduce(
        (acc, [star, count]) => acc + Number(star) * count,
        0
    );
    const averageRating =
        totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : "0.0";

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
            onSuccess: () => {
                reset("text");
                setIsModalOpen(false);
                fetchReviews(sort);
            },
        });
    };

    const openModalReview = () => setIsModalOpen(true);
    const closeModalReview = () => setIsModalOpen(false);

    return (
        <section
            id="review"
            className="w-full min-h-screen pt-20 lg:px-20 px-4"
        >
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
                <h1 className="lg:text-5xl text-3xl font-[Montreal-Book] text-black">
                    Reviews
                </h1>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-gray-300 rounded-lg px-5 py-2 text-sm font-[Montreal-Book] tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="recent">Baru Ditambahkan</option>
                    <option value="highest">Rating Tertinggi</option>
                    <option value="lowest">Rating Terendah</option>
                </select>
            </div>

            {/* Ringkasan */}
            <div className="grid md:grid-cols-2 md:items-center gap-10">
                {/* Grafik bintang */}
                <div className="flex flex-col gap-2 md:order-1 order-2">
                    {Object.keys(summary)
                        .map(Number)
                        .sort((a, b) => b - a)
                        .map((star) => {
                            const count = summary[star] || 0;
                            const percent =
                                totalReviews > 0
                                    ? (count / totalReviews) * 100
                                    : 0;

                            return (
                                <div
                                    key={star}
                                    className="flex items-center gap-2"
                                >
                                    {/* Bintang */}
                                    <div className="flex items-center w-20 text-yellow-500">
                                        {Array.from({ length: star }).map(
                                            (_, i) => (
                                                <IoStar
                                                    key={i}
                                                    className="text-sm"
                                                />
                                            )
                                        )}
                                        {Array.from({ length: 5 - star }).map(
                                            (_, i) => (
                                                <IoStar
                                                    key={`empty-${i}`}
                                                    className="text-sm text-gray-400"
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* Progress bar */}
                                    <div className="flex-1 h-2 bg-neutral-400 rounded">
                                        <div
                                            className="h-2 bg-neutral-700 rounded"
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>

                                    {/* Jumlah review */}
                                    <span className="w-8 text-center text-sm text-black font-[Montreal-Book]">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                </div>

                {/* Total rating */}
                <div className="border border-neutral-300 bg-white md:order-2 order-1 flex md:flex-row flex-col gap-5 md:gap-5 items-center justify-center rounded-3xl p-6 md:px-10">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-[Montreal-Medium] tracking-wide text-black">
                            {averageRating}
                            <span className="text-3xl">/5</span>
                        </h1>
                        <div className="flex items-center gap-1 my-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <IoStar
                                    key={i}
                                    className={`text-xl ${
                                        i < Math.round(averageRating)
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 font-[Montreal-Book] tracking-wide">
                            {totalReviews} review
                            {totalReviews !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {auth.user ? (
                        <button
                            onClick={openModalReview}
                            className="bg-black text-xs hover:bg-white border border-black hover:text-black transition text-white font-[Montreal-Medium] tracking-wide px-4 py-2 rounded-3xl"
                        >
                            Tulis Review
                        </button>
                    ) : (
                        <a
                            href="/auth/redirect/google"
                            className="bg-black text-xs hover:bg-white border border-black hover:text-black w-max transition text-white font-[Montreal-Medium] tracking-wide px-4 py-2 flex items-center justify-center gap-2 rounded-3xl"
                        >
                            <FaGoogle /> Login untuk menulis review
                        </a>
                    )}
                </div>
            </div>

            {/* List Review */}
            {reviews.length > 0 && (

            <div className="flex flex-col gap-6 mt-10 border p-6 rounded-3xl bg-white max-h-[70vh] overflow-y-auto">
                {reviews.map((review) => (
                    <div key={review.id} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-neutral-50 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                            <img src={review.user.google_image_url} className="w-full h-full object-cover" alt={review.user?.name} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-[Montreal-Medium] tracking-wide text-black capitalize">
                                    {review.user?.name}
                                </span>
                            </div>

                            <div className="flex text-xs items-center text-black mb-2">
                                <div className="flex items-center w-[70px]">
                                    {Array.from({ length: review.stars }).map(
                                        (_, i) => (
                                            <IoStar key={i} />
                                        )
                                    )}
                                </div>

                                <span>
                                    <DotIcon />
                                </span>

                                <span className="text-xs text-gray-500 font-[Montreal-Book] tracking-wide">
                                    {formatTimeAgo(review.created_at)}
                                </span>
                            </div>

                            <p className="text-gray-800 font-[Montreal-Book] tracking-wide text-xs md:text-sm">
                                {review.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            )}


            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={closeModalReview}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold mb-4">
                                Tulis Review
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >
                                {/* beri bintang minimal 1 maksimal 5 */}
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() =>
                                                setData("stars", star)
                                            }
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            className="text-3xl focus:outline-none transition"
                                        >
                                            <span
                                                className={`transition ${
                                                    star <=
                                                    (hover || data.stars)
                                                        ? "text-yellow-500"
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
                                    onChange={(e) =>
                                        setData("text", e.target.value)
                                    }
                                    placeholder="Tulis review Anda di sini..."
                                    className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    rows="5"
                                    required
                                />

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={closeModalReview}
                                        className="px-6 py-2 border rounded-lg text-sm"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={
                                            processing || !data.text.trim()
                                        }
                                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {processing
                                            ? "Mengirim..."
                                            : "Kirim Review"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Testimonial;
