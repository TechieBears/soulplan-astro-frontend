import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Breadcrumbs = ({ currentService }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter(Boolean);

  // Create readable page title (last segment)
  const pageTitle = currentService || (pathnames.length
    ? decodeURIComponent(pathnames[pathnames.length - 1])
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Home");

  return (
    <div className="container mx-auto p-12 bg-white mt-20">
      <div className="container mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg py-20 px-6 text-center text-white">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{pageTitle}</h1>

        {/* Breadcrumb Nav */}
        <nav className="text-sm sm:text-base flex justify-center items-center space-x-1">
          <Link to="/" className="hover:underline text-white/90">
            Home
          </Link>
          <Icon
            icon="material-symbols:chevron-right-rounded"
            className="text-white/70"
            width={18}
            height={18}
          />
          <Link to="/services" className="hover:underline text-white/90">
            Services
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
