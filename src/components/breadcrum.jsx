import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Breadcrumbs = ({ currentService }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Create readable page title (last segment)
    const pageTitle = currentService || (pathnames.length
        ? decodeURIComponent(pathnames[pathnames.length - 1])
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "Home");

    return (
        <div className="pt-10 pb-8 md:pt-10 md:pb-10 container mx-auto px-5 xl:px-0">
            <div className="bg-linear-gradient  rounded-lg py-5 md:py-10 lg:py-16 xl:py-20 px-6 text-center text-white">
                {/* Page Title */}
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-medium font-tbLex mb-2">{pageTitle}</h1>

                {/* Breadcrumb Nav */}
                <nav className="text-sm md:text-base flex justify-center items-center space-x-1 font-tbLex font-medium">
                    <Link to="/" className="hover:underline text-white/90">
                        Home
                    </Link>
                    <Icon
                        icon="material-symbols:chevron-right-rounded"
                        className="text-white/70"
                        width={18}
                        height={18}
                    />
                    <Link to="/services" className="hover:underline text-white/90 capitalize">
                        {pathnames}
                    </Link>
                    {currentService && (
                        <>
                            <Icon
                                icon="material-symbols:chevron-right-rounded"
                                className="text-white/70"
                                width={18}
                                height={18}
                            />
                            <span className="font-medium">{currentService}</span>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumbs;
