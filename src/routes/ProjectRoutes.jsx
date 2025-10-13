import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

// ============ Components ============
import Sidebar from "../components/Sidebar/Sidebar";
import Preloaders from "../components/Loader/Preloaders";
import HomeNavbar from "../components/HomeComponents/HomeNavbar";
import HomeFooter from "../components/HomeComponents/HomeFooter";
import ProtectedRoute from "../components/ProtectedRoute";

// ============ Pages ============
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/Home/AboutPage";
import ServicesPage from "../pages/Home/ServicesPage";
import ContactPage from "../pages/Home/ContactPage";
import RegisterPage from "../pages/Home/RegisterPage";
import LoginPage from "../pages/Home/LoginPage";
import TermsConditions from "../components/HomeComponents/TermsConditions";
import PrivacyPolicy from "../pages/Home/PrivacyPolicy";
import ErrorPage from "./ErrorPage";
import BookingCalender from "../pages/Admin/Bookings/BookingCalender";
import AllProducts from "../pages/Admin/AllProducts/AllProducts";
import ProductCategories from "../pages/Admin/AllProducts/ProductCategories";
import AllServices from "../pages/Admin/Services/AllServices";
import AllUserProfiles from "../pages/Admin/UserManagement/AllUserProfiles";
import UserTransactios from "../pages/Admin/Transactios/UserTransactios";
import Employees from "../pages/Admin/UserManagement/Employees";
import Banner from "../pages/Admin/Master/Banner";
import Notifications from "../pages/Admin/Master/Notifications";
import OffersCoupons from "../pages/Admin/Master/OffersCoupons";
import ReferEarn from "../pages/Admin/Master/ReferEarn";
import Testimonials from "../pages/Admin/Master/Testimonials";
import AddressPage from "../pages/Home/Profile/address";
import ProfilePage from "../pages/Home/Profile/account";
import CustomerSupport from "../pages/Home/Profile/customersupport";
import MyOrders from "../pages/Home/Profile/orders";
import ResetPasswordPage from "../pages/Home/ResetPasswordPage";
import ProductsPage from "../pages/Home/Profile/productspage";
import ProductDetail from "../pages/Home/ProductDetail";
import Cart from "../pages/Home/Cart";
import PaymentSuccess from "../pages/Home/PaymentSuccess";
import ServiceSidebar from "../components/Sidebar/ServiceSidebar";
import BookingPage from "../pages/Home/BookingPage";
import AdminProfile from "../pages/Admin/UserProfile/UserProfile";
import ServicesCategories from "../pages/Admin/Services/ServicesCategories";
import ProductBookings from "../pages/Admin/Bookings/ProductBookings";
import ServiceBookings from "../pages/Admin/Bookings/ServiceBookings";
import CustomerFeedback from "../pages/Admin/CustomerFeedback/CustomerFeedback";
import VenueCalendar from '../pages/Admin/Bookings/AdminBookingsCalender';
import { Whatsapp } from "iconsax-reactjs";
import BuyNowPage from "../pages/Home/BuyNowPage";
import Reviews from "../pages/Admin/Master/Reviews";

const ProjectRoutes = () => {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.userDetails);
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
            ) : user?.role == "admin" || user?.role == "employee" || user?.role == "astrologer" ? (
                // ============ Logged in (Admin or Employee) ============
                <Sidebar>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/calender" element={<BookingCalender />} />
                        <Route path="/product-bookings" element={<ProductBookings />} />
                        <Route path="/service-bookings" element={<ServiceBookings />} />
                        <Route path="/all-products" element={<AllProducts />} />
                        <Route path="/product-categories" element={<ProductCategories />} />
                        <Route path="/admin-calender" element={<VenueCalendar />} />
                        <Route path="/all-services" element={<AllServices />} />
                        <Route
                            path="/service-categories"
                            element={<ServicesCategories />}
                        />
                        <Route path="/all-employees" element={<Employees />} />
                        <Route path="/all-users" element={<AllUserProfiles />} />
                        <Route path="/user-transaction" element={<UserTransactios />} />
                        <Route path="/banner" element={<Banner />} />
                        <Route path="/customerFeedback" element={<CustomerFeedback />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/offersCoupons" element={<OffersCoupons />} />
                        <Route path="/referEarn" element={<ReferEarn />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/admin-profile" element={<AdminProfile />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Sidebar>
            ) : (
                // ============ Guest / Before Login ============
                <main className="min-h-screen w-full overflow-x-hidden max-lg:px-5">
                    <HomeNavbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        {/* <Route path="/actor/:id" element={<DeepLinkRedirect />} />
            <Route path="/casting/:id" element={<DeepLinkRedirect />} /> */}
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/terms-conditions" element={<TermsConditions />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route
                            path="/profile/customer-support"
                            element={
                                <ProtectedRoute>
                                    <CustomerSupport />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile/address"
                            element={
                                <ProtectedRoute>
                                    <AddressPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/password/reset/:token"
                            element={<ResetPasswordPage />}
                        />
                        <Route path="/password/reset/:token" element={<ResetPasswordPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/services/:id" element={<ServiceSidebar />} />
                        <Route
                            path="/booking"
                            element={
                                <ProtectedRoute>
                                    <BookingPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile/account"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile/my-orders"
                            element={
                                <ProtectedRoute>
                                    <MyOrders />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/buy-now"
                            element={
                                <ProtectedRoute>
                                    <BuyNowPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/payment-success"
                            element={
                                <ProtectedRoute>
                                    <PaymentSuccess />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                    <HomeFooter />
                    <a
                        href={`https://wa.me/${8693000900}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-lg transition-all duration-300"
                    >
                        <Whatsapp size={30} />
                    </a>
                </main>
            )}

            {/* Toaster Notifications */}
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default ProjectRoutes;
