import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

import Services from "./Components/Organisms/Services";
import Footer from "./Components/Organisms/Footer";
import Navbar from "./Components/Navbar";
import BookButton from "./Components/Atoms/BookButton";

const Pricelist = ({ pricelists, config }) => {
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Pricelist" />

            <Navbar auth={auth} />

            <Services pricelists={pricelists} config={config} />

            <Footer />

            <BookButton />
        </GuestLayout>
    );
};

export default Pricelist;
