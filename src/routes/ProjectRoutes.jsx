import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

// ============ Components ============
import Sidebar from "../components/Sidebar/Sidebar";
import Preloaders from "../components/Loader/Preloaders";
import HomeNavbar from "../components/HomeComponents/HomeNavbar";
import HomeFooter from "../components/HomeComponents/HomeFooter";

// ============ Pages ============
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/Home/AboutPage";
import ServicesPage from "../pages/Home/ServicesPage";
import ContactPage from "../pages/Home/ContactPage";
import RegisterPage from "../pages/Home/RegisterPage";
import LoginPage from "../pages/Home/LoginPage";
import TermsConditions from "../components/HomeComponents/TermsConditions";
import PrivacyPolicy from "../components/HomeComponents/PrivacyPolicy";
import ErrorPage from "./ErrorPage";
import Bookings from "../pages/Admin/Bookings/Bookings";
import BookingCalender from "../pages/Admin/Bookings/BookingCalender";
import AllProducts from "../pages/Admin/AllProducts/AllProducts";
import ProductCategories from "../pages/Admin/AllProducts/ProductCategories";
import AllServices from "../pages/Admin/Services/AllServices";
import AllUserProfiles from "../pages/Admin/UserManagement/AllUserProfiles";
import UserTransactios from "../pages/Admin/Transactios/UserTransactios";
// import DeepLinkRedirect from "../pages/DeepLinkRedirect";
import Employees from '../pages/Admin/UserManagement/Employees';
import Banner from "../pages/Admin/Master/Banner";
import Notifications from '../pages/Admin/Master/Notifications';
import OffersCoupons from "../pages/Admin/Master/OffersCoupons";
import ReferEarn from "../pages/Admin/Master/ReferEarn";
import Testimonials from '../pages/Admin/Master/Testimonials';


import AddressPage from "../pages/Home/Profile/address";
import ProfilePage from "../pages/Home/Profile/account";
import CustomerSupport from "../pages/Home/Profile/customersupport";
import MyOrders from "../pages/Home/Profile/orders";
import ResetPasswordPage from "../pages/Home/ResetPasswordPage";
import AdminProfile from "../pages/Admin/UserProfile/UserProfile";


const ProjectRoutes = () => {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.userDetails);

    console.log("⚡️🤯 ~ ProjectRoutes.jsx ~ user:", user);
    // ============ Page Loader ============
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    // ============ Online/Offline Toast ============
    useEffect(() => {
        const updateNetworkStatus = () => {
            navigator.onLine
                ? toast.success("You are Online")
                : toast.error("You are Offline");
        };

        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        return () => {
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);
        };
    }, []);

    return (
        <div className="min-h-screen transition-all duration-300">
            {loading ? (
                <Preloaders />
            ) : (user?.role == "admin" || user?.role == "employee") ? (
                // ============ Logged in (Admin or Employee) ============
                <Sidebar>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/calender" element={<BookingCalender />} />
                        <Route path="/all-products" element={<AllProducts />} />

                        <Route path="/product-categories" element={<ProductCategories />} />
                        <Route path="/all-services" element={<AllServices />} />
                        <Route path="/all-employees" element={<Employees />} />
                        <Route path="/all-users" element={<AllUserProfiles />} />
                        <Route path="/user-transaction" element={<UserTransactios />} />
                        <Route path="/banner" element={<Banner />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/offersCoupons" element={<OffersCoupons />} />
                        <Route path="/referEarn" element={<ReferEarn />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/admin-profile" element={<AdminProfile />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Sidebar>
            ) : (
                // ============ Guest / Before Login ============
                <main className="min-h-screen w-full overflow-x-hidden">
                    <HomeNavbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        {/* <Route path="/actor/:id" element={<DeepLinkRedirect />} />
            <Route path="/casting/:id" element={<DeepLinkRedirect />} /> */}
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/terms-conditions" element={<TermsConditions />} />
                        <Route path="/profile/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/profile/customer-support" element={<CustomerSupport />} />

                        <Route path="/profile/address" element={<AddressPage />} />
                        <Route path="/password/reset/:token" element={<ResetPasswordPage />} />

                        <Route path="/profile/account" element={<ProfilePage />} />
                        <Route path="/profile/my-orders" element={<MyOrders />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                    <HomeFooter />
                </main>
            )}

            {/* Toaster Notifications */}
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default ProjectRoutes;
