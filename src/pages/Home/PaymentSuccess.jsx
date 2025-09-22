import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import product1 from "../../assets/shop/product1.png";
import moon from "../../assets/moon.png";
import verify from "../../assets/verify.png";
import { Icon } from "@iconify/react";
import { Calendar, Timer1, Zoom } from "iconsax-reactjs";
import { ShoppingCartIcon } from "lucide-react";
import { formBtn1, formBtn2 } from "../../utils/CustomClass";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("products");
    const [orderDetails, setOrderDetails] = useState();

    const orderItems = [
        {
            id: "P4000",
            name: "Amber Crystal",
            price: 3520,
            mrp: 4000,
            quantity: 1,
            image: product1,
        },
        {
            id: "P4001",
            name: "Amber Crystal",
            price: 3520,
            mrp: 4000,
            quantity: 1,
            image: product1,
        },
    ];

    const serviceItems = [
        {
            id: "S001",
            type: "Palmistry",
            duration: "30–60 minutes",
            date: "15th Sep, 2025 / 12:00PM – 01:00PM",
            mode: "Online",
            price: 1500,
            link: "zoommtg://zoom.us/join?confno=8529015",
        },
    ];

    useEffect(() => {
        // const fetchProductCart = async () => {
        //     try {
        //         const res = await getProductFromCart();
        //         setOrderDetails(res?.data);
        //     } catch (err) {
        //         toast.error(err.message || 'Failed to fetch product cart');
        //         console.error('Error fetching product cart', err);
        //     }
        // }
        // fetchProductCart();
    }, []);

    return (
        <div className="min-h-screen bg-[#FFF9EF] flex items-center mt-20 sm:mt-0 justify-center px-4">
            <div className="relative bg-white rounded-xl">
                <div className="absolute -top-12 -right-12 w-28 h-28 z-0 ">
                    <img
                        src={moon}
                        alt="background"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="absolute -bottom-12 -left-12 w-28 h-28 z-0 ">
                    <img
                        src={moon}
                        alt="background"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 space-y-6 relative ">
                    <div className={activeTab === "services" ? "text-left" : "text-center"}>
                        <div
                            className={`flex flex-col ${activeTab === "services" ? "items-start" : "items-center"
                                } justify-center mb-3 space-y-6 xl:space-y-4`}
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src={verify}
                                    alt="Verified"
                                    className="w-6 h-6 sm:w-7 sm:h-7"
                                />
                                <h1 className="text-base sm:text-lg md:text-2xl font-semibold text-black text-tbLex">
                                    Booking Confirmed
                                </h1>
                            </div>

                            <p className="text-slate-500 text-xs sm:text-sm font-tbPop max-w-xs sm:max-w-sm md:max-w-md">
                                Thank you for your order! Your total amount has been successfully
                                processed.
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    {/* <div className="flex items-center bg-gray-100 rounded-full space-x-2 px-2 mb-4">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2 rounded-full font-medium text-sm ${
              activeTab === "products"
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-2 rounded-full font-medium text-sm ${
              activeTab === "services"
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Services
          </button>
        </div> */}

                    <div className="space-y-4">
                        {activeTab === "products" &&
                            orderItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#9E52D8] rounded-lg p-4 cursor-pointer hover:bg-[#8A47C4] transition-colors
                   flex flex-col sm:flex-row items-left sm:items-start gap-4"
                                    onClick={() => navigate(`/orders/${item.id}`)}
                                >
                                    <div className="sm:w-24 sm:h-24 w-full rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0 " style={{ background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)` }}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-2"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 text-left justify-self-start">
                                        <h3 className="font-bold text-white font-dm text-lg mb-1">
                                            {item.name}
                                        </h3>
                                        <div className="font-medium text-lg text-white mb-1">
                                            ₹{item.price?.toLocaleString() || 0}
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-white text-sm">
                                                MRP{" "}
                                                <span className="line-through">
                                                    ₹{item.mrp?.toLocaleString() || 0}
                                                </span>{" "}
                                                (incl. of all taxes)
                                            </div>
                                            <div className="text-white text-sm font-medium">
                                                QTY: {item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        {activeTab === "services" &&
                            serviceItems.map((service) => (
                                <div
                                    key={service.id}
                                    className="relative rounded-lg p-4 text-black cursor-pointer transition-colors overflow-hidden"
                                    onClick={() => navigate(`/orders/${service.id}`)}
                                >
                                    <h3 className="font-medium font-dm text-lg mb-4">
                                        Service Type:{" "}
                                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                                            {service.type}
                                        </span>
                                    </h3>
                                    <p className="flex items-center gap-4 mb-2">
                                        <Timer1 className="w-6 h-6" />
                                        <span>Session Duration: {service.duration}</span>
                                    </p>
                                    <p className="flex items-center gap-4 mb-2">
                                        <Calendar className="w-6 h-6" />
                                        <span>Date: {service.date}</span>
                                    </p>
                                    <p className="flex items-center gap-4 ">
                                        <Icon icon="ph:device-mobile" className="w-6 h-6" />
                                        <span>Mode: {service.mode}</span>
                                    </p>

                                    {service.link && (
                                        <div className="flex items-center gap-4 mt-2">
                                            <Zoom className="w-6 h-6" />
                                            <a
                                                href={service.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm break-words"
                                            >
                                                {service.link}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>

                    {/* View My Orders */}
                    <div className="space-y-4">
                        <button type="button" onClick={() => navigate('/')} className={`${formBtn1} h-[48px] lg:h-[46px] xl:h-[51px] w-full !bg-transparent border border-black !text-black`}>Back to Home</button>
                        <button
                            onClick={() => navigate('/profile/my-orders')}
                            className={`h-[48px] lg:h-[46px] xl:h-[51px] py-3 text-white !font-medium !tracking-normal text-sm xl:text-base bg-primary-gradient hover:opacity-90  disabled:opacity-50  transition  w-full rounded relative `}
                            style={{
                                background: `linear-gradient(90deg, rgba(0, 121, 208, 0.6) -12.5%, rgba(158, 82, 216, 0.6) 30.84%, rgba(218, 54, 92, 0.6) 70.03%, rgba(208, 73, 1, 0.6) 111%)`,
                            }}
                        >
                            <div className="flex items-center justify-center space-x-1.5 bg-white  rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[46px] lg:h-[43px] xl:h-[48px] w-[99%] z-10">
                                <span className="text-base xl:text-lg font-tbPop text-p">
                                    View My Orders
                                </span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default PaymentSuccess;
