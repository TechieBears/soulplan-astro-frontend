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
import EmployeeDashboard from "../pages/Employee/Dashboard/EmployeeDashboard";
import UserProfile from "../pages/Admin/UserProfile/UserProfile";
import AllUserProfiles from "../pages/Admin/AllUserProfiles/AllUserProfiles";
import AdminContactUs from "../pages/Admin/ContactUs/AdminContactUs";

import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/Home/AboutPage";
import ContactPage from "../pages/Home/ContactPage";
import RegisterPage from "../pages/Home/RegisterPage";
import LoginPage from "../pages/Home/LoginPage";
import TermsConditions from "../components/HomeComponents/TermsConditions";
import PrivacyPolicy from "../components/HomeComponents/PrivacyPolicy";
import ErrorPage from "./ErrorPage";
// import DeepLinkRedirect from "../pages/DeepLinkRedirect";


import AddressPage from "../pages/Home/Profile/address";
// import  from "../pages/Home/Profile/address";
// import address from "../pages/Home/Profile/address";


const ProjectRoutes = () => {
  const [loading, setLoading] = useState(true);

  const login = useSelector((state) => state.user.isLogged);
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
      ) : login ? (
        // ============ Logged in (Admin or Employee) ============
        user?.user?.baseRole === "admin" ? (
          <Sidebar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin-actors" element={<AllUserProfiles />} />
              <Route path="/enquiries" element={<AdminContactUs />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Sidebar>
        ) : (
          <Sidebar>
            <Routes>
              <Route path="/" element={<EmployeeDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Sidebar>
        )
      ) : (
        // ============ Guest / Before Login ============
        <main className="min-h-screen w-full overflow-x-hidden">
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
            <Route path="/profile/address" element={<AddressPage />} />
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
