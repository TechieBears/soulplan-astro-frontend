import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import product1 from "../../../assets/shop/product1.png";
import { Calendar, Timer1, Zoom } from "iconsax-reactjs";
import OrderViewModal from "../../../components/Modals/OrderViewModal";
import toast from "react-hot-toast";
import { getProductBookingsConfirmed, getServiceBookingsConfirmed } from "../../../api";
import { ShoppingCartIcon } from "lucide-react";
import Preloaders from "../../../components/Loader/Preloaders";
import { useCurrency } from "../../../utils/useCurrency";
const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

export default function MyOrders() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const currencySymbol = useCurrency();
    console.log("⚡️🤯 ~ orders.jsx:17 ~ MyOrders ~ state:", state)
    const [activeTab, setActiveTab] = useState(state?.type === "products" ? "products" : "services");
    const [productOrders, setProductOrders] = useState([]);
    const [serviceOrders, setServiceOrders] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [hasProductOrders, setHasProductOrders] = useState(false);
    const [hasServiceOrders, setHasServiceOrders] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalType, setModalType] = useState("product");


    const openModal = (order, type = "product") => {
        setSelectedOrder(order);
        setModalType(type);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedOrder(null);
        setModalType("product");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProductOrders = async () => {
            try {
                setIsLoadingProducts(true);
                const res = await getProductBookingsConfirmed();
                if (res?.success) {
                    setProductOrders(res.data);
                    setHasProductOrders(true);
                } else {
                    setProductOrders([]);
                    setHasProductOrders(false);
                }
            } catch (err) {
                toast.error(err.message || 'Failed to fetch product orders');
                console.error('Error fetching product orders', err);
                setProductOrders([]);
                setHasProductOrders(false);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        const fetchServiceOrders = async () => {
            try {
                setIsLoadingServices(true);
                const res = await getServiceBookingsConfirmed();
                if (res?.success && res?.data?.length > 0) {
                    setServiceOrders(res.data);
                    setHasServiceOrders(true);
                } else {
                    setServiceOrders([]);
                    setHasServiceOrders(false);
                }
            } catch (err) {
                toast.error(err.message || 'Failed to fetch service orders');
                console.error('Error fetching service orders', err);
                setServiceOrders([]);
                setHasServiceOrders(false);
            } finally {
                setIsLoadingServices(false);
            }
        };

        fetchProductOrders();
        fetchServiceOrders();
    }, []);


    const isLoading = false;

    return (
        <>
            <Private>
                <UserDashboard>
                    <ProfileSidebar>
                        <div className="flex flex-col sm:flex-row justify-between">
                            <h1 className="text-lg text-center font-medium  text-gray-800  p-4 font-tbLex">
                                My Orders
                            </h1>

                            {/* 🔹 Tabs */}
                            <div className="flex bg-slate1 justify-center rounded-full p-1.5 space-x-1.5 mb-5">
                                <button
                                    className={`px-4 sm:px-6 py-1 sm:py-2 text-black rounded-full hover:bg-slate1 transition-all duration-300 text-sm md:text-base font-tbLex ${activeTab === "services"
                                        ? "bg-linear-gradient text-white"
                                        : ""
                                        }`}
                                    onClick={() => setActiveTab("services")}
                                >
                                    Services
                                </button>
                                <button
                                    className={`px-4 sm:px-6 py-1 sm:py-2 text-black rounded-full hover:bg-slate1 transition-all duration-300 text-sm md:text-base font-tbLex ${activeTab === "products"
                                        ? "bg-linear-gradient text-white"
                                        : ""
                                        }`}
                                    onClick={() => setActiveTab("products")}
                                >
                                    Products
                                </button>
                            </div>
                        </div>
                        {/* 🔹 Loader */}
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12 max-h-[600px] overflow-y-auto">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#420098]"></div>
                            </div>
                        ) : (
                            <div className="">
                                {activeTab === "services" && (
                                    <>
                                        {isLoadingServices ? (
                                            <div className="space-y-4 flex justify-center items-center bg-slate1 max-h-[600px] overflow-y-auto">
                                                <Preloaders className="bg-slate1" />
                                            </div>
                                        ) : serviceOrders?.length > 0 ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto">
                                                {serviceOrders?.map((order, orderIndex) => (
                                                    order?.services?.[0] && (
                                                        <div
                                                            key={`${order.orderId}-${orderIndex}`}
                                                            className="group relative bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-800
                                                                     rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-[1.02]
                                                                     hover:shadow-2xl hover:shadow-purple-500/25  overflow-hidden cart-slide-up
                                                                     border border-purple-400/20 backdrop-blur-sm"
                                                            onClick={() => openModal(order, "service")}
                                                        >
                                                            {/* Decorative background elements */}
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

                                                            {/* Order Header */}
                                                            <div className="relative z-10 mb-6">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                                                                        <Icon icon="ph:calendar-star" className="w-6 h-6 text-white" />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="font-bold text-white text-xl group-hover:text-purple-100 transition-colors duration-300">
                                                                            {order.services.length > 1 ? `${order.services.length} Services Booked` : order.services[0]?.serviceName}
                                                                        </h3>
                                                                        <div className="text-purple-200 text-sm">
                                                                            Order #{order.orderId?.slice(-6).toUpperCase()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Services List */}
                                                            <div className="space-y-3 mb-6 relative z-10">
                                                                {order.services.map((service, idx) => (
                                                                    <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                                                        <h4 className="text-white font-medium mb-2">{service?.serviceName}</h4>
                                                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                                                            <div className="text-purple-200">Date: {service?.bookingDate}</div>
                                                                            <div className="text-purple-200">Time: {service?.startTime} - {service?.endTime}</div>
                                                                            <div className="text-purple-200">Duration: {service?.durationInMinutes} mins</div>
                                                                            <div className="text-purple-200">Mode: {service?.serviceType}</div>
                                                                        </div>
                                                                        {service?.zoomLink && (
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    window.open(`/meeting?zoomUrl=${encodeURIComponent(service.zoomLink)}`, '_blank');
                                                                                }}
                                                                                className="mt-2 text-blue-300 hover:text-blue-200 underline text-xs"
                                                                            >
                                                                                Join Meeting
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Status Badges */}
                                                            <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${order?.paymentStatus === 'paid'
                                                                    ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                                    : 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
                                                                    }`}>
                                                                    <Icon icon="ph:credit-card" className="w-3 h-3 inline mr-1" />
                                                                    {order?.paymentStatus}
                                                                </span>
                                                            </div>

                                                            {/* Price Footer */}
                                                            <div className="pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                                                                <div className="text-purple-200 text-sm">
                                                                    Total Amount
                                                                </div>
                                                                <div className="text-white text-2xl font-bold">
                                                                    {currencySymbol}{order?.finalAmount?.toLocaleString()}
                                                                </div>
                                                            </div>

                                                            {/* Hover effect overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-purple-500/0 to-purple-600/0
                                                                          group-hover:from-indigo-600/10 group-hover:via-purple-500/5 group-hover:to-purple-600/10
                                                                          transition-all duration-500 rounded-2xl"></div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 bg-slate1 flex flex-col items-center justify-center h-[450px] rounded-xl">
                                                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-600 mb-2">No Service Bookings</h3>
                                                <p className="text-gray-500">You haven't booked any services yet.</p>
                                            </div>
                                        )}
                                    </>
                                )}

                                {activeTab === "products" && (
                                    <>
                                        {isLoadingProducts ? (
                                            <div className="space-y-4 flex justify-center items-center bg-slate1">
                                                <Preloaders />
                                            </div>
                                        ) : productOrders?.length > 0 ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {productOrders.map((order, orderIndex) => {
                                                    return (
                                                        <div
                                                            key={`${order._id}-${orderIndex}`}
                                                            className="group relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800
                                                                     rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-[1.02]
                                                                     hover:shadow-2xl hover:shadow-purple-500/25 cart-slide-up overflow-hidden
                                                                     border border-purple-400/20 backdrop-blur-sm"
                                                            onClick={() => openModal(order, "product")}
                                                        >
                                                            {/* Decorative background elements */}
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

                                                            {/* Order ID and Date */}
                                                            <div className="flex justify-between items-start mb-4 relative z-10">
                                                                <div className="text-purple-200 text-xs font-medium">
                                                                    Order #{order._id?.slice(-8).toUpperCase()}
                                                                </div>
                                                                <div className="text-purple-200 text-xs">
                                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric'
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                                                {/* Product Image */}
                                                                <div
                                                                    className="sm:w-24 sm:h-24 w-full h-36 rounded-xl overflow-hidden flex-shrink-0
                                                                              bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20
                                                                              group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigate(`/product/${order?.items[0]?.product?._id}`);
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={order?.items[0]?.product?.images?.[0] || product1}
                                                                        alt={order?.items[0]?.product?.name || "Product"}
                                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                                        loading="lazy"
                                                                    />
                                                                </div>

                                                                {/* Product Details */}
                                                                <div className="flex-1 min-w-0">
                                                                    <h3
                                                                        className="font-bold text-white text-xl mb-2 group-hover:text-purple-100 transition-colors duration-300 cursor-pointer hover:underline"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            navigate(`/product/${order?.items[0]?.product?._id}`);
                                                                        }}
                                                                    >
                                                                        {order?.items[0]?.product?.name}
                                                                    </h3>

                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <div className="text-2xl font-bold text-white">
                                                                            {currencySymbol}{order?.items[0]?.product?.sellingPrice?.toLocaleString() || 0}
                                                                        </div>
                                                                        <div className="text-purple-200 text-sm line-through">
                                                                            {currencySymbol}{order?.items[0]?.product?.mrpPrice?.toLocaleString() || 0}
                                                                        </div>
                                                                        <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                                                            {Math.round(((order?.items[0]?.product?.mrpPrice - order?.items[0]?.product?.sellingPrice) / order?.items[0]?.product?.mrpPrice) * 100)}% OFF
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center justify-between mb-4">
                                                                        <div className="flex items-center gap-2">
                                                                            <Icon icon="ph:package" className="w-4 h-4 text-purple-300" />
                                                                            <span className="text-purple-200 text-sm">Qty: {order?.items[0]?.product?.quantity || 1}</span>
                                                                        </div>
                                                                        <div className="text-purple-200 text-sm">
                                                                            Subtotal: {currencySymbol}{order?.items[0]?.product?.subtotal?.toLocaleString() || 0}
                                                                        </div>
                                                                    </div>

                                                                    {/* Status Badges */}
                                                                    <div className="flex flex-wrap gap-2">
                                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.orderStatus === 'PENDING'
                                                                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                                                                            : order.orderStatus === 'CONFIRMED'
                                                                                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                                                                : order.orderStatus === 'DELIVERED'
                                                                                    ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                                                    : 'bg-red-500/20 text-red-300 border border-red-400/30'
                                                                            }`}>
                                                                            <Icon icon="ph:truck" className="w-3 h-3 inline mr-1" />
                                                                            {order.orderStatus}
                                                                        </span>
                                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'PAID'
                                                                            ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                                            : 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
                                                                            }`}>
                                                                            <Icon icon="ph:credit-card" className="w-3 h-3 inline mr-1" />
                                                                            {order.paymentStatus}
                                                                        </span>
                                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-400/30">
                                                                            <Icon icon="ph:wallet" className="w-3 h-3 inline mr-1" />
                                                                            {order.paymentMethod}
                                                                        </span>
                                                                        {order?.items?.length > 1 && <div className="flex items-center gap-1">
                                                                            <div className="size-6 bg-white text-black rounded-full text-center font-tbLex font-medium text-sm">
                                                                                {order?.items?.length - 1}
                                                                            </div>
                                                                            <span className="text-white text-sm">+</span>
                                                                        </div>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                                                                <div className="text-purple-200 text-sm">
                                                                    Total Amount (incl. GST)
                                                                </div>
                                                                <div className="text-white text-xl font-bold">
                                                                    {currencySymbol}{order.totalAmount?.toLocaleString() || 0}
                                                                </div>
                                                            </div>

                                                            {/* Hover effect overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/0 to-indigo-600/0
                                                                          group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-indigo-600/10
                                                                          transition-all duration-500 rounded-2xl"></div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 bg-slate1 flex flex-col items-center justify-center h-[450px] rounded-xl">
                                                <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-600 mb-2">No Product Orders</h3>
                                                <p className="text-gray-500">You haven't placed any product orders yet.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </ProfileSidebar>
                </UserDashboard>
            </Private>
            <OrderViewModal
                isOpen={modalOpen}
                onClose={handleClose}
                orderData={selectedOrder}
                orderType={modalType}
            />
        </>
    );
}
