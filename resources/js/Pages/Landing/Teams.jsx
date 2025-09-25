import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

import Teams from "./Components/Organisms/Teams";
import Footer from "./Components/Organisms/Footer";
import Navbar from "./Components/Navbar";
import BookButton from "./Components/Atoms/BookButton";

const TeamsPage = ({ teams }) => {
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Teams" />

            <Navbar auth={auth} />

            <Teams teams={teams} />


            <Footer />

            <BookButton />
        </GuestLayout>
    );
};

export default TeamsPage;
