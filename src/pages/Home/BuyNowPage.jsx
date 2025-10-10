import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formBtn3 } from "../../utils/CustomClass";
import { TicketDiscount } from "iconsax-reactjs";
import { ArrowLeft } from "@phosphor-icons/react";
import star from "../../assets/helperImages/star.png";
import AvailableCouponsModal from "../../components/Modals/ApplyCoupon";
import { PlaceProductOrder } from "../../api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCoupon } from "../../redux/Slices/cartSlice";
import emptyCart from "../../assets/emptyCart.svg";
import { ExternalLink } from "lucide-react";
import AddressSelector from "../../components/HomeComponents/AddressSelector";


const BuyNowPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;
    const quantity = location.state?.quantity;

    return (
        <div className="min-h-screen bg-[#FFF9EF]  pt-16 lg:pt-24 relative">
            <div className="absolute top-24 left-1/4 scale-50 ">
                <img src={star} alt="" className="w-full h-full object-fill" />
            </div>
            <div className="absolute bottom-40 right-0 rotate-45 scale-75">
                <img src={star} alt="" className="w-full h-full object-fill" />
            </div>
            <div className="container mx-auto px-5 xl:px-0 py-8">
                {/* Header */}
                <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute left-0">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-black hover:text-gray-800 transition-colors text-sm md:text-base font-tbLex"
                        >
                            <ArrowLeft
                                className="mr-2"
                                color="#000"
                                size={20}
                                weight="bold"
                            />
                            Go Back
                        </button>
                    </div>

                    <h1 className="text-xl md:text-2xl hidden sm:block font-tbLex font-normal text-slate-800">
                        Buy Now
                    </h1>

                </div>

                <ProductTab product={product} quantityBy={quantity} />
            </div>
        </div>
    );
};

const CartItemSkeleton = () => (
    <div className="bg-[#9E52D8]/60 rounded-lg p-4 flex flex-col md:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full md:w-36 h-44 md:h-36 mx-auto aspect-square rounded-lg overflow-hidden bg-white/20">
            <div className="w-full h-full bg-white/30 rounded-lg cart-shimmer"></div>
        </div>

        <div className="flex-1 w-full space-y-3">
            <div className="h-6 bg-white/30 rounded-md w-3/4 cart-shimmer"></div>
            <div className="space-y-2">
                <div className="h-5 bg-white/20 rounded-md w-1/2 cart-shimmer"></div>
                <div className="h-4 bg-white/20 rounded-md w-2/3 cart-shimmer"></div>
            </div>
        </div>

        <div className="flex w-full md:w-auto flex-row-reverse justify-between md:flex-col md:items-end space-y-2 md:mt-2">
            <div className="w-8 h-8 bg-white/20 rounded-md cart-shimmer"></div>
            <div className="flex gap-4 items-center">
                <div className="h-4 bg-white/20 rounded-md w-8 cart-shimmer"></div>
                <div className="w-28 h-9 bg-white/20 rounded-md cart-shimmer"></div>
            </div>
        </div>
    </div>
);

const CartSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-3 lg:p-5 xl:p-6 bg-white rounded-lg">
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-scroll scroll-hide">
            {[...Array(1)].map((_, index) => (
                <CartItemSkeleton key={index} />
            ))}
        </div>

        <div className="lg:col-span-5">
            <div className="rounded-lg lg:sticky lg:top-8 animate-pulse">

                <div className="space-y-3 mb-6 bg-slate1 p-4 rounded-lg">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="h-4  rounded-md w-1/2 cart-shimmer"></div>
                            <div className="h-4  rounded-md w-1/4 cart-shimmer"></div>
                        </div>
                    ))}
                </div>
                <div className="space-y-3 mb-6 bg-slate1 p-4 rounded-lg">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="h-4  rounded-md w-1/2 cart-shimmer"></div>
                            <div className="h-4  rounded-md w-1/4 cart-shimmer"></div>
                            <div className="h-4  rounded-md w-1/4 cart-shimmer"></div>
                        </div>
                    ))}
                </div>
                <div className="space-y-3 mb-6 bg-slate1 p-4 rounded-lg">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="h-4  rounded-md w-1/2 cart-shimmer"></div>
                            <div className="h-4  rounded-md w-1/4 cart-shimmer"></div>
                            <div className="h-4  rounded-md w-1/4 cart-shimmer"></div>
                        </div>
                    ))}
                </div>

                <div className="w-full h-12 bg-gray-300 rounded-md cart-shimmer"></div>
            </div>
        </div>
    </div>
);

const ProductTab = ({ product, quantityBy }) => {
    console.log("⚡️🤯 ~ BuyNowPage.jsx:141 ~ ProductTab ~ product:", product)
    const addresses = useSelector((state) => state.cart?.addresses);
    const coupon = useSelector((state) => state.cart?.coupon);
    const [bookingLoading, setBookingLoading] = useState(false);
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(quantityBy);

    const calculateSubtotal = () => {
        return quantity * product?.sellingPrice;
    };

    const calculateGST = () => {
        return (quantity * product?.sellingPrice * (product?.gst || 18)) / 100;
    };

    const subtotal = calculateSubtotal();
    const gstAmount = calculateGST();
    const hasItemsWithTotalPrice = quantity * product?.sellingPrice;
    const total = hasItemsWithTotalPrice ? subtotal : subtotal + gstAmount;

    const grandTotal = subtotal - (coupon ? (coupon?.discountIn === 'percent' ? (total * coupon?.discount) / 100 : coupon?.discount) : 0);


    const orderItems = useMemo(() =>
        [{
            "product": product?._id,
            "quantity": quantity,
        }],
        [quantity]
    );
    const handleBooking = async () => {
        try {
            setBookingLoading(true);
            const payload = {
                items: orderItems,
                address: addresses?._id,
                paymentMethod: "UPI",
                paymentDetails: {
                    transactionId: "TXN123456789",
                    provider: "PhonePe",
                    status: "SUCCESS",
                    paidAt: "2025-09-18T10:30:00.000Z",
                },
                coupon: coupon?._id || "",
            };
            console.log("==========payload in handleBooking", payload);
            await PlaceProductOrder(payload).then((res) => {
                console.log("⚡️🤯 ~ Cart.jsx:282 ~ handleBooking ~ res:", res);
                if (res?.success) {
                    toast.success(res?.message);
                    navigate("/payment-success", {
                        state: { type: "products", orderDetails: res?.data },
                    });
                } else {
                    toast.error(res?.message || "Something went wrong");
                }
            });
        } catch (error) {
            console.log("handleBooking ======>", error);
            toast.error("Failed to book product");
        } finally {
            setBookingLoading(false);
        }
    };

    if (product == null) {
        return <CartSkeleton />;
    }

    if (product == null) {
        return (
            <div className="flex items-center flex-col justify-center h-full w-full bg-white rounded-lg space-y-10 py-28">
                <img
                    src={emptyCart}
                    alt="empty cart"
                    className="w-56 h-56 object-contain"
                />
                <h2 className="text-xl font-tbLex font-semibold">Buy Now is empty!</h2>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-3 lg:p-5 xl:p-6 bg-white rounded-lg relative">
            <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-scroll scroll-hide">
                <div
                    key={product?._id}
                    className="bg-[#9E52D8] rounded-lg p-4 flex flex-col md:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 cart-item-enter"
                >
                    <div
                        className="relative w-full md:w-32 h-44 md:h-32  mx-auto aspect-square rounded-lg overflow-hidden"
                        style={{
                            background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%);`,
                        }}
                    >
                        <img
                            src={product?.images?.[0] || product?.image}
                            alt={product?.name || product?.title}
                            className="w-full h-full object-contain p-2 bg-slate-50 "
                            loading="lazy"
                        />
                    </div>

                    <div className="flex-1 w-full">
                        <h3 className="font-bold text-white text-lg mb-1 sm:pr-6">
                            {product.name}
                        </h3>
                        <div className="space-y-1">
                            <div className="font-medium text-lg text-white">
                                ₹{product?.sellingPrice?.toLocaleString()}
                            </div>
                            <div className="text-white text-sm">
                                {product?.mrpPrice && (
                                    <span>
                                        MRP
                                        <span className="line-through">
                                            ₹{product?.mrpPrice?.toLocaleString()}
                                        </span>
                                    </span>
                                )}
                                <span className={product?.mrpPrice ? "ml-1" : ""}>
                                    (incl. of all taxes)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full md:w-auto flex-row-reverse justify-between  md:flex-col md:items-end space-y-2 md:mt-2 ">

                        <div className="flex gap-4 items-center">
                            <span className="text-white text-sm font-medium">QTY:</span>
                            <div className="flex items-center rounded-md bg-white overflow-hidden w-28 h-9 border border-gray-300">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity ? quantity - 1 : 1))
                                    }
                                    disabled={isUpdating || product?.stock === 0 || quantity === 0}
                                    className={`w-9 h-full flex items-center justify-center text-gray-600 transition-colors ${isUpdating || product?.stock === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    -
                                </button>

                                <div className="flex-1 text-center font-medium text-gray-900">
                                    {quantity}
                                </div>

                                <button
                                    onClick={() =>
                                        setQuantity(Math.min(product?.stock || 1, quantity ? quantity + 1 : 1))
                                    }
                                    disabled={isUpdating || product?.stock === 0 || quantity === 0}
                                    className={`w-9 h-full flex items-center justify-center text-gray-600 transition-colors ${isUpdating || product?.stock === 0
                                        || quantity === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="rounded-lg lg:sticky lg:top-8">
                    <AddressSelector />

                    {coupon ?
                        <div className="w-full bg-green-100 rounded-xl p-3 flex items-center justify-between ">
                            <div className="">
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TicketDiscount size={28} className="text-green-500" />
                                        <span className="text-green-500 text-base font-tbLex">Coupon Applied ({coupon.couponCode})</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-xs mt-1 font-tbPop">
                                    You saved an additional {coupon.discountIn === 'percent' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                                </p>
                            </div>
                            <button
                                onClick={() => dispatch(setCoupon(null))}
                                className="text-red-500 hover:text-red-600 transition-colors text-sm font-tbLex"
                            >
                                Remove
                            </button>
                        </div> : <div className="w-full bg-gray-50 rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100">
                            {/* Title */}
                            <h2 className="text-gray-800 text-base sm:text-lg font-semibold">
                                Coupon
                            </h2>

                            {/* Description */}
                            <p className="text-gray-600 text-xs mt-1">
                                Apply a coupon to get additional discount on your order
                            </p>

                            {/* Button */}
                            <button
                                type="button"
                                onClick={() => setIsCouponModalOpen(true)}
                                className="mt-4 w-full bg-purple-100 text-purple-700 hover:bg-purple-200 font-medium py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                            >
                                Check Available Coupons
                                <ExternalLink size={16} />
                            </button>
                        </div>}

                    <AvailableCouponsModal
                        isOpen={isCouponModalOpen}
                        onClose={() => setIsCouponModalOpen(false)}
                        type="products"
                    />

                    <h3 className="font-medium font-tbLex text-black text-base mb-2 pt-3">
                        Amount Payable
                    </h3>

                    <div className="space-y-3 mb-6 bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                                Product {quantity}x{" "}
                                {hasItemsWithTotalPrice ? "(incl. GST)" : "(excl. GST)"}
                            </span>
                            <span className="font-medium">
                                ₹ {subtotal?.toLocaleString()}
                            </span>
                        </div>

                        {!hasItemsWithTotalPrice && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">GST (18%)</span>
                                <span className="font-medium">₹ {gstAmount || 0}</span>
                            </div>
                        )}

                        {coupon && <div className="flex justify-between items-center">
                            <span className="text-gray-600">Coupon Discount</span>
                            <span className="font-medium">₹ {coupon?.discountIn === 'percent' ? `${coupon?.discount}% OFF` : `₹${coupon?.discount} OFF`}</span>
                        </div>}

                        <div className="border-t border-gray-300 my-2"></div>

                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-gray-900">
                                ₹ {grandTotal || 0} (incl. of all taxes)
                            </span>
                        </div>
                    </div>

                    {addresses?._id && <button
                        onClick={() => handleBooking()}
                        disabled={bookingLoading}
                        className={`${formBtn3} w-full py-3 text-white rounded-md ${bookingLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {bookingLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            "Continue to Pay"
                        )}
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default BuyNowPage;
