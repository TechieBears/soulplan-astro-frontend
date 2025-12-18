import { useEffect } from "react";

const TermsConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const styles = {
        wrapper: "flex justify-center w-full bg-white pt-20 md:pt-32 pb-10 px-4 sm:px-6",
        container: "max-w-4xl w-full bg-white rounded-lg shadow-md p-6 sm:p-10 overflow-y-auto",
        mainHeading: "font-semibold text-2xl sm:text-3xl mb-6 text-p text-center",
        subHeading: "text-lg font-semibold mt-8 mb-3 text-gray-800",
        subSubHeading: "text-base font-semibold mt-4 mb-2 text-gray-800",
        paragraph: "text-gray-700 mb-4 text-base leading-relaxed",
        list: "list-disc pl-6 space-y-2 mb-4 text-gray-700 text-base",
        companyInfo: "bg-purple-50 border-l-4 border-purple-500 p-4 my-4 rounded-r-lg",
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.mainHeading}>
                    <svg className="inline-block h-[1em] w-auto mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#a78bfa" />
                        <path d="M14 2V8H20" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 13H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M8 17H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M8 9H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    TERMS & CONDITIONS
                </h2>

                <p className={styles.paragraph}>
                    Welcome to SoulPlan, a service provided by YUJAINFOTECH CONNECTING TO EXPLORE PRIVATE LIMITED ("Company", "We", "Us", "Our"). By accessing or using our website (www.soulplan.net) or mobile applications (Android and iOS) ("Platform"), you agree to abide by the following Terms & Conditions.
                </p>
                <p className={styles.paragraph}>
                    If you do not agree with these Terms, please do not access or use our services.
                </p>

                <h3 className={styles.subHeading}>1. Company Information</h3>
                <div className={styles.companyInfo}>
                    <p className="font-semibold mb-2">YUJAINFOTECH CONNECTING TO EXPLORE PRIVATE LIMITED</p>
                    <p className="text-sm mb-1">A/3004, ROSA MONTANA, VASANT OSCAR,</p>
                    <p className="text-sm mb-1">Mulund–West, Mumbai – 400080, Maharashtra, India</p>
                    <p className="text-sm mb-1">Support Email: <a href="mailto:support@soulplan.net" className="text-blue-600 underline">support@soulplan.net</a></p>
                    <p className="text-sm">Support Contact: <a href="tel:+919326511639" className="text-blue-600 underline">+91 9326511639</a></p>
                </div>

                <h3 className={styles.subHeading}>2. Description of Services</h3>
                <p className={styles.paragraph}>SoulPlan provides:</p>
                <ul className={styles.list}>
                    <li>Online astrology, tarot, healing, and guidance sessions conducted via Zoom.</li>
                    <li>Offline consultations at astrologers'/healers' physical locations.</li>
                    <li>Scheduling, rescheduling, and booking services through the Platform.</li>
                    <li>Availability display for each astrologer with pricing in INR (India users) and USD (International users).</li>
                    <li>Secure payments via Razorpay.</li>
                </ul>
                <p className={styles.paragraph}>
                    All guidance, insights, predictions, or consultations offered on the Platform are subjective interpretations and should not replace professional advice (e.g., medical, legal, financial).
                </p>

                <h3 className={styles.subHeading}>3. User Eligibility</h3>
                <ul className={styles.list}>
                    <li>You must be 18 years or older to use this Platform.</li>
                    <li>By booking a service, you confirm that all information you provide is accurate and true.</li>
                </ul>

                <h3 className={styles.subHeading}>4. Account Creation</h3>
                <p className={styles.paragraph}>To use certain features, you may be required to create an account. You agree to:</p>
                <ul className={styles.list}>
                    <li>Maintain confidentiality of login details</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Take responsibility for all activity under your account</li>
                </ul>

                <h3 className={styles.subHeading}>5. Booking & Payments</h3>
                <ul className={styles.list}>
                    <li>Users in India will be charged in INR.</li>
                    <li>Users outside India will be charged in USD.</li>
                    <li>All payments are processed securely through Razorpay.</li>
                    <li>Payment includes session charges and applicable taxes.</li>
                    <li>Once a booking is confirmed, you will receive a confirmation email and/or notification via the Platform.</li>
                </ul>

                <h3 className={styles.subHeading}>6. Rescheduling Policy</h3>
                <ul className={styles.list}>
                    <li>Free rescheduling allowed until 48 hours before the session time.</li>
                    <li>Rescheduling within 48 hours will incur additional charges as applicable.</li>
                    <li>SoulPlan reserves the right to modify rescheduling charges at any time.</li>
                </ul>

                <h3 className={styles.subHeading}>7. Cancellation & Refunds</h3>
                <ul className={styles.list}>
                    <li>Full refund for cancellations made before 72 hours of the scheduled session.</li>
                    <li>Cancellations within 72 hours will incur applicable cancellation charges.</li>
                    <li>Refund timelines depend on payment gateway processing and may take 7–10 working days.</li>
                    <li>SoulPlan may update these charges periodically.</li>
                </ul>

                <h3 className={styles.subHeading}>8. Service Delivery</h3>
                <ul className={styles.list}>
                    <li>Online consultations are conducted via Zoom.</li>
                    <li>Offline consultations occur at the astrologer's provided address.</li>
                    <li>It is the customer's responsibility to join the session on time.</li>
                    <li>Failure to attend a session without prior notice will be considered a no-show, with no refund.</li>
                </ul>

                <h3 className={styles.subHeading}>9. User Conduct</h3>
                <p className={styles.paragraph}>You agree not to:</p>
                <ul className={styles.list}>
                    <li>Misuse or disrupt Platform services</li>
                    <li>Abusively communicate with astrologers or staff</li>
                    <li>Use the platform for unlawful purposes</li>
                    <li>Record, redistribute, or misuse session content without permission</li>
                </ul>

                <h3 className={styles.subHeading}>10. Intellectual Property</h3>
                <p className={styles.paragraph}>
                    All content on SoulPlan — text, logos, design, graphics, audio, video, sessions, and materials — is the intellectual property of the Company. You may not copy, reproduce, or distribute without written permission.
                </p>

                <h3 className={styles.subHeading}>11. Limitation of Liability</h3>
                <p className={styles.paragraph}>
                    SoulPlan and its astrologers provide guidance based on personal expertise and interpretation. We are not responsible for:
                </p>
                <ul className={styles.list}>
                    <li>Decisions you make based on readings</li>
                    <li>Outcomes or life events influenced by consultations</li>
                    <li>Technical issues caused by third-party providers</li>
                </ul>
                <p className={styles.paragraph}>
                    Services are for self-awareness, reflection, and personal growth, not guaranteed outcomes.
                </p>

                <h3 className={styles.subHeading}>12. Disclaimer</h3>
                <p className={styles.paragraph}>
                    All astrology, tarot, healing, and related services are subjective, spiritual, and interpretive. SoulPlan does not offer medical, financial, or legal advice. Please consult a licensed professional for such matters.
                </p>

                <h3 className={styles.subHeading}>13. Modifications to Terms</h3>
                <p className={styles.paragraph}>
                    We reserve the right to modify these Terms at any time. Continued use of the Platform constitutes acceptance of updated Terms.
                </p>

                <h3 className={styles.subHeading}>14. Governing Law</h3>
                <p className={styles.paragraph}>
                    These Terms are governed by the laws of India, and any disputes shall be resolved in the jurisdiction of Mumbai, Maharashtra.
                </p>
            </div>
        </div>
    );
};

export default TermsConditions;
