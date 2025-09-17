import { PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import customercare from "../../../assets/cutomer-care.png";

// Temporary placeholder components
const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

export default function CustomerSupport() {
  return (
    <>
      <Private>
        <UserDashboard>
          <ProfileSidebar>
            <div className="bg-white ">
              {/* Title */}
              <h2 className="text-2xl py-4 font-m text-gray-800 mb-10 text-left font-medium ">
                Customer Care
              </h2>

              {/* Container */}
              <div className="flex flex-col py-10 px-4 sm:px-8 lg:px-16 lg:flex-row items-center lg:items-center justify-center gap-12 lg:gap-20">
                {/* Left Image */}
                <div className="w-full max-w-sm flex justify-center">
                  <img
                    src={customercare} // 👈 replace with your image path
                    alt="Customer Support"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Right Contact Info */}
                <div className="flex flex-col gap-8 w-full max-w-md">
                  {/* Phone Support */}
                  <div className="flex items-center gap-4">
                    <PhoneCall className="w-8 h-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        PHONE SUPPORT
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +91-9619793852
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp Support */}
                  <div className="flex items-center gap-4">
                    <FaWhatsapp className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        WHATSAPP SUPPORT
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +91-9619793852
                      </p>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="flex items-center gap-4">
                    <MdEmail className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        E-MAIL SUPPORT
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base break-words">
                        nishaastrologer@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ProfileSidebar>
        </UserDashboard>
      </Private>
    </>
  );
}
