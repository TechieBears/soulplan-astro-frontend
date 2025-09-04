import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import UserProfile from '../pages/Admin/UserProfile/UserProfile';
import toast, { Toaster } from 'react-hot-toast';
import HomePage from '../pages/Home/HomePage';
import RegisterPage from '../pages/Home/RegisterPage';
import HomeNavbar from '../components/HomeComponents/HomeNavbar';
import ErrorPage from './ErrorPage';
import HomeFooter from '../components/HomeComponents/HomeFooter';
import AllUserProfiles from '../pages/Admin/AllUserProfiles/AllUserProfiles';
import AboutPage from '../pages/Home/AboutPage';
import ContactPage from '../pages/Home/ContactPage';
import LoginPage from '../pages/Home/LoginPage';
import AdminContactUs from '../pages/Admin/ContactUs/AdminContactUs';
import Preloaders from '../components/Loader/Preloaders';
import TermsConditions from '../components/HomeComponents/TermsConditions';
import PrivacyPolicy from '../components/HomeComponents/PrivacyPolicy';
import DeepLinkRedirect from '../pages/DeepLinkRedirect';
import EmployeeDashboard from '../pages/Employee/Dashboard/EmployeeDashboard';

const ProjectRoutes = () => {
    const [loading, setLoading] = useState(true);
    const login = useSelector(state => state.user.isLogged)
    const user = useSelector(state => state.user.userDetails)
    console.log("⚡️🤯 ~ ProjectRoutes.jsx:32 ~ ProjectRoutes ~ user:", user)

    // ================ loading ================
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2800);
    }, []);

    useEffect(() => {
        const updateNetworkStatus = () => {
            navigator.onLine ? toast.success('You are Online') : toast.error('You are Offline')
        };

        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);

        return () => {
            window.removeEventListener('online', updateNetworkStatus);
            window.removeEventListener('offline', updateNetworkStatus);
        };
    }, []);

    return (
        <div className='min-h-screen transition-all duration-300'>
            {!login ?
                <>
                    {loading ?
                        <Preloaders /> :
                        user?.user?.baseRole == "admin" ?
                            <Sidebar>
                                <Routes>
                                    {/* ============ Admin Routes ============ */}
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/admin-actors" element={<AllUserProfiles />} />
                                    <Route path="/enquiries" element={<AdminContactUs />} />
                                    <Route path="/profile" element={<UserProfile />} />
                                    <Route path='*' element={<ErrorPage />} />
                                </Routes>
                            </Sidebar> :
                            <>
                                <Sidebar>
                                    <Routes>
                                        {/* ============ Admin Routes ============ */}
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/admin-actors" element={<AllUserProfiles />} />
                                        <Route path="/enquiries" element={<AdminContactUs />} />
                                        <Route path="/profile" element={<UserProfile />} />
                                        <Route path='*' element={<ErrorPage />} />
                                    </Routes>
                                </Sidebar>
                            </>

                    }
                </>
                :
                <>

                    {/* ============ User before Login Routes (Guest Login)============ */}

                    {loading ?
                        <Preloaders /> : <main className='min-h-screen w-full  overflow-x-hidden'>
                            <HomeNavbar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                {/* <Route path="/actor/:id" element={<DeepLinkRedirect />} />
                                <Route path="/casting/:id" element={<DeepLinkRedirect />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/terms-conditions" element={<TermsConditions />} />
                                <Route path="/privacy-policy" element={< PrivacyPolicy />} />
                                <Route path='*' element={<ErrorPage />} /> */}
                            </Routes>
                            <HomeFooter />
                        </main>
                    }
                </>
            }

            {/* ============ Toaster Main Container ============ */}

            <Toaster position="top-right" reverseOrder={false} />
        </div>

    )
}

export default ProjectRoutes
