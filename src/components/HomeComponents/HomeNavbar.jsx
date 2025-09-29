import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { formBtn3 } from "../../utils/CustomClass";
import { CaretDown, List } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { LoginCurve, User, Box, Building4, CallCalling, Information } from "iconsax-reactjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getActiveServiceCategories, getProductFromCart, getPublicServicesDropdown } from "../../api";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { setCartProductCount } from "../../redux/Slices/cartSlice";

const HomeNavbar = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", dropdown: true, path: "/services" },
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
    const cartProductCount = useSelector((state) => state.cart.cartProductCount);
    const navigate = useNavigate();
    const location = useLocation();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const dispatch = useDispatch();
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

    const fetchProductCart = async () => {
        try {
            const res = await getProductFromCart();
            dispatch(setCartProductCount(res?.data?.items?.length));
        } catch (err) {
            toast.error(err.message || "Failed to fetch product cart");
            console.error("Error fetching product cart", err);
        }
    };

    useEffect(() => {
        fetchProductCart();
    }, []);



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
                                    <NavLink
                                        key={i}
                                        to={link.path}
                                        ref={trigger}
                                        onClick={() => { setDropdownOpen(!dropdownOpen), window.scrollTo(0, 0, { behavior: "smooth" }) }}
                                        className={({ isActive }) =>
                                            `font-medium font-tbPop flex items-center space-x-1 cursor-pointer text-base !transition-all !duration-500 ${isActive
                                                ? "text-p font-bold"
                                                : "text-gray-800 text-hover-p"
                                            }`
                                        }
                                    >
                                        <span >{link.name}</span>
                                        <span className={dropdownOpen ? "-rotate-180 duration-300 transition-all" : "rotate-0 duration-300 transition-all"}>
                                            <CaretDown size="20" className={`transition-all duration-300 ${dropdownOpen
                                                ? 'text-p'
                                                : location.pathname.startsWith('/services')
                                                    ? 'text-p'
                                                    : 'text-slate-800 group-hover:text-p'
                                                }`} weight="bold" />
                                        </span>
                                    </NavLink>
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
                        {login && <button
                            onClick={() => navigate("/cart")}
                            className="relative p-2 text-gray-800 hover:text-blue-600 transition-colors"
                        >
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                                {cartProductCount || 0}
                            </span>
                        </button>}

                        {login ? (
                            <div className="relative">
                                <ProfileSection card={card} setCard={setCard} logout={logout} />
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
                                            `block py-2 px-3 rounded font-medium transition ${isActive ? "text-p bg-p/10" : "text-gray-800 hover:text-p"
                                            }`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Profile Links (only show if logged in) */}
                            {login ? (
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
                                                        `block py-2 px-3 rounded font-medium transition ${isActive ? "text-p bg-p/10" : "text-gray-700 hover:text-p"
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
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className={`${formBtn3}`}
                                >
                                    Login / Register
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>


            {/* Profile Section Popup */}


        </>
    );
};

const ProfileSection = () => {

    const user = useSelector((state) => state.user.userDetails)

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

    const logout = () => {
        setDropdownOpen(!dropdownOpen)
        localStorage.removeItem("persist:root");
        window.location.href = "/";
    }

    return (
        <section className=" ">
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative inline-block">
                        <div className="" ref={trigger}
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className=" rounded-full border-2 border-white w-full flex items-center space-x-2 cursor-pointer">
                                <img loading="lazy" className="h-10 w-10 rounded-full object-cover bg-slate1 " src={user?.profilePicture || "https://bootstrapdemos.wrappixel.com/materialM/dist/assets/images/profile/user-1.jpg"} alt="user" />
                            </div>
                        </div>
                        <div
                            ref={dropdown}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                            className={`absolute right-0 top-16 w-[240px] pb-3 overflow-hidden rounded-xl z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-500 ${dropdownOpen ? "block opacity-100 transition-all ease-in-out duration-500" : "hidden opacity-0 transition-all ease-in-out duration-500"}`}
                        >
                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="relative aspect-square w-16 rounded-full">
                                    <img
                                        src={user?.profilePicture || "https://cdn.tailgrids.com/assets/images/core-components/account-dropdowns/image-1.jpg"}
                                        alt="account"
                                        className="w-full rounded-full object-cover object-center"
                                    />
                                    <span className="absolute right-0 top-1 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 "></span>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-base font-tbLex font-semibold text-black capitalize overflow-hidden text-ellipsis whitespace-nowrap">
                                        {user?.firstName || "Guest"} {user?.lastName || "User"}
                                    </p>
                                    <p className="text-xs font-tbPop text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {user?.email || "Guest Email"}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <NavLink
                                    to="/profile/account"
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50 " onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="flex items-center gap-2">
                                        <User size={22} variant="TwoTone" />
                                        View profile
                                    </span>
                                </NavLink>
                                <NavLink
                                    to="/profile/my-orders"
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="flex items-center gap-2">
                                        <Box size={22} variant="TwoTone" />
                                        My Orders
                                    </span>
                                </NavLink>
                                <NavLink
                                    to="/profile/address"
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="flex items-center gap-2">
                                        <Building4 size={22} variant="TwoTone" />
                                        My Address
                                    </span>
                                </NavLink>
                                <NavLink
                                    to="/profile/customer-support"
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="flex items-center gap-2">
                                        <CallCalling size={22} variant="TwoTone" />
                                        Costumer Care
                                    </span>
                                </NavLink>
                                <NavLink
                                    to="/privacy-policy"
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="flex items-center gap-2">
                                        <Information size={22} variant="TwoTone" />
                                        Privacy Policy
                                    </span>
                                </NavLink>
                            </div>
                            <div>
                                <button onClick={logout} className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-red-500 hover:bg-gray-50 ">
                                    <span className="flex items-center gap-2">
                                        <LoginCurve size={22} variant="TwoTone" />
                                        Log out
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



const ServiceDropdown = ({ dropdownOpen, setDropdownOpen, dropdown, trigger }) => {
    const [Searvice, setSearvice] = useState([]);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            const response = await getPublicServicesDropdown();
            console.log("⚡️🤯 ~ HomeNavbar.jsx:413 ~ fetchServiceCategories ~ response:", response)
            setSearvice(response?.data);
        }
        fetchServiceCategories();
    }, []);

    return (
        <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            className={`absolute left-0 top-14 w-[240px] pb-3 h-[200px] overflow-y-scroll scrollbars rounded-lg z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-500 ${dropdownOpen ? "block opacity-100 transition-all ease-in-out duration-500" : "hidden opacity-0 transition-all ease-in-out duration-500"}`}
        >
            <div>
                {Searvice?.map((item, i) => (
                    <NavLink
                        to={`/services/${item.name?.toLowerCase()}`}
                        key={i}
                        state={{
                            serviceData: {
                                ...item
                            }
                        }}
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
