// "use client";
import { Icon } from "@iconify/react";
// import "./style.scss";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import product1 from "../../../assets/shop/product1.png";

// Temporary placeholder components
const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;
const OrderDetailsModal = ({ orderId, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>Order ID: {orderId}</p>
            <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
            >
                Close
            </button>
        </div>
    </div>
);

export default function MyOrders() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    // 🔹 Tab state
    const [activeTab, setActiveTab] = useState("products");

    // Mock data for demonstration
    const data = {
        orders: [
            {
                _id: "1",
                items: [
                    {
                        name: "Amber Crystal",
                        image: product1,
                        sellingPrice: 999,
                        mrpPrice: 1299,
                        quantity: 1,
                    },
                ],
            },
            {
                _id: "2",
                items: [
                    {
                        name: "Amber Crystal",
                        image: product1,
                        sellingPrice: 1499,
                        mrpPrice: 1999,
                        quantity: 2,
                    },
                ],
            },
        ],
    };

    // 🔹 Mock services data
    const services = [
        {
            id: "s1",
            type: "Palmistry",
            duration: "30–60 minutes",
            date: "15th Sep, 2025 / 12:00PM – 01:00PM",
            mode: "Online",
            link: "zoommtg://zoom.us/join?confno=8529015",
        },
        {
            id: "s2",
            type: "Palmistry",
            duration: "30–60 minutes",
            date: "15th Sep, 2025 / 12:00PM – 01:00PM",
            mode: "In-person",
        },
    ];

    const isLoading = false;

    return (
        <>
            <Private>
                <UserDashboard>
                    <ProfileSidebar>
                        <div className="flex justify-between">
                            <h1 className="text-lg font-medium text-left text-gray-800  p-4 font-tbLex">
                                My Orders
                            </h1>

                            {/* 🔹 Tabs */}
                            <div className="flex bg-slate-100 rounded-full p-1.5 space-x-1.5 mb-5">
                                <button className={`px-4 sm:px-6 py-1 sm:py-2 text-black rounded-full hover:bg-slate-100 transition-all duration-300 text-sm md:text-base font-tbLex ${activeTab === "services" ? "bg-linear-gradient text-white" : ""}`} onClick={() => setActiveTab("services")}>
                                    Services
                                </button>
                                <button className={`px-4 sm:px-6 py-1 sm:py-2 text-black rounded-full hover:bg-slate-100 transition-all duration-300 text-sm md:text-base font-tbLex ${activeTab === "products" ? "bg-linear-gradient text-white" : ""}`} onClick={() => setActiveTab("products")}>
                                    Products
                                </button>
                            </div>
                        </div>
                        {/* 🔹 Loader */}
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#420098]"></div>
                            </div>
                        ) : (
                            <>
                                {/* 🔹 Services Tab */}
                                {activeTab === "services" && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {services.map((s) => (
                                            <div
                                                key={s.id}
                                                className="bg-[#9E52D8] rounded-lg p-4 text-white"
                                            >
                                                <h3 className="font-bold text-lg mb-2">
                                                    Service Type: {s.type}
                                                </h3>
                                                <p>⏰ Session Duration: {s.duration}</p>
                                                <p>📅 Date: {s.date}</p>
                                                <p>📍 Mode: {s.mode}</p>
                                                {s.link && (
                                                    <a
                                                        href={s.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline block mt-2"
                                                    >
                                                        {s.link}
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 🔹 Products Tab */}
                                {activeTab === "products" && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {data?.orders?.map((order) => (
                                            <div
                                                key={order._id}
                                                className="bg-[#9E52D8] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 cursor-pointer hover:bg-[#8A47C4] transition-colors"
                                                onClick={() => navigate(`/orders/${order._id}`)}
                                            >
                                                {/* Image */}
                                                <div className="w-full sm:w-20 h-40 sm:h-20 bg-white rounded-md overflow-hidden flex-shrink-0 relative">
                                                    <img
                                                        src={order.items[0].image}
                                                        alt={order.items[0].name}
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 w-full">
                                                    <h3 className="font-bold text-white text-lg mb-1 sm:pr-6">
                                                        {order.items[0].name}
                                                    </h3>
                                                    <div className="space-y-1">
                                                        <div className="font-medium text-lg text-white">
                                                            ₹{order.items[0].sellingPrice.toLocaleString()}
                                                        </div>
                                                        <div className="text-white text-sm">
                                                            <span>
                                                                MRP{" "}
                                                                <span className="line-through">
                                                                    ₹{order.items[0].mrpPrice.toLocaleString()}
                                                                </span>
                                                            </span>
                                                            <span className="ml-1">(incl. of all taxes)</span>
                                                        </div>
                                                        <div className="text-white text-sm">
                                                            Quantity: {order.items[0].quantity}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Controls */}
                                                <div className="flex flex-col items-end space-y-2 mt-2 sm:mt-0">
                                                    {order.items.length > 1 && (
                                                        <div className="px-3 py-1 bg-white text-[#9E52D8] rounded-full text-xs font-medium">
                                                            +{order.items.length - 1} more items
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </ProfileSidebar>
                </UserDashboard>
            </Private>
        </>
    );
}
