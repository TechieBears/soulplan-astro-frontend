import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import product1 from "../../../assets/shop/product1.png";
import { Calendar, Timer1, Zoom } from "iconsax-reactjs";
import OrderViewModal from "../../../components/Modals/OrderViewModal";
import toast from "react-hot-toast";
import { getProductBookingsConfirmed, getServiceBookingsConfirmed } from "../../../api";
import ServiceCardSkeleton from "../../../components/Loader/ServiceCardSkeleton";
import ProductCardSkeleton from "../../../components/Loader/ProductCardSkeleton";
import { ShoppingCartIcon } from "lucide-react";

const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

export default function MyOrders() {
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

    const navigate = useNavigate();
    const { state } = useLocation();
    const [activeTab, setActiveTab] = useState(state?.type === "product" ? "products" : "services");
    const [productOrders, setProductOrders] = useState([]);
    const [serviceOrders, setServiceOrders] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [hasProductOrders, setHasProductOrders] = useState(false);
    const [hasServiceOrders, setHasServiceOrders] = useState(false);

    useEffect(() => {
        const fetchProductOrders = async () => {
            try {
                setIsLoadingProducts(true);
                const res = await getProductBookingsConfirmed();
                if (res?.success && res?.data?.length > 0) {
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

    useEffect(() => {
        if (!isLoadingProducts && !isLoadingServices) {
            if (hasProductOrders && !hasServiceOrders) {
                setActiveTab("products");
            } else if (!hasProductOrders && hasServiceOrders) {
                setActiveTab("services");
            } else if (hasProductOrders && hasServiceOrders) {
                setActiveTab("products");
            }
        }
    }, [isLoadingProducts, isLoadingServices, hasProductOrders, hasServiceOrders]);

    const isLoading = false;

    return (
        <>
            <Private>
                <UserDashboard>
                    <ProfileSidebar>
                        <div className="flex flex-col sm:flex-row justify-between">
                            <h1 className="text-lg font-medium text-left text-gray-800  p-4 font-tbLex">
                                My Orders
                            </h1>

                            {/* 🔹 Tabs */}
                            <div className="flex bg-slate1 rounded-full p-1.5 space-x-1.5 mb-5">
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
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#420098]"></div>
                            </div>
                        ) : (
                            <>
                                {activeTab === "services" && (
                                    <>
                                        {isLoadingServices ? (
                                            <div className="space-y-4">
                                                {[1, 2].map((index) => (
                                                    <div key={index} className="animate-pulse">
                                                        <ServiceCardSkeleton />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : hasServiceOrders ? (
                                            serviceOrders.map((order, orderIndex) => (
                                                <div key={order.orderId} className="space-y-3">
                                                    {order.services?.map((service, serviceIndex) => (
                                                        <div
                                                            key={`${order.orderId}-${service.serviceId}`}
                                                            className="relative rounded-lg p-4 text-black cursor-pointer transition-all duration-300
                                                             bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100
                                                             border border-gray-200 hover:border-purple-300 cart-slide-up overflow-hidden"
                                                            style={{ animationDelay: `${(orderIndex * order.services.length + serviceIndex) * 0.1}s` }}
                                                            onClick={() => navigate(`/profile/my-orders`)}
                                                        >
                                                            <h3 className="font-medium font-dm text-lg mb-4">
                                                                Service Type:
                                                                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent font-semibold">
                                                                    {service.serviceName}
                                                                </span>
                                                            </h3>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                                                <p className="flex items-center gap-3">
                                                                    <Timer1 className="w-5 h-5 text-purple-600" />
                                                                    <span className="text-sm">Duration: {service.durationInMinutes} minutes</span>
                                                                </p>
                                                                <p className="flex items-center gap-3">
                                                                    <Calendar className="w-5 h-5 text-blue-600" />
                                                                    <span className="text-sm">Date: {service.bookingDate}</span>
                                                                </p>
                                                                <p className="flex items-center gap-3">
                                                                    <Icon icon="ph:device-mobile" className="w-5 h-5 text-green-600" />
                                                                    <span className="text-sm">Mode: {service.serviceType}</span>
                                                                </p>
                                                                <p className="flex items-center gap-3">
                                                                    <Icon icon="ph:clock" className="w-5 h-5 text-orange-600" />
                                                                    <span className="text-sm">Time: {service.startTime} - {service.endTime}</span>
                                                                </p>
                                                            </div>

                                                            {service.zoomLink && (
                                                                <div className="flex items-center gap-3 mb-3">
                                                                    <Zoom className="w-5 h-5 text-blue-600" />
                                                                    <a
                                                                        href={service.zoomLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-sm text-blue-600 hover:text-blue-800 break-words underline"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        Join Meeting
                                                                    </a>
                                                                </div>
                                                            )}

                                                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                                                <div className="text-sm">
                                                                    <span className="text-gray-600">Price: </span>
                                                                    <span className="font-semibold text-green-600">₹{service.servicePrice?.toLocaleString()}</span>
                                                                </div>
                                                                <div className="flex gap-4 text-xs">
                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                                        {service.bookingStatus}
                                                                    </span>
                                                                    <span className={`px-2 py-1 rounded-full ${service.paymentStatus === 'paid'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                                        }`}>
                                                                        {service.paymentStatus}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
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
                                            <div className="space-y-4">
                                                {[1, 2].map((index) => (
                                                    <div key={index} className="animate-pulse">
                                                        <ProductCardSkeleton />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : hasProductOrders ? (
                                            productOrders.map((order, orderIndex) => (
                                                <div key={order._id} className="space-y-4 " style={{ animationDelay: `${orderIndex * 0.1}s` }}>
                                                    {order.items?.map((item, itemIndex) => (
                                                        <div
                                                            key={`${order._id}-${item._id}`}
                                                            className="bg-[#9E52D8] rounded-lg p-4 cursor-pointer hover:bg-[#8A47C4] transition-all duration-300
                                                             flex flex-col sm:flex-row items-left sm:items-start gap-4 cart-slide-up"
                                                            style={{ animationDelay: `${(orderIndex * order.items.length + itemIndex) * 0.1}s` }}
                                                            onClick={() => navigate(`/profile/my-orders`)}
                                                        >
                                                            <div className="sm:w-24 sm:h-24 w-full rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0"
                                                                style={{ background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)` }}>
                                                                <img
                                                                    src={item.product?.images?.[0] || product1}
                                                                    alt={item.product?.name || "Product"}
                                                                    className="w-full h-full object-contain p-2"
                                                                    loading="lazy"
                                                                />
                                                            </div>

                                                            <div className="flex-1 min-w-0 text-left justify-self-start">
                                                                <h3 className="font-bold text-white font-dm text-lg mb-1">
                                                                    {item.product?.name}
                                                                </h3>
                                                                <div className="font-medium text-lg text-white mb-1">
                                                                    ₹{item.product?.sellingPrice?.toLocaleString() || 0}
                                                                </div>
                                                                <div className="flex justify-between items-start">
                                                                    <div className="text-white text-sm">
                                                                        MRP
                                                                        <span className="line-through">
                                                                            ₹{item.product?.mrpPrice?.toLocaleString() || 0}
                                                                        </span>
                                                                        (incl. of all taxes)
                                                                    </div>
                                                                    <div className="text-white text-sm font-medium">
                                                                        QTY: {item.product?.quantity || 1}
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between items-center mt-2">
                                                                    <div className="text-white text-xs">
                                                                        Order Status: <span className="font-semibold">{order.orderStatus}</span>
                                                                    </div>
                                                                    <div className="text-white text-xs">
                                                                        Payment: <span className="font-semibold">{order.paymentStatus}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-600 mb-2">No Product Orders</h3>
                                                <p className="text-gray-500">You haven't placed any product orders yet.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </ProfileSidebar>
                </UserDashboard>
            </Private>
            <OrderViewModal
                isOpen={modalOpen}
                onClose={handleClose}
                modalType={modalType}
            />
        </>
    );
}
