import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import product1 from "../../assets/shop/product1.png";
import moon from "../../assets/moon.png";
import suceess from "../../assets/success.json";
import { Icon } from "@iconify/react";
import { Calendar } from "lucide-react";
import { Zoom, Timer1 } from "iconsax-reactjs";
import { ShoppingCartIcon } from "lucide-react";
import { formBtn1 } from "../../utils/CustomClass";
import { getSingleProductOrder, getSingleServiceOrder } from "../../api/index";
import ServiceCardSkeleton from "../../components/Loader/ServiceCardSkeleton";
import Lottie from "lottie-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("⚡️🤯 ~ PaymentSuccess.jsx:19 ~ PaymentSuccess ~ state:", state);
  const [activeTab, setActiveTab] = useState(
    state?.type === "products" ? "products" : "services"
  );
  const [productOrders, setProductOrders] = useState(
    state?.type === "products" ? state?.orderDetails?.order : null
  );
  const [serviceOrders, setServiceOrders] = useState(
    state?.type === "services" ? state?.orderDetails : null
  );
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [hasProductOrders, setHasProductOrders] = useState(false);
  const [hasServiceOrders, setHasServiceOrders] = useState(false);

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
  }, [
    isLoadingProducts,
    isLoadingServices,
    hasProductOrders,
    hasServiceOrders,
  ]);

  return (
    <div className="min-h-screen bg-[#FFF9EF] flex items-center pt-20 lg:pt-24 justify-center px-4">
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
          <div
            className={activeTab === "services" ? "text-left" : "text-center"}
          >
            <div
              className={`flex flex-col ${activeTab === "services" ? "items-start" : "items-center"
                } justify-center mb-3 space-y-6 xl:space-y-4`}
            >
              <div className="flex items-center gap-2">
                <Lottie
                  animationData={suceess}
                  loop={true}
                  alt="Verified"
                  className="w-12 h-12 sm:w-70 sm:h-70"
                />
                <h1 className="text-base sm:text-lg md:text-2xl font-semibold text-black text-tbLex">
                  Booking Confirmed
                </h1>
              </div>

              <p className="text-slate-500 text-xs sm:text-sm font-tbPop max-w-xs sm:max-w-sm md:max-w-md">
                Thank you for your order! Your total amount has been
                successfully processed.
              </p>
            </div>
          </div>
          <div className="space-y-4 h-[250px] overflow-y-scroll">
            {activeTab === "products" && (
              <>
                <div className="space-y-4 ">
                  {productOrders?.items?.map((item, index) => {
                    return (
                      <div
                        key={`${index}`}
                        className="bg-[#9E52D8] rounded-lg p-2 px-4 cursor-pointer hover:bg-[#8A47C4] transition-all duration-300
                                                             flex flex-col sm:flex-row items-left sm:items-start gap-4 cart-slide-up"
                      >
                        <div
                          className="sm:w-24 sm:h-24 w-full rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0 cursor-pointer"
                          style={{
                            background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)`,
                          }}
                          onClick={() => navigate(`/product/${item.product}`)}
                        >
                          <img
                            src={item?.snapshot?.images || product1}
                            alt={item.snapshot?.name || "Product"}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 min-w-0 text-left justify-self-start">
                          <h3
                            className="font-bold text-white font-dm text-lg mb-1 cursor-pointer hover:underline"
                            onClick={() => navigate(`/product/${item.product}`)}
                          >
                            {item.snapshot?.name}
                          </h3>
                          <div className="font-medium text-lg text-white mb-1">
                            ₹
                            {item.snapshot?.sellingPrice?.toLocaleString() || 0}
                          </div>
                          <div className="flex justify-between items-start">
                            <div className="text-white text-sm">
                              MRP{" "}
                              <span className="line-through">
                                ₹
                                {item.snapshot?.mrpPrice?.toLocaleString() || 0}
                              </span>
                              (incl. of all taxes)
                            </div>
                            <div className="text-white text-sm font-medium">
                              QTY: {item?.quantity || 1}
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-white text-xs">
                              Order Status:{" "}
                              <span className="font-semibold">
                                {productOrders.orderStatus}
                              </span>
                            </div>
                            <div className="text-white text-xs">
                              Payment:{" "}
                              <span className="font-semibold">
                                {productOrders.paymentStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {productOrders?.items?.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      No Product Orders
                    </h3>
                    <p className="text-gray-500">
                      You haven't placed any product orders yet.
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === "services" && (
              <>
                <div className="space-y-3">
                  {serviceOrders?.services?.map((service, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      className="relative rounded-lg p-4 text-black cursor-pointer transition-all duration-300
                                                             bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100
                                                             border border-gray-200 hover:border-purple-300 cart-slide-up overflow-hidden"
                      onClick={() => {
                        const serviceName = service?.service?.name;
                        if (serviceName) {
                          navigate(`/services/${encodeURIComponent(serviceName)}`);
                        }
                      }}
                    >
                      <h3 className="font-medium font-dm text-lg mb-4">
                        Service Type:{" "}
                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent font-semibold">
                          {service?.service?.name}
                        </span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <p className="flex items-center gap-3">
                          <Timer1 className="w-5 h-5 text-purple-600" />
                          <span className="text-sm">
                            Duration: {service?.service?.durationInMinutes} minutes
                          </span>
                        </p>
                        <p className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="text-sm">
                            Date: {service?.bookingDate}
                          </span>
                        </p>
                        <p className="flex items-center gap-3">
                          <Icon
                            icon="ph:device-mobile"
                            className="w-5 h-5 text-green-600"
                          />
                          <span className="text-sm">
                            Mode: {service?.service?.serviceType}
                          </span>
                        </p>
                        <p className="flex items-center gap-3">
                          <Icon
                            icon="ph:clock"
                            className="w-5 h-5 text-orange-600"
                          />
                          <span className="text-sm">
                            Time: {service?.startTime} - {service?.endTime}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <div className="text-sm">
                          <span className="text-gray-600">Price: </span>
                          <span className="font-semibold text-green-600">
                            ₹{service?.service?.price}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {service?.service?.serviceType}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full capitalize ${service.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {service.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {serviceOrders?.services?.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      No Service Bookings
                    </h3>
                    <p className="text-gray-500">
                      You haven't booked any services yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`${formBtn1} h-[48px] lg:h-[46px] xl:h-[51px] w-full !bg-transparent border border-black !text-black`}
            >
              Back to Home
            </button>
            <div className="gradientBtn w-full">
              <button
                className={`w-full`}
                onClick={() =>
                  navigate("/profile/my-orders", {
                    state: { type: state?.type },
                  })
                }
                disabled={false}
              >
                <span className="text-base xl:text-lg font-tbPop text-p">
                  View My Orders
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
