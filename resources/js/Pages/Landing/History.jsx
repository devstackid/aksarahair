import { Head, Link } from "@inertiajs/react";
import "react-day-picker/dist/style.css";
import clsx from "clsx";

const History = ({ reservation }) => {
    const formatTanggalID = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(`${dateStr}T00:00:00Z`); // pastikan konsisten & aman di semua browser
        return new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Makassar", // WITA (UTC+8)
        }).format(d);
    };
const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };
    return (
        <>
        <Head title="Riwayat Reservasi" />
            <div className="w-full pt-10 pb-36 min-h-screen overflow-y-auto bg-neutral-50 flex items-center justify-center md:px-20 px-5 text-black">
                <div className="bg-white pt-10 pb-5 px-5 md:px-7 rounded-3xl shadow flex flex-col items-center max-w-md text-center">
                    <div>
                        <img
                            src="/assets/success.svg"
                            className="w-40 h-40"
                            alt="reservasi"
                        />
                    </div>
                    <h1 className="text-base font-[Montreal-Medium] tracking-wide">Reservasi Berhasil</h1>
                    <p className="text-xs font-[Montreal-Book] tracking-wide">
                        Informasi reservasi anda sedang diproses, kami akan
                        mengirim konfirmasi jika reservasi anda disetujui atau
                        dibatalkan
                    </p>

                    <div className="mt-10 w-full space-y-3 relative">
                        <div className="flex items-center justify-between md:justify-start gap-2 w-full">
                            <div className="text-xs md:min-w-32 text-start font-[Montreal-Medium] tracking-wide">
                                Status
                            </div>
                            <div className={clsx("text-xs font-[Montreal-Medium] tracking-wide px-3 py-1 rounded-3xl border", reservation.status == 'cancelled' && 'bg-orange-50 text-orange-700 border-orange-700', reservation.status == 'pending' && 'bg-white text-amber-400 border-amber-300', reservation.status == 'confirmed' && 'bg-green-50 text-green-400 border-green-300')}>
                                {reservation.status == 'pending' && 'Menunggu Konfirmasi'}
                                {reservation.status == 'confirmed' && 'Diterima'}
                                {reservation.status == 'cancelled' && 'Dibatalkan'}
                            </div>
                        </div>
                        <div className="flex md:items-center items-start md:flex-row flex-col gap-2 w-full">
                            <div className="text-xs md:min-w-32 text-start font-[Montreal-Book] tracking-wide">
                                Tanggal & Waktu
                            </div>
                            <div className="text-xs font-[Montreal-Medium] tracking-wide">
                                {formatTanggalID(reservation.date)} /{" "}
                                {reservation.time} WITA
                            </div>
                        </div>
                        <div className="flex md:items-center items-start md:flex-row flex-col gap-2 w-full">
                            <div className="text-xs md:min-w-32 text-start font-[Montreal-Book] tracking-wide">
                                Atas Nama
                            </div>
                            <div className="text-xs font-[Montreal-Medium] tracking-wide">
                                {reservation.customer_name}
                            </div>
                        </div>
                        <div className="flex md:items-center items-start md:flex-row flex-col gap-2 w-full">
                            <div className="text-xs md:min-w-32 text-start font-[Montreal-Book] tracking-wide">
                                Layanan
                            </div>
                            <div className="text-xs font-[Montreal-Medium] tracking-wide">
                                {reservation.service.service_item.service_name}
                            </div>
                        </div>
                        <div className="flex md:items-center items-start md:flex-row flex-col gap-2 w-full">
                            <div className="text-xs md:min-w-32 text-start font-[Montreal-Book] tracking-wide">
                                Hair Artist
                            </div>
                            <div className="text-xs font-[Montreal-Medium] tracking-wide">
                                {reservation.service.employee.name}
                            </div>
                        </div>
                        {reservation.is_conditional_serve == 1 ? (
                            <>
                                <div className="flex md:items-center items-start md:flex-row flex-col gap-2 w-full">
                                    <div className="text-xs md:min-w-32 text-start font-[Montreal-Book] tracking-wide">
                                        Harga Weekday
                                    </div>
                                    <div className="text-xs font-[Montreal-Medium] tracking-wide">
                                        {formatRupiah(reservation.weekday_price)}
                                    </div>
                                </div>
                                <div className="flex md:items-center items-start md:flex-row flex-col gap-2 w-full">
                                    <div className="text-xs md:min-w-32 text-start font-[Montreal-Book] tracking-wide">
                                        Harga Weekend
                                    </div>
                                    <div className="text-xs font-[Montreal-Medium] tracking-wide">
                                        {formatRupiah(reservation.weekend_price)}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex md:items-center items-start md:flex-row flex-col gap-2 w-full">
                                <div className="text-xs md:min-w-32 text-start font-[Montreal-Book] tracking-wide">
                                    Harga
                                </div>
                                <div className="text-xs font-[Montreal-Medium] tracking-wide">
                                    {formatRupiah(reservation.normal_price)}
                                </div>
                            </div>
                        )}

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:-translate-x-0 md:static">
                            <Link href={route('index')} className="text-white block mt-5 text-xs px-5 py-2.5 font-[Montreal-Medium] tracking-wide hover:text-black hover:bg-white transition border border-black rounded-3xl bg-black">Kembali ke Beranda</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default History;
