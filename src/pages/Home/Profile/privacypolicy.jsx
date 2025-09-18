import React from "react";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";

// Temporary placeholder components
const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

const PrivacyPolicy = () => {
  return (
    <>
      <Private>
        <UserDashboard>
          <ProfileSidebar>
            <div className="max-w-3xl justify-self-left items-left">
              <h1 className="text-2xl font-medium text-left text-gray-800 mb-6 p-4">
                Privacy Policy
              </h1>

              <div className="p-8">
                <p className="text-lg text-gray-700 mb-6">
                  At [Your Company Name], we take your privacy seriously. This
                  Privacy Policy outlines the types of personal information we
                  collect and how we use, store, and protect it.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  We collect the following types of information when you use our
                  website or services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, etc.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information on how you interact
                    with our services, including pages visited, time spent on
                    each page, etc.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We may use cookies to improve your
                    experience on our website.
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  The information we collect is used for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>To provide and improve our services</li>
                  <li>
                    To communicate with you, including sending promotional
                    emails
                  </li>
                  <li>To comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                  3. How We Protect Your Information
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  We implement security measures to protect your personal
                  information. However, no method of transmission over the
                  internet is 100% secure, so we cannot guarantee absolute
                  security.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                  4. Sharing Your Information
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to
                  third parties. However, we may share it in the following
                  cases:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>If required by law or to protect our legal rights</li>
                  <li>
                    With trusted service providers who help us deliver our
                    services
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                  5. Your Rights
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Depending on your jurisdiction, you may have the right to
                  access, correct, or delete your personal information. You can
                  also withdraw your consent for processing at any time.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                  6. Changes to This Privacy Policy
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page, and we will notify you of
                  any significant changes.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                  7. Contact Us
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at [Your Email Address].
                </p>

                <p className="text-center text-sm text-gray-500 italic">
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
