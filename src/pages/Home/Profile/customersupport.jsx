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
                            <h2 className="text-xl font-medium text-black font-tbLex">Customer Care</h2>

                            {/* Container */}
                            <div className="flex flex-col py-10 px-4 sm:px-8 lg:px-16 lg:flex-row items-center lg:items-center justify-center gap-12 lg:gap-20">
                                {/* Left Image */}
                                <div className="w-full max-w-sm flex justify-center">
                                    <img
                                        src={customercare}
                                        alt="Customer Support"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>

                                <div className=" space-y-10 w-full">
                                    <div className="flex items-center gap-4">
                                        <PhoneCall className="w-8 h-8 text-purple-600 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <p className="font-medium font-tbLex tracking-tight text-black">
                                                PHONE SUPPORT
                                            </p>
                                            <p className="text-gray-600 text-sm sm:text-base font-tbPop tracking-tight">
                                                +91-9619793852
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <FaWhatsapp className="w-8 h-8 text-green-600 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <p className="font-medium font-tbLex tracking-tight text-black">
                                                WHATSAPP SUPPORT
                                            </p>
                                            <p className="text-gray-600 text-sm sm:text-base font-tbPop tracking-tight">
                                                +91-9619793852
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <MdEmail className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <p className="font-medium font-tbLex tracking-tight text-black">
                                                E-MAIL SUPPORT
                                            </p>
                                            <p className="text-gray-600 text-sm sm:text-base break-words font-tbPop tracking-tight">
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
