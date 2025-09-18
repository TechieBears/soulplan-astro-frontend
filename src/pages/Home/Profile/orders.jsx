// "use client";
import { Icon } from "@iconify/react";
// import "./style.scss";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import product1 from "../../../assets/shop/product1.png";
import { FaRegTrashAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Mobile, Calendar, Timer1, Zoom } from "iconsax-reactjs";

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
      {
        _id: "4",
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
      {
        _id: "3",
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
            <div className="flex flex-col sm:flex-row justify-between">
              <h1 className="text-gray-900 mb-6 sm:mb-6 mb-0 sm:text-left text-center text-2xl py-4 font-medium text-secondary">
                My Orders
              </h1>

              {/* 🔹 Tabs */}
              <div className="flex items-center bg-gray-100 rounded-full space-x-4 px-2 mb-6 justify-center sm:justify-start">
                <button
                  onClick={() => setActiveTab("services")}
                  className={`px-8 py-2 rounded-full font-medium ${
                    activeTab === "services"
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-8 py-2 rounded-full font-medium ${
                    activeTab === "products"
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:leading-[1.8] ">
                    {services.map((s) => (
                      <div
                        key={s.id}
                        className="bg-[#9E52D8] rounded-lg p-4 text-white"
                      >
                        <h3 className="font-medium font-dm text-lg mb-4">
                          Service Type: {s.type}
                        </h3>

                        <p className="flex items-center gap-4 mb-2">
                          <Timer1 className="w-6 h-6" />
                          <span>Session Duration: {s.duration}</span>
                        </p>

                        <p className="flex items-center gap-4 mb-2">
                          <Calendar className="w-6 h-6" />
                          <span>Date: {s.date}</span>
                        </p>

                        <p className="flex items-center gap-4 mb-2">
                          <Icon icon="ph:device-mobile" className="w-6 h-6" />
                          <span>Mode: {s.mode}</span>
                        </p>

                        {s.link && (
                          <div className="flex items-center gap-4 mt-3">
                            <Zoom className="w-6 h-6" />
                            <a
                              href={s.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm break-words"
                            >
                              {s.link}
                            </a>
                          </div>
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
                        className="bg-[#9E52D8] rounded-lg p-4 cursor-pointer hover:bg-[#8A47C4] transition-colors 
                   flex flex-col sm:flex-row items-left sm:items-start gap-4"
                        onClick={() => navigate(`/orders/${order._id}`)}
                      >
                        <div className="sm:w-28 sm:h-32 w-full  bg-white rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                          <img
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            className="w-full h-full object-fill sm:object-contain p-2"
                            loading="lazy"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 text-left justify-self-start">
                          <h3 className="font-bold text-white font-dm text-lg mb-1">
                            {order.items[0].name}
                          </h3>
                          <div className="font-medium text-lg text-white mb-1">
                            ₹
                            {order.items[0].sellingPrice?.toLocaleString() || 0}
                          </div>
                          <div className="text-white text-sm">
                            MRP{" "}
                            <span className="line-through">
                              ₹{order.items[0].mrpPrice?.toLocaleString() || 0}
                            </span>{" "}
                            (incl. of all taxes)
                          </div>
                          <div className="text-white text-sm mt-4 font-medium">
                            QTY: {order.items[0].quantity}
                          </div>
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
