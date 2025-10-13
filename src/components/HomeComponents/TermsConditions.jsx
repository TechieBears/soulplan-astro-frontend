const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 mt-20 md:mt-28 font-tbPop">
      {/* Animated background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-indigo-100 opacity-20 blur-3xl animate-float1"></div>
        <div className="absolute top-2/3 right-1/5 w-56 h-56 rounded-full bg-purple-100 opacity-20 blur-3xl animate-float2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-52 h-52 rounded-full bg-blue-100 opacity-20 blur-3xl animate-float3"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Elegant header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-primary leading-tight mb-3 font-tbLex tracking-tight">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-gray-600 max-w-xl font-normal font-tbPop">
            Please review our terms of service carefully before using our
            platform
          </p>
        </div>

        {/* Compact content container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xs relative">
          <div className="px-5 py-6 sm:px-6">
            <div className="space-y-10 px-5 py-6 sm:px-6">
              {/* 1. Introduction */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  1. Introduction
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <p>
                    Welcome to SoulPlan.net, operated by SoulPlan ("we," "us,"
                    or "our"). By accessing or using our website and services,
                    you agree to comply with these Terms and Conditions.
                  </p>
                </div>
              </div>

              {/* 2. Services Provided */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  2. Services Provided
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <p>
                    We offer astrology, tarot, energy healing, and related
                    spiritual guidance services. All sessions are conducted by
                    certified professionals and are intended for informational
                    and entertainment purposes. Our services are not a
                    substitute for professional advice in health, legal,
                    financial, or medical matters.
                  </p>
                </div>
              </div>

              {/* 3. User Responsibilities */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  3. User Responsibilities
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Provide accurate and complete information when booking
                      services.
                    </li>
                    <li>
                      Use our services for lawful purposes and in accordance
                      with these Terms.
                    </li>
                    <li>
                      Respect the intellectual property rights associated with
                      our content.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4. Payment and Refunds */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  4. Payment and Refunds
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>All services are payable in advance.</li>
                    <li>
                      Refunds are considered on a case-by-case basis and are
                      subject to our Refund Policy.
                    </li>
                    <li>
                      We reserve the right to modify service fees at any time.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5. Intellectual Property */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  5. Intellectual Property
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <p>
                    All content on our website, including text, images, and
                    logos, is protected by copyright and trademark laws.
                    Unauthorized use is prohibited.
                  </p>
                </div>
              </div>

              {/* 6. Disclaimers */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  6. Disclaimers
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Our services are based on spiritual and metaphysical
                      principles and are not guaranteed to produce specific
                      outcomes.
                    </li>
                    <li>
                      We do not assume responsibility for any decisions made
                      based on our services.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 7. Limitation of Liability */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  7. Limitation of Liability
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <p>
                    To the fullest extent permitted by law, we shall not be
                    liable for any indirect, incidental, or consequential
                    damages arising from your use of our services.
                  </p>
                </div>
              </div>

              {/* 8. Privacy */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  8. Privacy
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <p>
                    Your use of our services constitutes acceptance of our{" "}
                    <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* 9. Governing Law */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  9. Governing Law
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <p>
                    These Terms shall be governed by the laws of{" "}
                    <span className="italic text-gray-800">
                      [Insert Jurisdiction]
                    </span>
                    , without regard to its conflict of law principles.
                  </p>
                </div>
              </div>

              {/* 10. Changes to Terms */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 font-tbPop">
                  10. Changes to Terms
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm font-tbPop">
                  <p>
                    We reserve the right to update these Terms at any time.
                    Users will be notified of significant changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal footer */}
        <div className="mt-8 text-end relative">
          <div className="inline-flex items-center text-xs text-gray-500 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-xs border border-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(10px, 10px) rotate(1deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-10px, 10px) rotate(-1deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(5px, -5px) rotate(0.5deg);
          }
        }
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const Icon = ({ name, className }) => {
  const icons = {
    "document-text": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    ),
    collection: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
      </svg>
    ),
    "lock-closed": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    upload: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
    "shield-exclamation": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
          clipRule="evenodd"
        />
      </svg>
    ),
    "currency-dollar": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return icons[name] || null;
};

const Section = ({ title, children, icon, gradient }) => {
  return (
    <div className="group">
      <div className="flex items-start">
        <div
          className={`flex-shrink-0 mr-4 mt-0.5 p-2.5 rounded-lg bg-gradient-to-br ${gradient} shadow-sm group-hover:shadow transition-shadow duration-200`}
        >
          <Icon name={icon} className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold font-tbLex text-gray-900 mb-2">
            {title}
          </h3>
          <div className="text-sm font-tbPop">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
