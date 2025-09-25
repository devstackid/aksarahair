import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

import Gallery from "./Components/Organisms/Gallery";
import Footer from "./Components/Organisms/Footer";
import Navbar from "./Components/Navbar";
import BookButton from "./Components/Atoms/BookButton";

const GalleryPage = ({ galleries }) => {
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Gallery" />

            <Navbar auth={auth} />

            <Gallery galleries={galleries} />

            <Footer />

            <BookButton />
        </GuestLayout>
    );
};

export default GalleryPage;
