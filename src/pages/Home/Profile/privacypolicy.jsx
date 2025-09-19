import React from "react";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

const PrivacyPolicy = () => {
    return (
        <>
            <Private>
                <UserDashboard>
                    <ProfileSidebar>
                        <div className="bg-white">
                            <h1 className="text-lg font-medium text-center text-gray-800  p-4 font-tbLex sm:text-left">
                                Privacy Policy
                            </h1>

                            <div className="sm:p-8">
                                <p className="text-md text-gray-700 mb-6 font-tbPop">
                                    At AstroMax, we take your privacy seriously. This
                                    Privacy Policy outlines the types of personal information we
                                    collect and how we use, store, and protect it.
                                </p>

                                <h2 className="text-lg font-medium text-gray-800 mb-4 font-tbLex">
                                    1. Information We Collect
                                </h2>
                                <p className="text-lg text-gray-700 mb-4 font-tbPop">
                                    We collect the following types of information when you use our
                                    website or services:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
                                    <li>
                                        <strong className="font-tbLex">Personal Information:</strong> Name, email address,
                                        phone number, etc.
                                    </li>
                                    <li>
                                        <strong className="font-tbLex">Usage Data:</strong> Information on how you interact
                                        with our services, including pages visited, time spent on
                                        each page, etc.
                                    </li>
                                    <li>
                                        <strong className="font-tbLex">Cookies:</strong> We may use cookies to improve your
                                        experience on our website.
                                    </li>
                                </ul>

                                <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
                                    2. How We Use Your Information
                                </h2>
                                <p className="text-lg text-gray-700 mb-4 font-tbPop">
                                    The information we collect is used for the following purposes:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
                                    <li>To provide and improve our services</li>
                                    <li>
                                        To communicate with you, including sending promotional
                                        emails
                                    </li>
                                    <li>To comply with legal obligations</li>
                                </ul>

                                <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
                                    3. How We Protect Your Information
                                </h2>
                                <p className="text-lg text-gray-700 mb-4 font-tbPop">
                                    We implement security measures to protect your personal
                                    information. However, no method of transmission over the
                                    internet is 100% secure, so we cannot guarantee absolute
                                    security.
                                </p>

                                <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
                                    4. Sharing Your Information
                                </h2>
                                <p className="text-lg text-gray-700 mb-4 font-tbPop">
                                    We do not sell, trade, or rent your personal information to
                                    third parties. However, we may share it in the following
                                    cases:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
                                    <li>If required by law or to protect our legal rights</li>
                                    <li>
                                        With trusted service providers who help us deliver our
                                        services
                                    </li>
                                </ul>

                                <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
                                    5. Your Rights
                                </h2>
                                <p className="text-lg text-gray-700 mb-4 font-tbPop">
                                    Depending on your jurisdiction, you may have the right to
                                    access, correct, or delete your personal information. You can
                                    also withdraw your consent for processing at any time.
                                </p>

                                <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
                                    6. Changes to This Privacy Policy
                                </h2>
                                <p className="text-lg text-gray-700 mb-4 font-tbPop">
                                    We may update this Privacy Policy from time to time. Any
                                    changes will be posted on this page, and we will notify you of
                                    any significant changes.
                                </p>

                                <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
                                    7. Contact Us
                                </h2>
                                <p className="text-lg text-gray-700 mb-6 font-tbPop">
                                    If you have any questions or concerns about this Privacy
                                    Policy, please contact us at [Your Email Address].
                                </p>

                                <p className="text-center text-sm text-gray-500 italic font-tbPop">
                                    Last updated: [Date]
                                </p>
                            </div>
                        </div>
                    </ProfileSidebar>
                </UserDashboard>
            </Private>
        </>
    );
};

export default PrivacyPolicy;
