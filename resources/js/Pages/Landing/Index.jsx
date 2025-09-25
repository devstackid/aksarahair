import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import About from "./Components/About";
import Teams from "./Components/Teams";
import Services from "./Components/Services";
import Gallery from "./Components/Gallery";
import Testimonial from "./Components/Testimonial";
import ProductSection from "./Components/ProductSection";
import Footer from "./Components/Footer";
import { BiCalendarEvent } from "react-icons/bi";

const Index = ({ pricelists, config, products, galleries, teams, reviews }) => {
    // const { teams } = useAppStore();
    const { auth } = usePage().props;


    return (
        <GuestLayout>
            <Head title="Nexiro Hair"/>

            <Navbar auth={auth} />

             <Header />
                <About  teams={teams} pricelists={pricelists} reviews={reviews} />
                <Teams teams={teams} />

                <Services pricelists={pricelists} config={config} />

                <Gallery galleries={galleries} />

                <Testimonial auth={auth} />

                <ProductSection products={products} />

                {/* <Contact /> */}

                {/* <ReviewForm auth={auth} /> */}

                <Footer />
            

            <Link href={route('reservation')} className="text-sm font-[Montreal-Bold] tracking-wide text-black flex md:hidden items-center gap-2 bg-white px-10 text-nowrap py-2.5 rounded-3xl shadow-xl fixed bottom-10 left-1/2 -translate-x-1/2 z-50 hover:bg-white transition"><BiCalendarEvent/> Booking Disini</Link>


        </GuestLayout>
    );
};

export default Index;
