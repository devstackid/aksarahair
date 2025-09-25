import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePage } from "@inertiajs/react";
import clsx from "clsx";

export default function GuestLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

        const { url } = usePage();
    

    return (
        <>
            <div className={clsx("bg-white md:font-inter h-screen overflow-y-auto z-[60]", url == '/reservation' && '!bg-neutral-100')}>
                {children}
            </div>

            {/* Floating button */}
            <div className="fixed z-[999] bottom-20 md:bottom-10 md:right-10 right-5">
                <button
                    onClick={openModal}
                    type="button"
                    className="flex flex-col items-center justify-center group bg-white shadow-xl rounded-full w-16 h-16"
                >
                    <img src="/assets/ask.png" width={20} alt="" />
                    <span className="text-xs font-[Montreal-Medium] text-black/80 group-hover:text-blue-700">
                        Panduan
                    </span>
                </button>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[900]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={closeModal}
                        >
                            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>

                                <h2 className="text-xl font-[Montreal-medium] mb-4 text-gray-800">
                                    Ketentuan Reservasi
                                </h2>
                                <ol className="list-decimal list-inside space-y-2 text-black font-[Montreal-Book] tracking-wide text-sm leading-relaxed">
                                    <li>
                                        Booking / Reservasi layanan dapat
                                        dilakukan minimal <strong>5 jam</strong>{" "}
                                        dari waktu saat ini.
                                    </li>
                                    <li>
                                        Waktu dimulai dari pukul{" "}
                                        <strong>10:00</strong> sampai{" "}
                                        <strong>21:00</strong>.
                                    </li>
                                    <li>
                                        Pilih hair artist / designer, pilih
                                        layanan, atur tanggal & waktu reservasi,
                                        isi form reservasi, lalu tekan tombol
                                        konfirmasi. Anda akan diarahkan menuju
                                        WhatsApp.
                                    </li>
                                    <li>
                                        Tunggu chat konfirmasi dari admin. Jika
                                        tidak menerima konfirmasi maka
                                        booking/reservasi belum terdaftar.
                                    </li>
                                    <li>
                                        Admin akan mengkonfirmasi status
                                        reservasi anda.
                                    </li>
                                    <li>
                                        Wajib datang <strong>5-10 menit</strong>{" "}
                                        sebelum waktu yang telah ditentukan.
                                        Apabila terlambat 5 menit dari jam
                                        booking, otomatis mengikuti antrian
                                        berikutnya.
                                    </li>
                                </ol>

                                <button
                                    className="block w-full text-center text-sm font-[Montreal-Medium] mt-5 text-white bg-black rounded-3xl py-2.5 tracking-wide"
                                    onClick={closeModal}
                                >
                                    Mengerti
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
