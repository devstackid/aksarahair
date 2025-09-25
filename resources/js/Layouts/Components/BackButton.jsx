import { Link } from "@inertiajs/react";
import React from "react";

const BackButton = ({ href }) => {
    return (
        <Link href={href} className="bg-black font-[Montreal-Medium] tracking-wide inline-block px-3 py-1.5 mb-2 text-xs rounded-xl text-white border border-transparent hover:bg-white hover:text-black hover:border-black transition">
            Kembali
        </Link>
    );
};

export default BackButton;
