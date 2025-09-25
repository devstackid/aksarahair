// components/DeleteButton.jsx
export default function BulkDeleteButton({
    onDelete,
    count = 0,
    disabled = false,
    label = "Hapus Pilihan"
}) {
    return (
        <button
            className={`text-xs text-white bg-red-500 border font-[Montreal-Medium] tracking-wide border-red-500 px-5 py-1.5 rounded-xl hover:bg-red-50 hover:text-red-700 transition md:order-1 order-2 ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onDelete}
            disabled={disabled}
        >
                {label} {count > 0 && `(${count})`}
        </button>
    );
}
