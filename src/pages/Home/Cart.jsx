import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { formBtn3 } from "../../utils/CustomClass";
import { Edit, TicketDiscount } from "iconsax-reactjs";
import { ArrowLeft, X } from "@phosphor-icons/react";
import star from "../../assets/helperImages/star.png";
import AvailableCouponsModal from "../../components/Modals/ApplyCoupon";
import {
  createServiceOrder,
  getAllAddress,
  getProductFromCart,
  getServiceFromCart,
  getWalletBalance,
  PlaceProductOrder,
  removeProductFromCart,
  removeServiceFromCart,
  updateProductInCart,
} from "../../api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddresses,
  setCartProductCount,
  setCoupon,
} from "../../redux/Slices/cartSlice";
import emptyCart from "../../assets/emptyCart.svg";
import ServicesCartCard from "../../components/Cards/ServicesCartCard";
import moment from "moment";
import { ExternalLink } from "lucide-react";
import Switch from "react-js-switch";
import AddressChangeModal from "../../components/Modals/AddressChangeModal";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type;
  const [activeTab, setActiveTab] = useState(type || "products");

  return (
    <div className="min-h-screen bg-[#FFF9EF]  pt-16 lg:pt-24 relative">
      <div className="absolute top-24 left-1/4 scale-50 ">
        <img src={star} alt="" className="w-full h-full object-fill" />
      </div>
      <div className="absolute bottom-40 right-0 rotate-45 scale-75">
        <img src={star} alt="" className="w-full h-full object-fill" />
      </div>
      <div className="container mx-auto px-4 xl:px-0 py-8">
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
            Cart
          </h1>

          <div className="absolute right-0 sm:flex bg-white rounded-full p-1.5 space-x-1.5">
            <button
              className={`px-4 sm:px-6 py-1 sm:py-2 text-black rounded-full hover:bg-slate-100 transition-all duration-300 text-sm md:text-base font-tbLex ${
                activeTab === "services" ? "bg-linear-gradient text-white" : ""
              }`}
              onClick={() => setActiveTab("services")}
            >
              Services
            </button>
            <button
              className={`px-4 sm:px-6 py-1 sm:py-2 text-black rounded-full hover:bg-slate-100 transition-all duration-300 text-sm md:text-base font-tbLex ${
                activeTab === "products" ? "bg-linear-gradient text-white" : ""
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
          </div>
        </div>

        {activeTab === "products" && <ProductTab />}
        {activeTab === "services" && <ServiceTab />}
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
      {[...Array(3)].map((_, index) => (
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

const ProductTab = () => {
  const [cartItems, setCartItems] = useState([]);
  const addresses = useSelector((state) => state.cart?.addresses);
  const coupon = useSelector((state) => state.cart?.coupon);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [walletBalance, setWalletBalance] = useState(0);
  const [isWalletChecked, setIsWalletChecked] = useState(false);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const res = await getWalletBalance();
        if (res?.success) {
          setWalletBalance(res?.data?.balance || 0);
        }
      } catch (err) {
        toast.error(err.message || "Failed to fetch wallet balance");
        console.error("Error fetching wallet balance", err);
      }
    };
    fetchWalletBalance();
  }, []);

  const fetchProductCart = async (showLoading = false) => {
    try {
      if (showLoading && isInitialLoad) {
        setIsLoading(true);
      }
      const res = await getProductFromCart();
      setCartItems(res?.data?.items);
      dispatch(setCartProductCount(res?.data?.items?.length));
    } catch (err) {
      toast.error(err.message || "Failed to fetch product cart");
      console.error("Error fetching product cart", err);
    } finally {
      if (showLoading && isInitialLoad) {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    }
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => {
      return total + (item.totalPrice || item.price * item.quantity);
    }, 0);
  };

  const calculateGST = () => {
    return cartItems?.reduce((total, item) => {
      const itemTotal = item.totalPrice || item.price * item.quantity;
      const gstRate = item.gst || 18;
      return total + (itemTotal * gstRate) / 100;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const gstAmount = calculateGST();
  const hasItemsWithTotalPrice = cartItems?.some((item) => item.totalPrice);
  const total = hasItemsWithTotalPrice ? subtotal : subtotal + gstAmount;

  const grandTotal =
    subtotal -
    (coupon
      ? coupon?.discountIn === "percent"
        ? (total * coupon?.discount) / 100
        : coupon?.discount
      : 0);

  const updateQuantity = async (id, newQty) => {
    try {
      setIsUpdating(true);
      const res = await updateProductInCart({ itemId: id, quantity: newQty });
      if (res?.success) {
        fetchProductCart();
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("update quantity ======>", error);
      toast.error("Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (id) => {
    try {
      setIsUpdating(true);
      const res = await removeProductFromCart({ itemId: id });
      if (res?.success) {
        fetchProductCart();
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("remove item ======>", error);
      toast.error("Failed to remove item");
    } finally {
      setIsUpdating(false);
    }
  };

  const orderItems = useMemo(
    () =>
      cartItems?.map((product) => ({
        product: product.productId,
        quantity: product.quantity,
      })),
    [cartItems]
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
          dispatch(setCartProductCount(0));
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

  const fetchAddresses = async () => {
    try {
      const res = await getAllAddress();
      if (res?.data?.length > 0) {
        const defaultAddress = res?.data?.filter((item) => item?.isDefault);
        dispatch(setAddresses(defaultAddress[0]));
      } else {
        dispatch(setAddresses([]));
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch addresses");
      console.error("Error fetching addresses", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchProductCart(true);
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <CartSkeleton />;
  }
  if (cartItems?.length == 0) {
    return (
      <div className="flex items-center flex-col justify-center h-full w-full bg-white rounded-lg space-y-10 py-28">
        <img
          src={emptyCart}
          alt="empty cart"
          className="w-56 h-56 object-contain"
        />
        <h2 className="text-xl font-tbLex font-semibold">Cart is empty!</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-3 lg:p-5 xl:p-6 bg-white rounded-lg relative">
      <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-scroll scroll-hide">
        {cartItems?.length == 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <h2 className="text-xl font-tbLex font-semibold">Cart is empty!</h2>
          </div>
        ) : (
          <>
            {cartItems?.map((item, index) => (
              <div
                key={item._id}
                className="bg-[#8B3FC1] rounded-lg p-4 flex flex-col md:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 cart-item-enter cursor-pointer hover:bg-[#9E52D8] transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/product/${item.productId || item._id}`)}
              >
                <div
                  className="relative w-full md:w-32 h-44 md:h-32  mx-auto aspect-square rounded-lg overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%);`,
                  }}
                >
                  <img
                    src={item?.images?.[0] || item?.image}
                    alt={item?.name || item?.title}
                    className="w-full h-full object-contain p-2 bg-slate-50 "
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 w-full">
                  <h3 className="font-bold text-white text-lg mb-1 sm:pr-6">
                    {item.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="font-medium text-lg text-white">
                      ₹{item?.price?.toLocaleString()}
                    </div>
                    <div className="text-white text-sm">
                      {item?.mrp && (
                        <span>
                          MRP
                          <span className="line-through">
                            ₹{item?.mrp?.toLocaleString()}
                          </span>
                        </span>
                      )}
                      <span className={item?.mrp ? "ml-1" : ""}>
                        (incl. of all taxes)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full md:w-auto flex-row-reverse justify-between  md:flex-col md:items-end space-y-2 md:mt-2 ">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item?._id || item?.id);
                    }}
                    disabled={isUpdating}
                    className={`p-2 text-white rounded-md transition-colors flex-shrink-0 ${
                      isUpdating
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#8B3FC1]"
                    }`}
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>

                  <div className="flex gap-4 items-center">
                    <span className="text-white text-sm font-medium">QTY:</span>
                    <div className="flex items-center rounded-md bg-white overflow-hidden w-28 h-9 border border-gray-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(
                            item?._id || item?.id,
                            item?.quantity - 1
                          );
                        }}
                        disabled={isUpdating || item?.quantity <= 1}
                        className={`w-9 h-full flex items-center justify-center text-gray-600 transition-colors ${
                          isUpdating || item?.quantity <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        -
                      </button>

                      <div className="flex-1 text-center font-medium text-gray-900">
                        {item?.quantity}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(
                            item?._id || item?.id,
                            item?.quantity + 1
                          );
                        }}
                        disabled={isUpdating}
                        className={`w-9 h-full flex items-center justify-center text-gray-600 transition-colors ${
                          isUpdating
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
            ))}
          </>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-lg lg:sticky lg:top-8">
          {addresses?._id && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-4 bg-white rounded-md  border border-slate-900 mb-4">
              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-semibold font-tbLex text-gray-800">
                  Deliver to:
                  <span className="font-medium">
                    {addresses?.firstName || "------"}
                    {addresses?.lastName || "------"}
                  </span>
                </h3>
                <h3 className="text-sm font-semibold font-tbLex text-gray-800 capitalize">
                  {addresses?.phoneNumber || "----- ------"} (
                  {addresses?.addressType || "----- ------"})
                </h3>
                <p className="text-gray-500 text-sm font-tbPop mt-1">
                  {addresses?.address || "------"} {addresses?.city || "------"}
                  {addresses?.state || "------"}{" "}
                  {addresses?.country || "------"}-{" "}
                  {addresses?.postalCode || "------"}
                </p>
              </div>

              <button
                onClick={() => navigate("/profile/address")}
                className="flex items-center gap-1 border border-gray-900 rounded px-4 py-2 text-sm font-tbLex text-slate-600 hover:bg-gray-50 transition-colors mt-2 sm:mt-0"
              >
                <Edit className="w-4 h-4" />
                Change
              </button>
            </div>
          )}

          {coupon ? (
            <div className="w-full bg-green-100 rounded-xl p-3 flex items-center justify-between ">
              <div className="">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TicketDiscount size={28} className="text-green-500" />
                    <span className="text-green-500 text-base font-tbLex">
                      Coupon Applied ({coupon.couponCode})
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-1 font-tbPop">
                  You saved an additional{" "}
                  {coupon.discountIn === "percent"
                    ? `${coupon.discount}% OFF`
                    : `₹${coupon.discount} OFF`}
                </p>
              </div>
              <button
                onClick={() => dispatch(setCoupon(null))}
                className="text-red-500 hover:text-red-600 transition-colors text-sm font-tbLex"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="w-full bg-gray-50 rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100">
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
            </div>
          )}

          <AvailableCouponsModal
            isOpen={isCouponModalOpen}
            onClose={() => setIsCouponModalOpen(false)}
            type="products"
          />

          <h3 className="font-medium font-tbLex text-black text-base sm:text-lg mb-2 pt-3 pl-5">
            Amount Payable
          </h3>

          <div className="space-y-3 mb-2 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={isWalletChecked}
                  onChange={(e) => setIsWalletChecked(e.target.checked)}
                  className="h-4 w-4 text-primary border-primary outline-none rounded focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 text-slate-800">
                  You want to pay with wallet credit?
                </label>
              </div>
              <span className="text-slate-800">₹ {walletBalance || 0}</span>
            </div>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="space-y-3 mb-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Product {cartItems?.reduce((t, i) => t + (i.quantity || 1), 0)}x{" "}
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

            {coupon && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Coupon Discount</span>
                <span className="font-medium">
                  ₹{" "}
                  {coupon?.discountIn === "percent"
                    ? `${coupon?.discount}% OFF`
                    : `₹${coupon?.discount} OFF`}
                </span>
              </div>
            )}

            <div className="border-t border-gray-300 my-2"></div>

            <div className="flex sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 w-full">
              <span className="font-bold text-gray-900 text-base sm:text-lg text-center sm:text-left">
                Total
              </span>

              <span className="font-bold text-gray-900 text-base sm:text-lg text-center sm:text-right break-words">
                ₹ {grandTotal || 0}{" "}
                <span className="text-sm sm:text-base font-normal text-gray-700">
                  (incl. of all taxes)
                </span>
              </span>
            </div>
          </div>

          {addresses?._id ? (
            <button
              onClick={() => handleBooking()}
              disabled={bookingLoading}
              className={`${formBtn3} w-full py-3 text-white rounded-md ${
                bookingLoading ? "opacity-50 cursor-not-allowed" : ""
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
            </button>
          ) : (
            <AddressChangeModal edit={false} />
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceTab = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const [isWalletChecked, setIsWalletChecked] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      const res = await getWalletBalance();
      if (res?.success) {
        setWalletBalance(res?.data?.balance || 0);
      }
    };
    fetchWalletBalance();
  }, []);

  const coupon = useSelector((state) => state.cart?.coupon);
  const fetchServiceCart = async (showLoading = false) => {
    try {
      if (showLoading && isInitialLoad) {
        setIsLoading(true);
      }
      const res = await getServiceFromCart();
      console.log("⚡️🤯 ~ Cart.jsx:585 ~ fetchServiceCart ~ res:", res);
      dispatch(setCoupon(null));
      setCartItems(res?.data?.items || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch product cart");
      dispatch(setCoupon(null));
    } finally {
      if (showLoading && isInitialLoad) {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    }
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => {
      return total + (item.totalPrice || item.originalPrice * item.quantity);
    }, 0);
  };

  const calculateGST = () => {
    return cartItems?.reduce((total, item) => {
      const itemTotal = item.totalPrice || item.originalPrice * item.quantity;
      return total + (itemTotal * (item.gst || 18)) / 100;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const hasItemsWithTotalPrice = cartItems?.some((item) => item.totalPrice);
  const total = hasItemsWithTotalPrice ? subtotal : subtotal + calculateGST();
  const grandTotal =
    subtotal -
    (coupon
      ? coupon?.discountIn === "percent"
        ? (total * coupon?.discount) / 100
        : coupon?.discount
      : 0);

  const removeItem = async (id) => {
    try {
      setIsUpdating(true);
      const res = await removeServiceFromCart({ itemId: id });
      if (res?.success) {
        fetchServiceCart();
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      dispatch(setCoupon(null));
      toast.error("Failed to remove item");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    dispatch(setCoupon(null));
    fetchServiceCart(true);
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (cartItems?.length == 0) {
    return (
      <div className="flex items-center flex-col justify-center h-full w-full bg-white rounded-lg space-y-10 py-28">
        <img
          src={emptyCart}
          alt="empty cart"
          className="w-56 h-56 object-contain"
        />
        <h2 className="text-xl font-tbLex font-semibold">Cart is empty!</h2>
      </div>
    );
  }

  const handleBooking = async () => {
    try {
      setBookingLoading(true);
      
      // Validate cart items
      if (!cartItems || cartItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const payload = {
        serviceItems: cartItems?.map((item) => {
          const serviceItem = {
            serviceId: item?.serviceId || "",
            serviceType: item?.serviceMode || "",
            astrologerId: item?.astrologer?._id || "",
            bookingDate: moment(item?.date).format("YYYY-MM-DD"),
            startTime: item?.startTime || "",
            firstName: item?.cust?.firstName || "",
            lastName: item?.cust?.lastName || "",
            email: item?.cust?.email || "",
            phone: item?.cust?.phone || "",
          };
          
          // Add address or addressData based on what's available
          if (item?.address) {
            serviceItem.address = item.address;
          } else if (item?.cust?.addressData) {
            serviceItem.addressData = item.cust.addressData;
          }
          
          return serviceItem;
        }),
        paymentType: "UPI",
        paymentId: `UPI-${moment().format("YYYYMMDDHHmmss")}`,
        useCredits: isWalletChecked,
      };
      console.log("⚡️🤯 ~ Cart.jsx:602 ~ handleBooking ~ payload:", payload);
      
      const res = await createServiceOrder(payload);
      if (res?.success) {
        navigate("/payment-success", {
          state: { type: "services", orderDetails: res?.order },
        });
        toast.success(res?.message || "Booking Successfully");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to book Service");
    } finally {
      setBookingLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-3 lg:p-5 xl:p-6 bg-white rounded-lg relative">
      <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-scroll scroll-hide">
        {cartItems?.map((service, index) => (
          <ServicesCartCard
            service={service}
            key={index}
            removeItem={removeItem}
            isUpdating={isUpdating}
          />
        ))}
      </div>

      <div className="lg:col-span-5 space-y-5">
        {coupon ? (
          <div className="w-full bg-green-100 rounded-xl p-3 flex items-center justify-between ">
            <div className="">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TicketDiscount size={28} className="text-green-500" />
                  <span className="text-green-500 text-base font-tbLex">
                    Coupon Applied ({coupon.couponCode})
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-1 font-tbPop">
                You saved an additional{" "}
                {coupon.discountIn === "percent"
                  ? `${coupon.discount}% OFF`
                  : `₹${coupon.discount} OFF`}
              </p>
            </div>
            <button
              onClick={() => dispatch(setCoupon(null))}
              className="text-red-500 hover:text-red-600 transition-colors text-sm font-tbLex"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="w-full bg-gray-0 rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100">
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
          </div>
        )}

        <AvailableCouponsModal
          isOpen={isCouponModalOpen}
          type="services"
          onClose={() => setIsCouponModalOpen(false)}
        />

        <div className="rounded-lg lg:sticky lg:top-8">
          <h3 className="font-medium font-tbLex text-black text-base mb-2 pt-3 pl-5">
            Amount Payable
          </h3>

          <div className="space-y-3 mb-2 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={isWalletChecked}
                  onChange={(e) => setIsWalletChecked(e.target.checked)}
                  className="h-4 w-4 text-primary border-primary outline-none rounded focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 text-slate-800">
                  You want to pay with wallet credit?
                </label>
              </div>
              <span className="text-slate-800">₹ {walletBalance || 0}</span>
            </div>
          </div>
          <div className="space-y-3 mb-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Service {cartItems?.reduce((t, i) => t + (i.quantity || 1), 0)}x
                (incl. GST)
              </span>
              <span className="font-medium">
                ₹ {subtotal?.toLocaleString()}
              </span>
            </div>

            {/* <div className="flex justify-between items-center">
                            <span className="text-gray-600">GST (18%)</span>
                            <span className="font-medium">₹ {gstAmount || 0}</span>
                        </div> */}

            {coupon && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Coupon Discount</span>
                <span className="font-medium">
                  ₹{" "}
                  {coupon?.discountIn === "percent"
                    ? `${coupon?.discount}% OFF`
                    : `₹${coupon?.discount} OFF`}
                </span>
              </div>
            )}

            <div className="border-t border-gray-300 my-2"></div>

            <div className="flex sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 w-full">
              <span className="font-bold text-gray-900 text-base sm:text-lg text-center sm:text-left">
                Total
              </span>

              <span className="font-bold text-gray-900 text-base sm:text-lg text-center sm:text-right break-words">
                ₹ {grandTotal || 0}{" "}
                <span className="text-sm sm:text-base font-normal text-gray-700">
                  (incl. of all taxes)
                </span>
              </span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={bookingLoading || cartItems?.length === 0}
            className={`${formBtn3} w-full py-3 text-white rounded-md ${
              bookingLoading || cartItems?.length === 0 ? "opacity-50 cursor-not-allowed" : ""
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
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
