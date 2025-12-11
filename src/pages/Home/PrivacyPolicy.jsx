import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles = {
    wrapper: "flex justify-center w-full bg-white pt-28 md:pt-32 pb-10 px-4 sm:px-6",
    container:
      "max-w-4xl w-full bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-10 overflow-y-auto",
    mainHeading: "font-semibold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-p text-center",
    mainHeadingWithMargin:
      "font-semibold text-2xl sm:text-3xl mb-6 mt-10 text-p text-center",
    subHeading: "text-lg font-semibold mt-8 mb-3 text-gray-800",
    subSubHeading: "text-base font-semibold mt-4 mb-2 text-gray-800",
    paragraph: "text-gray-700 mb-4 text-base leading-relaxed",
    list: "list-disc pl-6 space-y-2 mb-4 text-gray-700 text-base",
    listSpaced: "list-disc pl-6 space-y-3 text-gray-700",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.mainHeading}>
          <svg className="inline-block h-[0.9em] w-auto mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#a78bfa" />
            <path d="M14 2V8H20" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 13H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 17H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 9H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          PRIVACY POLICY
        </h2>
        <p className="text-center text-gray-600 mb-6">Last Updated: January 2025</p>

        <p className={styles.paragraph}>
          SoulPlan values your privacy. This policy explains how we collect, use, store, and protect your data.
        </p>

        <h3 className={styles.subHeading}>1. Information We Collect</h3>

        <h4 className={styles.subSubHeading}>a. Personal Information</h4>
        <ul className={styles.list}>
          <li>Full name</li>
          <li>Email address</li>
          <li>Mobile number</li>
          <li>Billing information</li>
          <li>Location (country for currency and astrologer allocation)</li>
          <li>Gender (if provided)</li>
          <li>Date of birth & birth details (for astrology services)</li>
        </ul>

        <h4 className={styles.subSubHeading}>b. Technical Information</h4>
        <ul className={styles.list}>
          <li>IP address</li>
          <li>Device type</li>
          <li>App usage statistics</li>
          <li>Payment transactions (processed via Razorpay)</li>
        </ul>

        <h4 className={styles.subSubHeading}>c. Session Information</h4>
        <ul className={styles.list}>
          <li>Appointment details</li>
          <li>Astrologer assigned</li>
          <li>Notes voluntarily shared during booking</li>
        </ul>
        <p className={styles.paragraph}>
          We do not record Zoom sessions unless explicitly stated and agreed upon.
        </p>

        <h3 className={styles.subHeading}>2. How We Use Your Information</h3>
        <p className={styles.paragraph}>We use your data to:</p>
        <ul className={styles.list}>
          <li>Provide booked services</li>
          <li>Process payments</li>
          <li>Improve app/website experience</li>
          <li>Send confirmations, reminders & updates</li>
          <li>Customer support & dispute handling</li>
          <li>Compliance with legal obligations</li>
        </ul>

        <h3 className={styles.subHeading}>3. Data Sharing</h3>
        <p className={styles.paragraph}>
          <strong>We DO NOT sell your data.</strong> We may share necessary information only with:
        </p>
        <ul className={styles.list}>
          <li>Razorpay (payments)</li>
          <li>Astrologers providing your service</li>
          <li>Technical partners ensuring Platform functionality</li>
          <li>Legal authorities (only if required)</li>
        </ul>

        <h3 className={styles.subHeading}>4. Data Security</h3>
        <p className={styles.paragraph}>
          We implement access controls and secure storage protocols to protect your data.
        </p>

        <h3 className={styles.subHeading}>5. User Rights</h3>
        <p className={styles.paragraph}>You have the right to:</p>
        <ul className={styles.list}>
          <li>Access your data</li>
          <li>Request correction of inaccuracies</li>
          <li>Request deletion of your account</li>
          <li>Withdraw consent</li>
          <li>Request information on data usage</li>
        </ul>
        <p className={styles.paragraph}>
          Contact: <a href="mailto:support@soulplan.net" className="text-blue-600 underline">support@soulplan.net</a>
        </p>

        <h3 className={styles.subHeading}>6. Cookies & Tracking</h3>
        <p className={styles.paragraph}>
          We use cookies to improve user experience, analyze traffic, and store preferences.
          Users may disable cookies, but some features may not work properly.
        </p>

        <h3 className={styles.subHeading}>7. Children's Privacy</h3>
        <p className={styles.paragraph}>
          We do not knowingly serve or collect data from users under 18 years of age.
        </p>

        <h3 className={styles.subHeading}>8. Changes to Policy</h3>
        <p className={styles.paragraph}>
          We may update this Privacy Policy anytime. Users will be notified on the Platform.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
