import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

import About from "./Components/Organisms/About";
import Header from "./Components/Organisms/Header";
import Teams from "./Components/Organisms/Teams";
import Services from "./Components/Organisms/Services";
import Gallery from "./Components/Organisms/Gallery";
import Testimonial from "./Components/Organisms/Testimonial";
import ProductSection from "./Components/Organisms/ProductSection";
import Footer from "./Components/Organisms/Footer";
import Navbar from "./Components/Navbar";
import BookButton from "./Components/Atoms/BookButton";

const Index = ({ pricelists, config, products, galleries, teams, reviews }) => {
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Beranda" />

            <Navbar auth={auth} />

            <Header />
            <About teams={teams} pricelists={pricelists} reviews={reviews} />
            <Teams teams={teams} />

            <Services pricelists={pricelists} config={config} />

            <Gallery galleries={galleries} />

            <Testimonial auth={auth} />

            <ProductSection products={products} />


            <Footer />

            <BookButton />
        </GuestLayout>
    );
};

export default Index;
