import { useEffect } from "react";

const RefundCancellationPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles = {
    wrapper: "flex justify-center w-full bg-white pt-20 md:pt-32 pb-10 px-4 sm:px-6",
    container:
      "max-w-4xl w-full bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-10 overflow-y-auto",
    mainHeading: "font-semibold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-p text-center",
    subHeading: "text-lg font-semibold mt-8 mb-3 text-gray-800",
    paragraph: "text-gray-700 mb-4 text-base leading-relaxed",
    list: "list-disc pl-6 space-y-2 mb-4 text-gray-700 text-base",
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
          REFUND &amp; CANCELLATION POLICY
        </h2>

        <p className={styles.paragraph}>
          SoulPlan prioritizes fair and transparent policies. Refunds and cancellations vary by timeline of request.
        </p>

        <h3 className={styles.subHeading}>1. Cancellation Policy</h3>
        <ul className={styles.list}>
          <li><strong>Cancellation before 72 hours</strong> → 100% refund</li>
          <li><strong>Cancellation within 72 hours</strong> → Cancellation charges apply</li>
          <li><strong>Last-minute cancellations (less than 24 hours)</strong> → No refund</li>
        </ul>
        <p className={styles.paragraph}>
          This policy applies to both online and offline sessions.
        </p>

        <h3 className={styles.subHeading}>2. Rescheduling Policy</h3>
        <ul className={styles.list}>
          <li><strong>Reschedule before 48 hours</strong> → Free</li>
          <li><strong>Reschedule within 48 hours</strong> → Additional charges apply</li>
          <li>Rescheduling on the same day is not permitted.</li>
        </ul>

        <h3 className={styles.subHeading}>3. No-Show Policy</h3>
        <p className={styles.paragraph}>If the customer:</p>
        <ul className={styles.list}>
          <li>Does not join the Zoom session</li>
          <li>Arrives late beyond the session time</li>
          <li>Does not show up at astrologer's location</li>
        </ul>
        <p className={styles.paragraph}>
          → No refund or rescheduling will be provided.
        </p>

        <h3 className={styles.subHeading}>4. Refund Method &amp; Processing</h3>
        <ul className={styles.list}>
          <li>Refunds will be processed back to the original payment method.</li>
          <li>Refunds may take 7–10 working days as per Razorpay and bank processing timelines.</li>
        </ul>

        <h3 className={styles.subHeading}>5. Service Provider Cancellations</h3>
        <p className={styles.paragraph}>
          If an astrologer cancels or reschedules due to emergency:
        </p>
        <ul className={styles.list}>
          <li>Customer will receive full refund or</li>
          <li>Free rescheduling to a new time slot</li>
        </ul>

        <h3 className={styles.subHeading}>6. International Users</h3>
        <p className={styles.paragraph}>
          Refunds for international (USD) payments may depend on:
        </p>
        <ul className={styles.list}>
          <li>Currency conversion rates</li>
          <li>Bank timelines</li>
          <li>Local charges deducted by issuing banks</li>
        </ul>
        <p className={styles.paragraph}>
          SoulPlan is not responsible for additional third-party charges.
        </p>

        <h3 className={styles.subHeading}>7. Policy Updates</h3>
        <p className={styles.paragraph}>
          SoulPlan reserves the right to update cancellation, rescheduling, and refund charges at any time.
        </p>
      </div>
    </div>
  );
};

export default RefundCancellationPolicy;
