import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    setLoggedUser,
    setLoggedUserDetails,
} from "../../redux/Slices/loginSlice";
import toast from "react-hot-toast";
import { formBtn1 } from "../../utils/CustomClass";
import { CaretRight, Power, Trash } from "@phosphor-icons/react";


const ProfileSidebar = ({ children }) => {
    const user = useSelector((state) => state.user);
    const isLoggedIn = user?.isLogged;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Utility to check if a link is active
    const isActive = (path) => location.pathname === path;

    const navItems = [
        {
            label: "My Account",
            path: "/profile/account",
            icon: "iconamoon:profile",
        },
        {
            label: "My Orders",
            path: "/profile/my-orders",
            icon: "material-symbols-light:orders-outline",
        },
        {
            label: "My Address",
            path: "/profile/address",
            icon: "bitcoin-icons:address-book-outline",
        },
        {
            label: "Refer & Earn",
            path: "/profile/refer",
            icon: "material-symbols:share",
        },
        {
            label: "Customer Support",
            path: "/profile/customer-support",
            icon: "material-symbols:support-agent",
        },
        {
            label: "Privacy Policy",
            path: "/privacy-policy",
            icon: "material-symbols:privacy-tip-outline",
        },
    ];

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            dispatch(setLoggedUser(false));
            dispatch(setLoggedUserDetails({}));
            toast.success("Logged out successfully!");
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
            toast.error("Logout failed");
        }
    };

    return (
        <div className="bg-[#FFF9EF]  pt-20 lg:pt-24 pb-10">
            <section className="w-full lg:py-2 xl:py-4 sm:px-5 xl:px-0">
                <div className="container mx-auto ">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <aside className="hidden lg:flex lg:w-[22%] bg-white border border-slate-200 rounded-2xl flex-col justify-between h-full">
                            <div className="space-y-4">
                                <h2 className="text-base lg:text-lg p-4 font-medium font-tbLex text-black ">
                                    My Profile
                                </h2>

                                <nav className="flex flex-col">
                                    {navItems.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {item.path.startsWith("/") ? (
                                                <Link
                                                    to={item.path}
                                                    className={`flex items-center justify-between font-normal font-tbPop transition-all duration-300 ${isActive(item.path)
                                                            ? "bg-linear-gradient text-white px-3 py-[18px]"
                                                            : "px-3 py-[18px] text-slate-900"
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-2 text-base font-tbPop">
                                                        {item.label}
                                                    </span>
                                                    <CaretRight
                                                        size={15}
                                                        weight="bold"
                                                        className={
                                                            isActive(item.path)
                                                                ? "text-slate-100"
                                                                : "text-slate-700"
                                                        }
                                                    />
                                                </Link>
                                            ) : (
                                                <button
                                                    className={`flex items-center justify-between px-3 py-[18px] rounded-lg font-medium transition ${isActive(item.path)
                                                            ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
                                                            : "hover:bg-gray-100 text-[#1d2e36]"
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Icon icon={item.icon} width={22} height={22} />
                                                        {item.label}
                                                    </span>
                                                    <Icon
                                                        icon="material-symbols-light:keyboard-arrow-right"
                                                        width={24}
                                                        height={24}
                                                    />
                                                </button>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </nav>
                            </div>

                            {/* Bottom Action Buttons */}
                            <div className="mt-20 space-y-3 p-4  border-slate-200">
                                <button
                                    onClick={handleLogout}
                                    className={`${formBtn1} w-full flex !items-center justify-center border border-black bg-transparent !racking-tight !text-black`}
                                >
                                    Logout
                                    <Power size={22} className="ml-1 text-slate-500" />
                                </button>

                                <button
                                    disabled
                                    className={`${formBtn1} w-full flex !items-center justify-center  bg-red-500 !racking-tight !text-white`}
                                >
                                    Delete Account
                                    <Trash size={22} className="ml-1 text-white" />
                                </button>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 bg-white rounded-2xl p-2 md:p-4 border border-slate-200 px-4">
                            {children}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfileSidebar;
