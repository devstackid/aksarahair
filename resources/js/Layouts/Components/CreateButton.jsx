import { Link } from "@inertiajs/react";
import React from "react";

const CreateButton = ({ href }) => {
    return (
        <Link
            href={href}
            className="bg-black text-white text-xs px-5 py-2 rounded-xl"
        >
            <strong>Buat baru</strong>
        </Link>
    );
};

export default CreateButton;
