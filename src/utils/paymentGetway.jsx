import { load } from '@cashfreepayments/cashfree-js';
import { environment } from '../env';

let cashfree;

const initializeSDK = async function () {
    try {
        cashfree = await load({
            mode: environment?.production ? "production" : "sandbox"
        });
        console.log("Cashfree SDK initialized successfully");
    } catch (error) {
        console.error("Failed to initialize Cashfree SDK:", error);
    }
};

// Initialize immediately
initializeSDK();

export const getCashfree = async () => {
    // Wait for initialization if not ready
    if (!cashfree) {
        await initializeSDK();
    }
    return cashfree;
};

export const openRazorpay = (razorpayData, onSuccess, onError) => {
    const options = {
        key: environment.razorpayKey,
        amount: razorpayData.razorpay.amount,
        currency: razorpayData.razorpay.currency,
        order_id: razorpayData.razorpay.orderId,
        handler: function (response) {
            onSuccess(response);
        },
        modal: {
            ondismiss: function () {
                onError('Payment cancelled');
            }
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
};

export default cashfree;
