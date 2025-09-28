import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import {
    User2,
    UsersRound,
    Clock9,
    CalendarCheck2,
    ListTodo,
} from "lucide-react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsBoxArrowInUpRight } from "react-icons/bs";

export default function DashboardIndex({
    auth,
    customers,
    artists,
    reservations,
    pendingReservation,
    confirmedReservation,
    cancelledReservation,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);

    const openModal = (artist) => {
        setSelectedArtist(artist); // simpan data artist yang diklik
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedArtist(null), 200);
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
            <Head title="Dashboard - Development" />

            <div className="flex flex-col items-center justify-center h-full gap-5">
                <img src="/assets/500.svg" width={200} alt="" />
                <h1 className="text-basetext-black text-center">Saat ini fitur sedang dalam tahap pengembangan</h1>
            </div>
        </AuthenticatedLayout>
    );
}
