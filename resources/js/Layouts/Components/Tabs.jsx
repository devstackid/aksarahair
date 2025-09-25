import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function Tabs({ tabs = [], currentUrl }) {
    return (
        <div className="w-full flex items-center gap-2 border-b border-neutral-100 mb-5">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    href={tab.href}
                    className={clsx(
                        "text-xs font-[Montreal-Book] tracking-wide text-black px-3 text-center border-b-2 border-transparent pb-1.5",
                        currentUrl === tab.activePath &&
                            "!border-blue-700 !font-[Montreal-Medium]"
                    )}
                >
                    {tab.name}
                </Link>
            ))}
        </div>
    );
}
