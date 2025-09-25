// stores/useDeleteStore.js
import { create } from "zustand";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export const useDeleteStore = create((set, get) => ({
    selectedIds: [],
    setSelectedIds: (updater) =>
        set((state) => ({
            selectedIds:
                typeof updater === "function"
                    ? updater(state.selectedIds)
                    : updater,
        })),

    handleBulkDelete: (routeName) => {
        const { selectedIds, setSelectedIds } = get();

        Swal.fire({
            title: "Hapus Data Yang Dipilih?",
            text: "Tindakan ini tidak dapat dibatalkan!",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                title: "text-sm font-inter text-foreground",
                htmlContainer:
                    "text-foreground text-xs font-inter text-foreground",
                confirmButton:
                    "bg-black text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black",
                cancelButton:
                    "bg-gray-100 text-xs font-inter text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route(routeName),
                    { ids: selectedIds },
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            setSelectedIds([]);
                            Swal.fire({
                                title: "Berhasil!",
                                text: "Data berhasil dihapus.",
                                icon: "success",
                                confirmButtonText: "OK",
                                customClass: {
                                    popup: "rounded-lg shadow",
                                    title: "text-lg font-semibold",
                                    confirmButton:
                                        "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700",
                                },
                            });
                        },
                    }
                );
            }
        });
    },

    handleSingleDelete: (routeName, id) => {
        Swal.fire({
            title: "Yakin ingin menghapus data ini?",
            text: "Tindakan ini tidak dapat dibatalkan!",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                popup: "rounded-lg shadow-lg pt-5 w-max px-10",
                title: "text-sm font-inter text-foreground",
                htmlContainer:
                    "text-foreground text-xs font-inter text-foreground",
                confirmButton:
                    "bg-black text-xs font-inter text-white px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black",
                cancelButton:
                    "bg-gray-100 text-xs font-inter text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route(routeName, id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Data berhasil dihapus.",
                            "success"
                        );
                    },
                });
            }
        });
    },
}));
