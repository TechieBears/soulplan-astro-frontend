import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Breadcrumbs = ({ currentService }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Create readable page title (last segment)
    const pageTitle =
        currentService ||
        (pathnames.length
            ? decodeURIComponent(pathnames[pathnames.length - 1])
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())
            : "Home");

    return (
        <div className="pt-10 pb-8 md:pt-10 md:pb-10 container mx-auto px-5 xl:px-0">
            <div className="bg-linear-gradient rounded-lg py-5 md:py-10 lg:py-16 xl:py-20 px-6 text-center text-white">
                {/* Page Title */}
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-medium font-tbLex mb-2 capitalize">
                    {pageTitle}
                </h1>

                {/* Breadcrumb Nav */}
                <nav className="text-sm md:text-base flex justify-center items-center space-x-1 font-tbLex font-medium">
                    <Link to="/" className="hover:underline text-white/90">
                        Home
                    </Link>

                    {pathnames.map((name, index) => {
                        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                        const isLast = index === pathnames.length - 1;

                        const formattedName = decodeURIComponent(name)
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase());

                        return (
                            <span key={routeTo} className="flex items-center space-x-1">
                                <Icon
                                    icon="material-symbols:chevron-right-rounded"
                                    className="text-white/70"
                                    width={18}
                                    height={18}
                                />
                                {isLast ? (
                                    <span className="text-white font-medium">{currentService || formattedName}</span>
                                ) : (
                                    <Link
                                        to={routeTo}
                                        className="hover:underline text-white/90 capitalize"
                                    >
                                        {formattedName}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumbs;
