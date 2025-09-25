import { usePage } from "@inertiajs/react";
import clsx from "clsx";

export default function GuestLayout({ children }) {
    

        const { url } = usePage();
    

    return (
        <>
            <div className={clsx("bg-white md:font-inter h-screen overflow-y-auto z-[60]", url == '/reservation' && '!bg-neutral-100')}>
                {children}
            </div>

            

            
        </>
    );
}
