import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { formBtn3 } from "../../utils/CustomClass";
import { CaretDown, List } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { LoginCurve, Profile, I24Support } from "iconsax-reactjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { getActiveServiceCategories } from "../../api";
import { ShoppingCart } from "lucide-react";

const HomeNavbar = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", dropdown: true, path: "/services/:id" },
        { name: "Shop", path: "/products" },
        { name: "Contact Us", path: "/contact" },
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
                        <img src={logo} alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
                        <h2 className="text-lg md:text-xl lg:text-2xl font-tbLex tracking-tight font-bold text-gray-800">SOUL PLAN</h2>
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
                            <div
                                className="flex items-center gap-4 cursor-pointer"
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
            className={`${card ? "-top-96 right-0 opacity-0" : "top-20 right-6 opacity-100"
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
                            to="/profile/my-orders"
                            onClick={() => setCard(!card)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                            <Icon
                                icon="material-symbols-light:orders-outline"
                                className="w-5 h-5"
                            />
                            My Orders
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/profile/customer-support"
                            onClick={() => setCard(!card)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                            <I24Support size={20} />
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



const ServiceDropdown = ({ dropdownOpen, setDropdownOpen, dropdown, trigger }) => {
    const [Searvice, setSearvice] = useState([]);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            const response = await getActiveServiceCategories();
            setSearvice(response?.data);
        }
        fetchServiceCategories();
    }, []);

    return (
        <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            className={`absolute left-0 top-14 w-[240px] pb-3 overflow-hidden rounded-lg z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-500 ${dropdownOpen ? "block opacity-100 transition-all ease-in-out duration-500" : "hidden opacity-0 transition-all ease-in-out duration-500"}`}
        >
            <div>
                {Searvice?.map((item, i) => (
                    <NavLink
                        to={`/services/${item.name?.toLowerCase()}`}
                        key={i}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 hover:bg-gray-100 !transition-all !duration-500 !ease-in-out ${isActive ? "text-p font-bold" : "text-gray-800 hover:text-p"
                            }`
                        }
                        onClick={() => { setDropdownOpen(false), window.scrollTo(0, 0, { behavior: "smooth" }) }}
                    >
                        <h4 className="font-medium font-tbPop text-base">
                            {item.name}
                        </h4>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default HomeNavbar;
