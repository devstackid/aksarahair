import clsx from "clsx";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-end items-center gap-2 px-4 py-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={clsx(
                        "px-4 py-2 border rounded text-sm font-medium",
                        currentPage === page
                            ? "bg-black border border-transparent text-gray-100"
                            : "bg-gray-100 border border-transparent text-black hover:bg-black hover:text-white transition"
                    )}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}
