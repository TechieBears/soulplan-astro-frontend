import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { formBtn1 } from "../../utils/CustomClass";
import GradientButton from "../Buttons/GradientButton";
import { CaretDown, List, Share, X, ArrowRight } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { LoginCurve, User, Box, Building4, CallCalling, Information, Wallet, NotificationBing, SmsNotification, ShoppingCart } from "iconsax-reactjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { clearAllNotifications, getActiveServiceCategories, getNotificationsDropdown, getNotificationsDropdownCustomer, getProductFromCart, getPublicServicesDropdown, getWalletBalance } from "../../api";
import toast from "react-hot-toast";
import { setCartProductCount } from "../../redux/Slices/cartSlice";
import moment from "moment";
import { useCurrency } from "../../utils/useCurrency";

const HomeNavbar = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Services", dropdown: true, path: "/services" },
        { name: "Shop", path: "/products" },
        { name: "Contact Us", path: "/contact-us" },
    ];

    const profileNavLinks = [
        { name: "My Account", path: "/profile/account" },
        { name: "My Cart", path: "/cart" },
        { name: "My Orders", path: "/profile/my-orders" },
        { name: "My Address", path: "/profile/address" },
        { name: "Refer & Earn", path: "/profile/refer" },
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
    const [walletBalance, setWalletBalance] = useState(0);
    const mobileMenuRef = useRef(null);
    const currencySymbol = useCurrency();

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsDropdown, setNotificationsDropdown] = useState([]);

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
        if (!login) return;
        try {
            const res = await getProductFromCart();
            dispatch(setCartProductCount(res?.data?.items?.length));
        } catch (err) {
            toast.error(err.message || "Failed to fetch product cart");
            console.error("Error fetching product cart", err);
        }
    };

    useEffect(() => {
        if (!login) return;
        const fetchWalletBalance = async () => {
            const res = await getWalletBalance();
            if (res?.success) {
                setWalletBalance(res?.data?.balance || 0);
            }
        }
        fetchWalletBalance();
        fetchProductCart();
    }, []);



    return (
        <>
            <nav className={`navbar fixed top-0 left-0 z-[900] bg-white w-full right-0 transition-colors duration-500 ${isScrolled ? "shadow-md" : ""}`}>
                <div className="flex items-center justify-between container mx-auto px-5 xl:px-0 py-3">
                    {/* ===== Left: Logo and Brand ===== */}
                    <button
                        onClick={() => {
                            navigate("/");
                            window.scrollTo(0, 0, { behavior: "smooth" });
                        }}
                        className="flex items-center gap-2"
                    >
                        <img src={logo} alt="logo" className="w-10 h-10 md:w-12 md:h-12" />
                        <h2 className="text-lg md:text-xl lg:text-2xl font-tbLex tracking-tight font-bold text-gray-800 uppercase">Soul Plan</h2>
                    </button>

                    {/* ===== Center: Nav Links ===== */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, i) =>
                            link.dropdown ? (
                                <div key={i} className="relative inline-block" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                    <NavLink
                                        key={i}
                                        to={link.path}
                                        ref={trigger}
                                        onClick={() => { setDropdownOpen(!dropdownOpen), window.scrollTo(0, 0, { behavior: "smooth" }) }}
                                        className={({ isActive }) =>
                                            `font-medium font-tbPop flex items-center space-x-1 cursor-pointer text-base ${isActive
                                                ? "text-p font-bold"
                                                : "text-gray-800 text-hover-p font-bold"
                                            }`
                                        }
                                        data-text={link.name}
                                    >
                                        <span>{link.name}</span>
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
                                        `font-medium font-tbPop text-base ${isActive
                                            ? "text-p font-bold"
                                            : "text-gray-800 text-hover-p font-bold"
                                        }`
                                    }
                                    data-text={link.name}
                                >
                                    {link.name}
                                </NavLink>
                            )
                        )}
                    </div>

                    {/* ===== Right: Cart & Profile ===== */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Cart Icon */}
                        {login && <button onClick={() => navigate("/profile/refer")} className="bg-gradient-to-r from-[#FBBF24] to-[#FB923C] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white font-tbLex font-semibold text-center text-xs sm:text-sm flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                            <Wallet size={24} className="text-white" />
                            <span className="text-white text-xs sm:text-sm">{currencySymbol}{walletBalance || 0}</span>
                        </button>}
                        {login && <NotificationSection />}
                        {login &&
                            <button className=' relative' ref={trigger}
                                onClick={() => navigate("/cart", { state: { type: "products" } })}>
                                {cartProductCount > 0 && <span className="absolute flex top-0 -right-2 h-3.5 w-3.5">
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                                        {cartProductCount || 0}
                                    </span>
                                </span>}
                                <div className="flex items-center space-x-2 p-2 bg-slate-100 rounded-full">
                                    <ShoppingCart size={24} className='text-black' />
                                </div>
                            </button>
                        }

                        {login ? (
                            <div className="relative">
                                <ProfileSection card={card} setCard={setCard} logout={logout} />
                            </div>
                        ) : (
                            <GradientButton onClick={() => navigate("/login")}>
                                Login / Register
                            </GradientButton>
                        )}
                    </div>

                    {/* ===== Mobile Menu Icon ===== */}
                    <div className="flex items-center gap-3 lg:hidden">
                        {isMenuOpen ? (
                            <X
                                size={30}
                                onClick={() => setIsMenuOpen(false)}
                                className="cursor-pointer"
                            />
                        ) : (
                            <List
                                size={30}
                                onClick={() => setIsMenuOpen(true)}
                                className="cursor-pointer"
                            />
                        )}
                    </div>
                </div>

                {/* ===== Mobile Menu ===== */}
                {isMenuOpen && (
                    <div ref={mobileMenuRef} className="lg:hidden bg-white border-t">
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
                                <GradientButton onClick={() => navigate("/login")} className="w-full">
                                    Login / Register
                                </GradientButton>
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
                                <img loading="lazy" className="h-10 w-10 rounded-full object-cover bg-slate1 " src={user?.profileImage || "https://bootstrapdemos.wrappixel.com/materialM/dist/assets/images/profile/user-1.jpg"} alt="user" />
                            </div>
                        </div>
                        <div
                            ref={dropdown}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                            className={`absolute right-0 top-16 w-[240px] pb-3 overflow-hidden rounded-xl z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-500 ${dropdownOpen ? "block opacity-100 transition-all ease-in-out duration-500" : "hidden opacity-0 transition-all ease-in-out duration-500"}`}
                        >
                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="relative aspect-square w-16 h-16 rounded-full">
                                    <img
                                        src={user?.profileImage || "https://cdn.tailgrids.com/assets/images/core-components/account-dropdowns/image-1.jpg"}
                                        alt="user"
                                        className="w-full h-full rounded-full object-cover object-center"
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
                                    to="/profile/refer"
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium font-tbLex text-black hover:bg-gray-50"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="flex items-center gap-2">
                                        <Share size={22} variant="TwoTone" />
                                        Refer & Earn
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
    const [needsScroll, setNeedsScroll] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            const response = await getPublicServicesDropdown();
            setSearvice(response?.data);
        }
        fetchServiceCategories();
    }, []);

    useEffect(() => {
        if (dropdownOpen && contentRef.current) {
            const checkHeight = () => {
                const viewportHeight = window.innerHeight;
                const dropdownTop = contentRef.current.getBoundingClientRect().top;
                const availableHeight = viewportHeight - dropdownTop - 5;
                const contentHeight = contentRef.current.scrollHeight;
                setNeedsScroll(contentHeight > availableHeight);
            };
            checkHeight();
            window.addEventListener('resize', checkHeight);
            return () => window.removeEventListener('resize', checkHeight);
        }
    }, [dropdownOpen, Searvice]);

    return (
        <div
            ref={dropdown}
            className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[600px] pb-3 ${needsScroll ? 'max-h-[calc(100vh-5px)] overflow-y-auto scrollbars' : ''} rounded-lg z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-300 ${dropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
            <div ref={contentRef} className="grid grid-cols-2 gap-x-4 p-2 auto-rows-fr">
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
                            `flex items-center gap-2 rounded group h-full ${isActive ? "text-p font-bold" : "text-gray-800"
                            }`
                        }
                        onClick={() => { setDropdownOpen(false), window.scrollTo(0, 0, { behavior: "smooth" }) }}
                    >
                        <h4 className="font-medium font-tbPop text-base px-4 relative overflow-hidden z-10 border-b border-slate-200 flex items-center justify-between gap-3 w-full h-full">
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-white flex-1">{item.name}</span>
                            <ArrowRight className="h-5 w-5 relative z-10 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 flex-shrink-0" />
                            <span className="absolute inset-0 bg-purple-red-gradient transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10"></span>
                        </h4>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}


const NotificationSection = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsDropdown, setNotificationsDropdown] = useState([]);

    const trigger = useRef(null);
    const dropdown = useRef(null);

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

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    const fetchNotificationsDropdown = async () => {
        try {
            const res = await getNotificationsDropdownCustomer();
            if (res?.success) {
                setNotificationsDropdown(res?.data);
            } else {
                setNotificationsDropdown([]);
                toast.error(res?.message || res?.error || 'Failed to fetch notifications dropdown');
            }
        } catch (error) {
            console.log("==========error in fetchNotificationsDropdown", error);
        }
    }


    const clearAllNotificationHandler = async () => {
        try {
            const res = await clearAllNotifications();
            if (res?.success) {
                toast.success(res?.message || res?.success || 'Notifications cleared successfully');
                setDropdownOpen(false);
                fetchNotificationsDropdown();
            } else {
                toast.error(res?.message || res?.error || 'Failed to clear notifications');
            }
        }
        catch (error) {
            console.log("==========error in clearAllNotifications", error);
            toast.error(error?.message || error?.error || 'Failed to clear notifications');
        }
    }

    useEffect(() => {
        fetchNotificationsDropdown();
    }, []);
    return (
        <section className=" ">
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative inline-block">
                        <button className=' relative' ref={trigger}
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {notificationsDropdown?.length > 0 && <span className="absolute flex top-0 -right-2 h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>}
                            <div className="flex items-center space-x-2 p-2 bg-slate-100 rounded-full">
                                <NotificationBing size="26" className='text-black' variant='TwoTone' />
                            </div>
                        </button>
                        <div
                            ref={dropdown}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                            className={`absolute right-0 top-14 py-5 w-[350px] overflow-hidden rounded-lg z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-500 ${dropdownOpen ? "block opacity-100 transition-all ease-in-out duration-500" : "hidden opacity-0 transition-all ease-in-out duration-500"}`}
                        >
                            <ul className="focus:outline-none" tabIndex="-1">
                                <div className="flex items-center px-6 justify-between">
                                    <h3 className="mb-0 text-lg font-semibold font-tbLex">Notifications</h3>
                                    <span className="flex h-fit w-fit items-center font-medium font-tbPop bg-red-500 text-white p-1 text-xs rounded-full capitalize px-2.5 py-1" data-testid="flowbite-badge">
                                        <span>{notificationsDropdown?.length > 0 ? notificationsDropdown?.length + " new" : "No new"}</span>
                                    </span>
                                </div>

                                <div data-simplebar="init" className="max-h-80 mt-3 overflow-y-scroll">
                                    <div
                                        className="simplebar-content-wrapper"
                                        tabIndex="0"
                                        role="region"
                                        aria-label="scrollable content"
                                    >
                                        <div className="simplebar-content" style={{ padding: '0px' }}>
                                            {notificationsDropdown?.map((item, i) => (
                                                <li key={i} role="menuitem" className="focus:outline-none">
                                                    <a
                                                        // href={item?.url}
                                                        type="button"
                                                        className="cursor-pointer text-sm text-ld hover:text-primary focus:bg-hover focus:outline-none px-6 py-3 flex justify-between items-center bg-hover group/link w-full"
                                                        tabIndex="-1"
                                                        data-discover="true"
                                                    >
                                                        <div className="flex items-center w-full space-x-2">
                                                            <div className="h-10 w-10 flex-shrink-0 rounded-full flex justify-center items-center bg-lighterror ">
                                                                <SmsNotification size={24} variant='TwoTone' className='text-orange-500' />
                                                            </div>
                                                            <div className=" flex justify-between w-full">
                                                                <div className="w-3/4 text-start leading-4 -space-y-0.5">
                                                                    <h5 className="mb-1 text-sm font-tbLex font-medium group-hover/link:text-primary capitalize line-clamp-1 text-start">{item?.title}</h5>
                                                                    <div className="text-xs text-slate-500  line-clamp-1 capitalize text-start">{item?.description}</div>
                                                                </div>
                                                                <h6 className="text-xs block font-tbPop self-start pt-1.5 text-end ">{moment(item?.createdAt).format('hh:mm A')}</h6>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {notificationsDropdown?.length > 0 && <div className="pt-5 px-5">
                                    <button type='submit' className={`${formBtn1}  bg-red-500 hover:bg-red-500/90 w-full tracking-tight font-normal text-sm`} onClick={clearAllNotificationHandler}>Clear All</button>
                                </div>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default HomeNavbar;
