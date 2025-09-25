import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

import ProductSection from "./Components/Organisms/ProductSection";
import Footer from "./Components/Organisms/Footer";
import Navbar from "./Components/Navbar";
import BookButton from "./Components/Atoms/BookButton";

const Index = ({ products }) => {
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Produk" />

            <Navbar auth={auth} />

            

            <ProductSection products={products} />


            <Footer />

            <BookButton />
        </GuestLayout>
    );
};

export default Index;
