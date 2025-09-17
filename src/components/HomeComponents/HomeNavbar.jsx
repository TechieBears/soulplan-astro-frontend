import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { formBtn1, formBtn3 } from "../../utils/CustomClass";
import { AddressBookIcon, CaretDown, List } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { LoginCurve, Profile, I24Support, ArrowDown2, User, Setting2 } from "iconsax-reactjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { getActiveServiceCategories, getServiceCategoriesDropdown } from "../../api";
import { ShoppingCart } from "lucide-react";
import DropdownMenu from "../Sidebar/DropdownMenu";
import { IconBase } from "react-icons/lib";

const HomeNavbar = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", dropdown: true, path: "/services/:id" },
        { name: "Shop", path: "/products" },
        { name: "Contact Us", path: "/contact" },
    ];

    const profileNavLinks = [
        { name: "My Account", path: "/profile/account" },
        { name: "My Orders", path: "/profile/my-orders" },
        { name: "My Address", path: "/profile/address" },
        { name: "Customer Support", path: "/profile/customer-support" },
        { name: "Privacy Policy", path: "/privacy-policy" },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [card, setCard] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(false);

    const login = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userDetails);
    const navigate = useNavigate();
    const location = useLocation();
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


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <>
            <nav className={`navbar fixed top-0 left-0 z-[900] bg-white w-full right-0 transition-colors duration-500 ${isScrolled ? "bg-white/20  shadow-md text-black backdrop-blur-lg " : ""}`}>
                <div className="flex items-center justify-between container mx-auto px-5 xl:px-0 py-3">
                    {/* ===== Left: Logo and Brand ===== */}
                    <button
                        onClick={() => {
                            navigate("/");
                            window.scrollTo(0, 0, { behavior: "smooth" });
                        }}
                        className="flex items-center gap-2"
                    >
                        <img src={logo} alt="logo" className="h-11 w-11" />
                        <h2 className="text-2xl font-tbLex tracking-tight font-bold text-gray-800">SOUL PLAN</h2>
                    </button>

                    {/* ===== Center: Nav Links ===== */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, i) =>
                            link.dropdown ? (
                                <div className="relative inline-block">
                                    <button
                                        ref={trigger}
                                        onClick={() => { setDropdownOpen(!dropdownOpen), window.scrollTo(0, 0, { behavior: "smooth" }) }}
                                        className="font-medium font-tbPop text-base !transition-all !duration-500 group"
                                    >
                                        <div className="flex items-center space-x-1 cursor-pointer">
                                            <h5 className={`font-medium font-tbPop text-base transition-all duration-500 ${location.pathname.startsWith('/services')
                                                ? "text-p font-bold"
                                                : "text-gray-800 hover:text-p"
                                                }`}>{link.name}</h5>
                                            <span className={dropdownOpen ? "-rotate-180 duration-300 transition-all" : "rotate-0 duration-300 transition-all"}>
                                                <CaretDown size="20" className={`transition-all duration-300 ${dropdownOpen
                                                    ? 'text-p'
                                                    : location.pathname.startsWith('/services')
                                                        ? 'text-p'
                                                        : 'text-slate-800 group-hover:text-p'
                                                    }`} weight="bold" />
                                            </span>
                                        </div>
                                    </button>
                                    <ServiceDropdown dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} dropdown={dropdown} trigger={trigger} link={link} />
                                </div>
                            ) : (
                                <NavLink
                                    key={i}
                                    to={link.path}
                                    onClick={() => { setIsMenuOpen(false), window.scrollTo(0, 0, { behavior: "smooth" }) }}
                                    className={({ isActive }) =>
                                        `font-medium font-tbPop text-base !transition-all !duration-500 ${isActive
                                            ? "text-p font-bold"
                                            : "text-gray-800 text-hover-p"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            )
                        )}
                    </div>

                    {/* ===== Right: Cart & Profile ===== */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Cart Icon */}
                        <button
                            onClick={() => navigate("/cart")}
                            className="relative p-2 text-gray-800 hover:text-blue-600 transition-colors"
                        >
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                0
                            </span>
                        </button>

                        {login ? (
                            <div className="relative inline-block">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setCard(!card)}
                                >
                                    <div className="bg-white shadow-md rounded-3xl px-1.5 pr-2 py-1 w-full flex items-center space-x-2">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover border-2 border-p"
                                            src={
                                                user?.user?.profilePicture ||
                                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            }
                                            alt="user"
                                        />
                                        <h5 className="text-sm font-tbPop font-medium text-black capitalize">
                                            {user?.user?.firstName || "Guest User"}
                                        </h5>
                                        <span className={card ? "rotate-0 duration-300 transition-all" : "-rotate-180 duration-300 transition-all"}>
                                            <ArrowDown2 size="20" className="text-slate-500" variant="TwoTone" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className={`${formBtn3}`}
                            >
                                Login / Register
                            </button>
                        )}
                    </div>

                    {/* ===== Mobile Menu Icon ===== */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <List
                            size={30}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="cursor-pointer"
                        />
                    </div>
                </div>

                {/* ===== Mobile Menu ===== */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t">
                        <div className="container mx-auto px-5 py-4">
                            {/* Regular Nav Links */}
                            <div className="space-y-2 mb-4">
                                {navLinks.map((link, i) => (
                                    <NavLink
                                        key={i}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block py-2 px-3 rounded font-medium transition ${
                                                isActive ? "text-p bg-p/10" : "text-gray-800 hover:text-p"
                                            }`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>
                            
                            {/* Profile Links (only show if logged in) */}
                            {login && (
                                <>
                                    <div className="border-t pt-4 mb-4">
                                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Profile</h3>
                                        <div className="space-y-2">
                                            {profileNavLinks.map((link, i) => (
                                                <NavLink
                                                    key={i}
                                                    to={link.path}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className={({ isActive }) =>
                                                        `block py-2 px-3 rounded font-medium transition ${
                                                            isActive ? "text-p bg-p/10" : "text-gray-700 hover:text-p"
                                                        }`
                                                    }
                                                >
                                                    {link.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { logout(); setIsMenuOpen(false); }}
                                        className="w-full text-left py-2 px-3 rounded font-medium text-red-600 hover:bg-red-50 transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
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
            className={`absolute right-0 top-14 w-[240px] pb-3 overflow-hidden rounded-xl z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-500 ${card ? "hidden opacity-0" : "block opacity-100"} hidden lg:block`}
        >
            <div className="flex items-center gap-3 px-4 py-3">
                <div className="relative aspect-square w-16 rounded-full">
                    <img
                        src={
                            user?.user?.profilePicture ||
                            "https://cdn.tailgrids.com/assets/images/core-components/account-dropdowns/image-1.jpg"
                        }
                        alt="account"
                        className="w-full rounded-full object-cover object-center"
                    />
                    <span className="absolute right-0 top-1 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
                </div>
                <div>
                    <p className="text-base font-tbLex font-semibold text-black capitalize">
                        {user?.user?.firstName || "Guest"} {user?.user?.lastName || "User"}
                    </p>
                    <p className="text-xs font-tbPop text-slate-500">
                        {user?.user?.email || "guest@email.com"}
                    </p>
                </div>
            </div>
            <div>
                <NavLink
                    to="/profile/account"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                    onClick={() => setCard(!card)}
                >
                    <span className="flex items-center gap-2">
                        <User size={22} variant="TwoTone" />
                        View profile
                    </span>
                </NavLink>
                <NavLink
                    to="/profile/my-orders"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                    onClick={() => setCard(!card)}
                >
                    <span className="flex items-center gap-2">
                        <Icon icon="material-symbols-light:orders-outline" className="w-5 h-5" />
                        My Orders
                    </span>
                </NavLink>
                <NavLink
                    to="/profile/address"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                    onClick={() => setCard(!card)}
                >
                    <span className="flex items-center gap-2">
                        <AddressBookIcon size={22} variant="TwoTone" />
                        My Address 
                    </span>
                </NavLink>
                  <NavLink
                    to="/profile/customer-support"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                    onClick={() => setCard(!card)}
                >
                    <span className="flex items-center gap-2">
                        <I24Support size={22} variant="TwoTone" />
                        Costumer Care 
                    </span>
                </NavLink>
                 <NavLink
                    to="/privacy-policy"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                    onClick={() => setCard(!card)}
                >
                    <span className="flex items-center gap-2">
                        <Icon icon="material-symbols:privacy-tip-outline" className="w-5 h-5" />
                        Privacy Policy 
                    </span>
                </NavLink>
            </div>
            <div>
                <button
                    onClick={logout}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-red-500 hover:bg-gray-50"
                >
                    <span className="flex items-center gap-2">
                        <LoginCurve size={22} variant="TwoTone" />
                        Log out
                    </span>
                </button>
            </div>
        </div>
    );
};


const ServiceDropdown = ({ dropdownOpen, setDropdownOpen, dropdown }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            const response = await getActiveServiceCategories();
            const formattedServices = response?.data?.map(item => ({
                title: item.name,
                link: `/services/${item.name?.toLowerCase()}`,
                icon: <span className="w-2 h-2 bg-p rounded-full"></span>
            }));
            setServices(formattedServices || []);
        }
        fetchServiceCategories();
    }, []);

    return (
        <div
            ref={dropdown}
            className={`absolute left-0 top-14 w-[280px] bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 z-50 transition-all duration-300 ${dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
        >
            <div className="absolute -top-2 left-6 bg-white h-4 w-4 rotate-45 border-l border-t border-gray-200"></div>
            <div className="py-3">
                <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Our Services</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                    <DropdownMenu items={services} isActiveLink={false} />
                </div>
            </div>
        </div>
    );
}


export default HomeNavbar;
