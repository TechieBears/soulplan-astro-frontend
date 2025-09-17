import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoggedUser,
  setLoggedUserDetails,
} from "../../redux/Slices/loginSlice";
import toast from "react-hot-toast";
import { Profile } from "iconsax-reactjs";
import { formBtn3 } from "../../utils/CustomClass";

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
      // TODO: Implement actual logout API call
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
    <div className="bg-[#FFF9EF]">
      <div className="container justify-self-center py-12 mt-12 px-4 mt-20 ">
        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="hidden lg:flex lg:w-1/4 bg-white border rounded-2xl flex-col justify-between h-full min-h-[800px]">
              <div>
                <h2 className="text-xl lg:text-2xl p-4  font-semibold text-[#1d2e36] mb-6">
                  My Profile
                </h2>

                <nav className="flex flex-col">
                  {navItems.map((item, index) => (
                    <React.Fragment key={item.label}>
                      {item.path.startsWith("/") ? (
                        <Link
                          to={item.path}
                          className={`flex items-center justify-between font-medium border border-gray-100  transition ${
                            isActive(item.path)
                              ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white px-3 py-4"
                              : "px-3 py-4 text-[#1d2e36]"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {item.label}
                          </span>
                          <Icon
                            icon="material-symbols-light:keyboard-arrow-right"
                            width={24}
                            height={24}
                          />
                        </Link>
                      ) : (
                        <button
                          className={`flex items-center justify-between px-3 py-3 rounded-lg font-medium transition ${
                            isActive(item.path)
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
              <div className="mt-20 space-y-4 p-4  border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center py-3  border border-black font-semibold rounded-lg"
                >
                  Logout
                  <Icon
                    icon="uiw:poweroff"
                    className="ml-2"
                    width={18}
                    height={18}
                  />
                </button>

                <button
                  disabled
                  className="w-full flex items-center bg-[#FB2C36] justify-center py-3 text-white font-semibold rounded-lg"
                >
                  Delete Account
                  <Icon
                    icon="material-symbols:delete-outline"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </button>
              </div>
              {/* )} */}
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white rounded-2xl p-4 lg:p-6 border border-[#CAD5E2]">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
