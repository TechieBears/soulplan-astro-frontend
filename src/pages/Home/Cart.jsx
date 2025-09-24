import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { formBtn3 } from "../../utils/CustomClass";

import { Edit, Timer1, Calendar } from "iconsax-reactjs";
import { ArrowLeft } from "@phosphor-icons/react";
import { Icon } from "@iconify/react";
import star from "../../assets/helperImages/star.png";
import {
  getProductFromCart,
  removeProductFromCart,
  updateProductInCart,
} from "../../api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Zoom } from "iconsax-reactjs";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("products");

  const fetchProductCart = async () => {
    try {
      const res = await getProductFromCart();
      setCartItems(res?.data?.items);
    } catch (err) {
      toast.error(err.message || "Failed to fetch product cart");
      console.error("Error fetching product cart", err);
    }
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const calculateGST = () => {
    return cartItems?.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + (itemTotal * item.gst) / 100;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const gstAmount = calculateGST();
  const total = subtotal + gstAmount;

  const updateQuantity = async (id, newQty) => {
    try {
      const res = await updateProductInCart({ itemId: id, quantity: newQty });
      if (res?.success) {
        fetchProductCart();
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("update quantity ======>", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await removeProductFromCart(id);
      if (res?.success) {
        fetchProductCart();
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("remove item ======>", error);
    }
  };

  useEffect(() => {
    fetchProductCart();
    window.scrollTo(0, 0);
  }, []);

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

        {activeTab === "products" && (
          <ProductTab
            cartItems={cartItems}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
            subtotal={subtotal}
            gstAmount={gstAmount}
            total={total}
          />
        )}
        {activeTab === "services" && (
          <ServiceTab
            cartItems={cartItems}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
            subtotal={subtotal}
            gstAmount={gstAmount}
            total={total}
          />
        )}
      </div>
    </div>
  );
};

const ProductTab = ({
  cartItems,
  removeItem,
  updateQuantity,
  subtotal,
  gstAmount,
  total,
}) => {
  const addresses = useSelector((state) => state.cart?.addresses);
  const navigate = useNavigate();
  if (cartItems?.length == 0) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <h2 className="text-xl font-tbLex font-semibold">Cart is empty!</h2>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-3 lg:p-5 xl:p-6 bg-white rounded-lg ">
      {/* Cart Items */}
      <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-scroll scroll-hide ">
        {cartItems?.map((item) => (
          <div
            key={item._id}
            className="bg-[#9E52D8] rounded-lg p-4 flex flex-col md:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 "
            // onClick={() => navigate(`/product-detail/${item.id}`)}
          >
            {/* Image */}
            <div
              className="relative w-full md:w-36 h-44 md:h-36  mx-auto aspect-square rounded-lg overflow-hidden"
              style={{
                background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%);`,
              }}
            >
              <img
                src={item?.image}
                alt={item?.title}
                className="w-full h-full object-contain p-4 "
                loading="lazy"
              />
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              <h3 className="font-bold text-white text-lg mb-1 sm:pr-6">
                {item.name}
              </h3>
              <div className="space-y-1">
                <div className="font-medium text-lg text-white">
                  ₹{item?.price?.toLocaleString()}
                </div>
                <div className="text-white text-sm">
                  <span>
                    MRP{" "}
                    <span className="line-through">
                      ₹{item?.mrp?.toLocaleString()}
                    </span>
                  </span>
                  <span className="ml-1">(incl. of all taxes)</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex w-full md:w-auto flex-row-reverse justify-between  md:flex-col md:items-end space-y-2 md:mt-2 ">
              {/* Delete Button */}
              <button
                onClick={() => removeItem(item?.id)}
                className="p-2 text-white hover:bg-[#8B3FC1] rounded-md transition-colors flex-shrink-0"
              >
                <FaRegTrashAlt className="w-4 h-4" />
              </button>

              {/* Quantity Controls */}
              <div className="flex gap-4 items-center">
                <span className="text-white text-sm font-medium">QTY:</span>
                <div className="flex items-center rounded-md bg-white overflow-hidden w-28 h-9 border border-gray-300">
                  {/* Decrease Button */}
                  <button
                    onClick={() => updateQuantity(item?.id, item?.quantity - 1)}
                    className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>

                  {/* Quantity Display */}
                  <div className="flex-1 text-center font-medium text-gray-900">
                    {item?.quantity}
                  </div>

                  {/* Increase Button */}
                  <button
                    onClick={() => updateQuantity(item?.id, item?.quantity + 1)}
                    className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Amount Payable */}
      <div className="lg:col-span-5">
        <div className="rounded-lg lg:sticky lg:top-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pb-4 bg-white rounded-md  border-b border-slate-200 mb-4">
            {/* Left: Delivery Info */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-sm font-semibold font-tbLex text-gray-800">
                Deliver to:{" "}
                <span className="font-medium">
                  {addresses?.firstName || "------"}{" "}
                  {addresses?.lastName || "------"}
                </span>
              </h3>
              <h3 className="text-sm font-semibold font-tbLex text-gray-800">
                {addresses?.mobileNo || "----- ------"}
              </h3>
              <p className="text-gray-500 text-sm font-tbPop mt-1">
                {addresses?.address || "------"} {addresses?.city || "------"}{" "}
                {addresses?.state || "------"} {addresses?.country || "------"}{" "}
                - {addresses?.postalCode || "------"}
              </p>
            </div>

            {/* Right: Change Button */}
            <button
              onClick={() => navigate("/profile/address")}
              className="flex items-center gap-1 border border-gray-900 rounded px-4 py-2 text-sm font-tbLex text-slate-600 hover:bg-gray-50 transition-colors mt-2 sm:mt-0"
            >
              <Edit className="w-4 h-4" />
              Change
            </button>
          </div>

          <h3 className="font-medium font-tbLex text-black text-base mb-2">
            Amount Payable
          </h3>

          <div className="space-y-3 mb-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Product {cartItems?.reduce((t, i) => t + i.quantity, 0)}x (incl.
                GST)
              </span>
              <span className="font-medium">
                ₹ {subtotal?.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">₹ {gstAmount.toFixed(1)}</span>
            </div>

            <div className="border-t border-gray-300 my-2"></div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                ₹ {total.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Continue to Pay */}
          <button
            onClick={() => navigate("/payment-success")}
            className={`${formBtn3} w-full py-3 text-white rounded-md`}
          >
            Continue to Pay
          </button>
        </div>
      </div>
    </div>
  );
};
const ServiceTab = ({
  cartItems,
  removeItem,
  updateQuantity,
  subtotal,
  gstAmount,
  total,
}) => {
  const addresses = useSelector((state) => state.cart?.addresses);
  const navigate = useNavigate();

  // Mock service data - replace with actual service cart items
  const services = [
    {
      id: "s1",
      name: "Palmistry Reading",
      type: "Palmistry",
      duration: "30–60 minutes",
      date: "15th Sep, 2025 / 12:00PM – 01:00PM",
      mode: "Online",
      price: 1500,
      image: "https://via.placeholder.com/150x150?text=Palmistry",
      link: "zoommtg://zoom.us/join?confno=8529015",
    },
    {
      id: "s2",
      name: "Astrology Consultation",
      type: "Astrology",
      duration: "45–90 minutes",
      date: "16th Sep, 2025 / 02:00PM – 03:30PM",
      mode: "In-person",
      price: 2500,
      image: "https://via.placeholder.com/150x150?text=Astrology",
      link: "zoommtg://zoom.us/join?confno=8529015",
    },
    {
      id: "s2",
      name: "Astrology Consultation",
      type: "Astrology",
      duration: "45–90 minutes",
      date: "16th Sep, 2025 / 02:00PM – 03:30PM",
      mode: "In-person",
      price: 2500,
      image: "https://via.placeholder.com/150x150?text=Astrology",
      link: "zoommtg://zoom.us/join?confno=8529015",
    },
    {
      id: "s2",
      name: "Astrology Consultation",
      type: "Astrology",
      duration: "45–90 minutes",
      date: "16th Sep, 2025 / 02:00PM – 03:30PM",
      mode: "In-person",
      price: 2500,
      image: "https://via.placeholder.com/150x150?text=Astrology",
      link: "zoommtg://zoom.us/join?confno=8529015",
    },
    {
      id: "s2",
      name: "Astrology Consultation",
      type: "Astrology",
      duration: "45–90 minutes",
      date: "16th Sep, 2025 / 02:00PM – 03:30PM",
      mode: "In-person",
      price: 2500,
      image: "https://via.placeholder.com/150x150?text=Astrology",
      link: "zoommtg://zoom.us/join?confno=8529015",
    },
  ];

  if (services?.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <h2 className="text-xl font-tbLex font-semibold text-gray-600">
          No services in cart!
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-3 lg:p-5 xl:p-6 bg-white rounded-lg">
      {/* Service Items */}
      <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-scroll scroll-hide">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#9E52D8] rounded-lg p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full"
          >
            {/* Service Details */}
            <div className="flex-1 bg-[#9E52D8] rounded-lg text-white">
              <h3 className="font-medium font-dm text-lg mb-4">
                Service Type: {service.type}
              </h3>

              <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                <Timer1 className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Session Duration: {service.duration}</span>
              </p>

              <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Date: {service.date}</span>
              </p>

              <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                <Icon
                  icon="ph:device-mobile"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span>Mode: {service.mode}</span>
              </p>

              {service.link && (
                <div className="flex items-center gap-3 mt-3 break-all">
                  <Zoom className="w-5 h-5 sm:w-6 sm:h-6" />
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline text-sm sm:text-base"
                  >
                    {service.link}
                  </a>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex md:flex-col items-center md:items-end gap-2 w-full md:w-auto">
              {/* Delete Button */}
              <button
                onClick={() => removeItem(service.id)}
                className="p-2 text-white hover:bg-[#8B3FC1] rounded-md transition-colors"
              >
                <FaRegTrashAlt className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className="lg:col-span-5">
        <div className="rounded-lg lg:sticky lg:top-8">
          <h3 className="font-medium font-tbLex text-black text-base mb-4">
            Service Summary
          </h3>

          <div className="space-y-3 mb-6 bg-gray-100 p-4 rounded-lg">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-center"
              >
                <span className="text-gray-600 text-sm">{service.name}</span>
                <span className="font-medium">
                  ₹{service.price?.toLocaleString()}
                </span>
              </div>
            ))}

            <div className="border-t border-gray-300 my-2"></div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                ₹
                {services
                  .reduce((total, service) => total + service.price, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>

          {/* Continue to Pay */}
          <button
            onClick={() => navigate("/payment-success")}
            className={`${formBtn3} w-full py-3 text-white rounded-md`}
          >
            Continue to Pay
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
