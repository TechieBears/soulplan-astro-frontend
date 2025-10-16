import { useEffect } from "react";

const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="p-8 pt-20">
        <h1 className="text-lg font-medium text-center text-gray-800  p-4 font-tbLex sm:text-center">
          Privacy Policy
        </h1>

        <div className="sm:p-8">
          {/* <p className="text-md text-gray-700 mb-6 font-tbPop">
            At AstroMax, we take your privacy seriously. This Privacy Policy
            outlines the types of personal information we collect and how we
            use, store, and protect it.
          </p> */}
          <h2 className="text-lg font-medium text-gray-800 mb-4 font-tbLex">
            1. Information We Collect
          </h2>
          <p className="text-lg text-gray-700 mb-4 font-tbPop">
            We collect personal information that you provide to us directly,
            such as:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
            <li>
              {/* <strong className="font-tbLex">Personal Information:</strong>{" "} */}
              Name, email address, phone number, etc.
            </li>
            <li>
              {/* <strong className="font-tbLex">Usage Data:</strong> */}
              Information on how you interact with our services, including pages
              visited, time spent on each page, etc.
            </li>
            <li>
              {/* <strong className="font-tbLex">Cookies:</strong>  */}
              Payment information processed through secure third-party gateways
            </li>
          </ul>
          <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
            2. Use of Information
          </h2>
          <p className="text-lg text-gray-700 mb-4 font-tbPop">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
            <li>Provide and manage our services</li>
            <li>Communicate with you regarding bookings and updates</li>
            <li>Improve our website and services</li>
          </ul>
          <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
            3. Cookies and Tracking
          </h2>
          <p className="text-lg text-gray-700 mb-4 font-tbPop">
            We use cookies to enhance user experience and analyze website
            traffic. You can manage cookie preferences through your browser
            settings.
          </p>
          <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
            4. Data Security
          </h2>
          <p className="text-lg text-gray-700 mb-4 font-tbPop">
            We implement reasonable security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure.
          </p>
          <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
            5. Sharing of Information
          </h2>
          <p className="text-lg text-gray-700 mb-4 font-tbPop">
            We do not sell or rent your personal information. We may share your
            information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
            <li>Service providers who assist in delivering our services</li>
            <li>Legal authorities if required by law.</li>
          </ul>
          <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
            6. You have the right to:
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
            <li>Access, correct, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
          </ul>{" "}
          <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4 font-tbLex">
            7. Changes to Privacy Policy
          </h2>
          <p className="text-lg text-gray-700 mb-4 font-tbPop">
            We may update this Privacy Policy periodically. Users will be
            notified of significant changes.
          </p>
          <h2 className="text-lg font-medium text-gray-800  mb-4 font-tbLex">
            8. International Users
          </h2>
          <p className="text-lg text-gray-700 mb-6 font-tbPop">
            If you are accessing our services from outside [Insert Country],
            your information may be transferred to and processed in [Insert
            Country].
          </p>
          <h2 className="text-lg font-medium text-gray-800  mb-4 font-tbLex">
            8. Contact Us
          </h2>
          <p className="text-lg text-gray-700 mb-6 font-tbPop">
            For questions or concerns regarding this Privacy Policy, please
            contact us at:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-tbPop">
            <li>Email: [Insert Email Address]</li>
            <li>
              Phone: [Insert Phone Number]
              <li>Address: [Insert Physical Address]</li>
            </li>
          </ul>{" "}
          <p className="text-center text-sm text-gray-500 italic font-tbPop">
            Last updated: [Date]
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
