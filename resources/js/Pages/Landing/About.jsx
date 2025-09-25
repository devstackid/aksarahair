import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

import About from "./Components/Organisms/About";
import Footer from "./Components/Organisms/Footer";
import Navbar from "./Components/Navbar";
import BookButton from "./Components/Atoms/BookButton";

const AboutPage = ({ pricelists, teams, reviews }) => {
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Tentan Kami" />

            <Navbar auth={auth} />

            
            <About teams={teams} pricelists={pricelists} reviews={reviews} />
            

            <Footer />

            <BookButton />
        </GuestLayout>
    );
};

export default AboutPage;
