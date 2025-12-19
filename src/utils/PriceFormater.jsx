import { useSelector } from 'react-redux';

const PriceFormater = ({ price }) => {
    const currencyType = useSelector((state) => state.user.userDetails.currencyType);
    const currency = currencyType === "INR" ? "INR" : "USD";
    const locale = currencyType === "INR" ? "en-IN" : "en-US";
    
    return Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 2,
    }).format(price / 1)
}

export default PriceFormater
