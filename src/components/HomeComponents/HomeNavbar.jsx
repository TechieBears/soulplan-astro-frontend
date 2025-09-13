import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { formBtn1 } from "../../utils/CustomClass";
import { List, X } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { LoginCurve, Profile, I24Support } from "iconsax-reactjs";
import { formatRole } from "../../helper/Helper";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";

const HomeNavbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services",  dropdown: true },
    { name: "Shop", path: "/shop" },
    { name: "Contact Us", path: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [card, setCard] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);

  const login = useSelector((state) => state.user.isLogged);
  const user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrolled(currentScrollPos > 80);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const logout = () => {
    setCard(!card);
    localStorage.removeItem("persist:root");
    window.location.href = "/";
  };

  useGSAP(() => {
    gsap.from(".navbar", {
      y: -80,
      opacity: 0,
      ease: "power1.inOut",
      duration: 1.2,
    });
  }, []);

  return (
    <>
      <nav className="navbar fixed top-0 left-0 z-[900] bg-white w-full shadow-sm">
        <div className="flex items-center justify-between container mx-auto px-6 py-3">
          {/* ===== Left: Logo and Brand ===== */}
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0, { behavior: "smooth" });
            }}
            className="flex items-center gap-2"
          >
            <img src={logo} alt="logo" className="h-10 w-10" />
            <h2 className="text-xl font-bold text-gray-800">SOUL PLAN</h2>
          </button>

          {/* ===== Center: Nav Links ===== */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <div
                  key={i}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(true)}
                  onMouseLeave={() => setOpenDropdown(false)}
                >
                  <NavLink
                    to="/services"
                    className="flex items-center gap-1 font-medium text-gray-800 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services <ChevronDown size={16} />
                  </NavLink>
                  {openDropdown && (
                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-lg py-2 w-40">
                      <li>
                        <NavLink
                          to="/services/reading"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Reading
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/services/coaching"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Coaching
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/services/consulting"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Consulting
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  key={i}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-medium ${
                      isActive
                        ? "text-blue-600 font-bold"
                        : "text-gray-800 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            )}
          </div>

                    {/* ===== Right: Profile Image ===== */}
                    {login ? (
                        <div
                            className="hidden lg:flex items-center gap-4 cursor-pointer"
                            onClick={() => setCard(!card)}
                        >
                            <img
                                src={
                                    user?.user?.profilePicture ||
                                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                }
                                alt="profile"
                                className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                            />
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center gap-4">
                            <button
                                onClick={() => navigate("/login")}
                                className={`${formBtn1} w-full h-[51px] py-3 rounded-md text-white font-semibold !text-base bg-primary-gradient hover:opacity-90 transition disabled:opacity-50`}
                            >
                                Login / Register
                            </button>
                            {/* <button
                onClick={() => navigate("/register")}
                className="w-full py-3  px-4 rounded-md text-white font-semibold bg-gradient-to-r from-blue-600 to-red-500 hover:opacity-90 transition"
              >
                Register
              </button> */}
                        </div>
                    )}

          {/* ===== Mobile Menu Icon ===== */}
          <div className="flex items-center gap-3 lg:hidden">
            <List
              size={30}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>

      {/* Profile Section Popup */}
      <ProfileSection card={card} setCard={setCard} logout={logout} />
    </>
  );
};

const ProfileSection = ({ card, setCard, logout }) => {
  const user = useSelector((state) => state.user.userDetails);
  return (
    <div
      className={`${
        card ? "-top-96 right-0 opacity-0" : "top-20 right-6 opacity-100"
      } bg-white/90 backdrop-blur-lg transition-all ease-in-out duration-500 fixed z-[100] rounded-xl hidden lg:block`}
    >
      <div className="absolute -top-2 right-6 bg-white h-4 w-4 rotate-45" />
      <div className="w-56 py-3 rounded-xl shadow-xl">
        <ul>

             <li>
            <NavLink
              to="/profile/account"
              onClick={() => setCard(!card)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <Profile size={20} /> My Account
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile/address"
              onClick={() => setCard(!card)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <Icon
                icon="bitcoin-icons:address-book-outline"
                className="w-5 h-5"
              />
              My Address
            </NavLink>
          </li>

         

          <li>
            <NavLink
              //   to="/profile/account"
              onClick={() => setCard(!card)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <Icon
                icon="material-symbols-light:orders-outline"
                className="w-5 h-5"
              />
              My Address
            </NavLink>
          </li>

                    <li>
            <NavLink
                to="/profile/customer-support"
              onClick={() => setCard(!card)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
            <I24Support  size={20}  />
             Customer Support
            </NavLink>
          </li>

          <li>
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
            >
              <LoginCurve size={20} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeNavbar;
