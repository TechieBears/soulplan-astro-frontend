import { useSelector } from 'react-redux';

export const useCurrency = () => {
    const currencyType = useSelector((state) => state.user.userDetails?.currencyType);
    return currencyType === "INR" ? "₹" : "$";
};
