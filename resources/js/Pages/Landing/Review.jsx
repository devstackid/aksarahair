import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

import Testimonial from "./Components/Organisms/Testimonial";
import Footer from "./Components/Organisms/Footer";
import Navbar from "./Components/Navbar";
import BookButton from "./Components/Atoms/BookButton";

const Index = () => {
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Ulasan" />

            <Navbar auth={auth} />

            

            <Testimonial auth={auth} />

            


            <Footer />

            <BookButton />
        </GuestLayout>
    );
};

export default Index;
