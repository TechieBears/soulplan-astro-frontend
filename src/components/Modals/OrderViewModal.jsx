import { useState, Fragment, useEffect } from "react";
import { X, Share2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import ring from "../../assets/shop/product2.png";
import CustomTextArea from "../TextInput/CustomTextArea";
import download from "../../assets/download.png";
import delivery from "../../assets/deliver.png";
import { Calendar, Timer1, Zoom } from "iconsax-reactjs";
import { Icon } from "@iconify/react";
import verified from "../../assets/verify.png";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { addRating, getRatings } from "../../api";
import toast from "react-hot-toast";
import { Star } from "@phosphor-icons/react";
import { PulseLoader } from "react-spinners";

const OrderViewModal = ({
  isOpen,
  onClose,
  orderData = null,
  orderType = "product",
}) => {
  const [allReviews, setAllReviews] = useState([]);

  if (!isOpen || !orderData) return null;

  const getOrderStatus = () => {
    if (orderType === "product") {
      return orderData.orderStatus || "PENDING";
    } else {
      const firstService = orderData.services?.[0];
      return firstService?.bookingStatus || "pending";
    }
  };

  const getPaymentStatus = () => {
    return orderData.paymentStatus || "PENDING";
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-[2.3px] bg-black/20" />
        </Transition.Child>

        <div className="fixed inset-0 z-[9999999] w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl max-h-[85vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between border-b bg-gray-50 sticky top-0 z-10 p-4 sm:px-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 font-tbLex">
                      {orderType === "product"
                        ? "Product Order Details"
                        : "Service Order Details"}
                    </h2>
                    <p className="text-sm text-gray-600 font-tbLex">
                      Order ID:{" "}
                      {orderType === "product"
                        ? orderData._id
                        : orderData.orderId}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-4">
                    {orderType === "product" ? (
                      <>
                        <button
                          className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${
                            getOrderStatus() === "DELIVERED"
                              ? "bg-green-100 text-green-500"
                              : getOrderStatus() === "SHIPPED"
                              ? "bg-blue-100 text-blue-500"
                              : getOrderStatus() === "PENDING"
                              ? "bg-orange-100 text-orange-500"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <img
                            src={delivery}
                            alt="Order status"
                            className="w-6 h-6"
                          />
                          <span className="hidden sm:inline">
                            {getOrderStatus()}
                          </span>
                        </button>
                        <button
                          className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${
                            getPaymentStatus() === "PAID"
                              ? "bg-green-100 text-green-500"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          <span className="hidden sm:inline">
                            Payment: {getPaymentStatus()}
                          </span>
                        </button>
                        <button className="flex items-center space-x-2 sm:p-2 bg-blue-100 text-blue-500 text-md sm:text-md font-tbLex capitalize font-medium rounded">
                          <img
                            src={download}
                            alt="Download Invoice"
                            className="w-6 h-6"
                          />
                          <span className="hidden sm:inline">
                            Download Invoice
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${
                            getOrderStatus() === "confirmed"
                              ? "bg-green-50 text-green-500"
                              : getOrderStatus() === "pending"
                              ? "bg-yellow-50 text-yellow-500"
                              : "bg-green-50 text-green-500"
                          }`}
                        >
                          <img src={verified} alt="" className="w-6 h-6" />
                          <span className="hidden sm:inline">
                            Status: {getOrderStatus()}
                          </span>
                        </button>
                        <button
                          className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${
                            getPaymentStatus() === "paid"
                              ? "bg-green-50 text-green-500"
                              : "bg-yellow-50 text-yellow-500"
                          }`}
                        >
                          <span className="hidden sm:inline">
                            Payment: {getPaymentStatus()}
                          </span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={onClose}
                      className="text-black hover:text-gray-700 transition-colors p-2 rounded"
                      aria-label="Close Modal"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
                  <div className="space-y-6">
                    {orderType === "product"
                      ? // Render product items
                        orderData.items?.map((item, itemIndex) => (
                          <RenderProductView
                            key={itemIndex}
                            item={item}
                            itemIndex={itemIndex}
                            orderData={orderData}
                            orderType={orderType}
                          />
                        ))
                      : // Render service items
                        orderData.services?.map((service, serviceIndex) => (
                          <RenderServiceView
                            key={serviceIndex}
                            service={service}
                            serviceIndex={serviceIndex}
                            orderData={orderData}
                            orderType={orderType}
                          />
                        ))}

                    {/* Order Summary */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 font-tbLex mb-3">
                        Order Summary
                      </h3>
                      <div className="space-y-2">
                        {orderType === "product" ? (
                          <>
                            <div className="flex justify-between">
                              <span className="font-tbLex">Subtotal:</span>
                              <span className="font-tbPop">
                                ₹{orderData.totalAmount?.toLocaleString()}
                              </span>
                            </div>
                            {/* {orderData.amount?.gst && (
                                                            <div className="flex justify-between">
                                                                <span className="font-tbLex">GST:</span>
                                                                <span className="font-tbPop">₹{orderData.amount.gst?.toLocaleString()}</span>
                                                            </div>
                                                        )} */}
                            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                              <span className="font-tbLex">Total:</span>
                              <span className="font-tbPop">
                                ₹{orderData.totalAmount?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-tbLex">
                                Payment Method:
                              </span>
                              <span className="font-tbPop">
                                {orderData.paymentMethod}
                              </span>
                            </div>
                            {orderData.address && (
                              <div className="mt-3 p-3 bg-white rounded border">
                                <h4 className="font-semibold font-tbLex mb-1">
                                  Delivery Address:
                                </h4>
                                <p className="text-sm text-gray-600 font-tbPop">
                                  {orderData.address.city},{" "}
                                  {orderData.address.state},{" "}
                                  {orderData.address.country}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between font-semibold text-lg">
                              <span className="font-tbLex">Total Amount:</span>
                              <span className="font-tbPop">
                                ₹{orderData.totalAmount?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-tbPop">Payment ID:</span>
                              <span className="font-tbPop">
                                {orderData.paymentId}
                              </span>
                            </div>
                            {orderData.paymentDetails?.note && (
                              <div className="mt-2 p-2 bg-yellow-50 rounded">
                                <p className="text-sm text-yellow-800 font-tbPop">
                                  <strong>Note:</strong>{" "}
                                  {orderData.paymentDetails.note}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const RenderProductView = ({ item, itemIndex, orderData }) => {
  const product = item.product;
  const images = product.images || [ring];
  const [activeReview, setActiveReview] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ratingsLoading, setRatingsLoading] = useState(false);
  const user = useSelector((state) => state.user.userDetails);

  const { handleSubmit, reset, control } = useForm({
    defaultValues: { rating: 0, reviewText: "" },
  });

  const fetchRatings = async () => {
    try {
      setRatingsLoading(true);
      const res = await getRatings({ product: product?._id });
      console.log("⚡️🤯 ~ OrderViewModal.jsx:230 ~ fetchRatings ~ res:", res);
      setRatings(res?.data);
    } catch (err) {
      console.log("==========err in fetchRatings", err);
      setRatings([]);
    } finally {
      setRatingsLoading(false);
    }
  };

  const handleAddRating = async (data) => {
    if (data?.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      const payload = {
        user_id: user?._id,
        service_id: null,
        product_id: product?._id,
        message: data?.reviewText,
        rating: data?.rating,
      };
      await addRating(payload).then((res) => {
        if (res?.success) {
          toast.success("Review Added Successfully");
          fetchRatings();
          reset();
          setActiveReview(null);
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("Failed to add Review");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [orderData?._id]);

  return (
    <div
      key={itemIndex}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-lg p-4 border-b"
    >
      {/* Image Section */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="hidden md:flex flex-col space-y-3 w-20 lg:w-24">
          {images.map((img, index) => (
            <button
              key={index}
              style={{
                background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)`,
              }}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-full aspect-square rounded overflow-hidden border-2 ${
                currentImageIndex === index
                  ? "border-transparent  p-[2px]"
                  : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`${product?.name} ${index + 1}`}
                className="w-full h-full object-contain rounded"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <div
            className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden"
            style={{
              background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)`,
            }}
          >
            <img
              src={images[currentImageIndex]}
              alt={product?.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl lg:text-3xl font-medium text-slate-800 mb-2 font-tbPop">
              {product.name}
            </h1>
            <p className="text-gray-600 text-sm font-tbPop">
              Quantity: {product.quantity}
            </p>
            <p className="text-gray-600 text-sm font-tbPop">
              Category: {product.category} - {product.subcategory}
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Price */}
        <div>
          <div className="text-xl lg:text-2xl font-semibold text-p font-tbPop">
            ₹{product.sellingPrice?.toLocaleString()}
          </div>
          <div className="text-base lg:text-lg text-slate-500 line-through font-tbPop">
            MRP ₹{product.mrpPrice?.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 font-tbPop">
            Subtotal: ₹{product.subtotal?.toLocaleString()}
          </div>
        </div>

        <hr />

        {/* Reviews & Messages */}
        <div className="space-y-3">
          {/* Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-bold text-gray-800 font-tbPop">
                4.5
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        star <= Math.floor(4.5)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      weight={star <= Math.floor(4.5) ? "fill" : "regular"}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs sm:text-sm font-tbPop">
                  Based on {ratings?.length || 0} reviews
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-colors font-tbPop"
                onClick={() => {
                  setActiveReview(!activeReview);
                }}
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Review Input */}
          {activeReview && (
            <form onSubmit={handleSubmit(handleAddRating)}>
              <div className="mt-3 flex flex-col gap-3 bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 font-tbPop">
                  Write a Review
                </h4>

                <div className="flex flex-col gap-2">
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.onChange(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= field.value
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              } hover:text-yellow-400 transition-colors`}
                              weight={star <= field.value ? "fill" : "regular"}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 font-tbPop">
                    Review
                  </label>
                  <Controller
                    name="reviewText"
                    control={control}
                    rules={{ required: "Please write a review" }}
                    render={({ field, fieldState }) => (
                      <div>
                        <CustomTextArea
                          placeholder="Write your review here..."
                          props={{
                            ...field,
                            rows: 3,
                          }}
                          style="font-tbPop"
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-xs mt-1 font-tbPop">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveReview(!activeReview);
                      reset();
                    }}
                    className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition font-tbPop"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* List of Submitted Reviews */}
          <div className="mt-4 space-y-4">
            <h5 className="font-semibold text-gray-800 font-tbPop">
              Product Reviews
            </h5>
            <div className="overflow-y-auto max-h-[300px] space-y-4">
              {ratingsLoading ? (
                <div className="flex justify-center items-center h-20">
                  {" "}
                  Loading
                  <PulseLoader color="#000" size={4} />
                </div>
              ) : ratings?.length > 0 ? (
                <>
                  {ratings?.map((review, i) => (
                    <div
                      key={i}
                      className="flex gap-3 bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={
                          review.user?.profileImage ||
                          "https://i.pravatar.cc/40?img=3"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-800 font-tbPop capitalize">
                            {review.user?.firstName}{" "}
                            {review.user?.lastName || "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-500 font-tbPop">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              size={16}
                              className={`${
                                star <= review?.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              } hover:text-yellow-400 transition-colors`}
                              weight={
                                star <= review?.rating ? "fill" : "regular"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm font-tbPop">
                          {review.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-slate-500 font-tbPop text-base text-center py-5 bg-slate-50 rounded-lg">
                  No reviews available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderServiceView = ({ service, serviceIndex, orderData }) => {
  const [ratings, setRatings] = useState([]);
  const [activeReview, setActiveReview] = useState(false);
  const [ratingsLoading, setRatingsLoading] = useState(false);
  const user = useSelector((state) => state.user.userDetails);

  const { handleSubmit, reset, control } = useForm({
    defaultValues: { rating: 0, reviewText: "" },
  });

  const fetchRatings = async () => {
    try {
      setRatingsLoading(true);
      const res = await getRatings({ service: service?.serviceId });
      console.log("⚡️🤯 ~ OrderViewModal.jsx:230 ~ fetchRatings ~ res:", res);
      setRatings(res?.data);
    } catch (err) {
      console.log("==========err in fetchRatings", err);
      setRatings([]);
    } finally {
      setRatingsLoading(false);
    }
  };

  const handleAddRating = async (data) => {
    if (data?.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      const payload = {
        user_id: user?._id,
        service_id: service?.serviceId,
        product_id: null,
        message: data?.reviewText,
        rating: data?.rating,
      };
      await addRating(payload).then((res) => {
        if (res?.success) {
          toast.success("Review Added Successfully");
          fetchRatings();
          reset();
          setActiveReview(false);
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("Failed to add Review");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [orderData?._id]);

  return (
    <div
      key={serviceIndex}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-lg p-4 border-b"
    >
      {/* Service Icon/Image */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div
            className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)`,
            }}
          >
            <div className="text-center p-8">
              <img
                className="
    w-[200px] h-[180px] 
    sm:w-[250px] sm:h-[180px] 
    md:w-[500px] md:h-[500px] 
    lg:w-[350px] lg:h-[300px] 
    xl:w-[400px] xl:h-[400px] 
    mx-auto mb-4 object-fit
  "
                src={service.serviceImage}
                alt="Service"
              />{" "}
              <h3 className="text-xl font-semibold text-gray-800 font-tbPop">
                {service.serviceName}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Service Info */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg text-black">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl lg:text-3xl font-medium text-slate-800 mb-2 font-tbPop">
                {service.serviceName}
              </h1>
              {/* <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(4.5)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"}`}
                                    weight={star <= Math.floor(4.5) ? "fill" : "regular"}
                                />
                            ))}
                            <span className="text-sm font-tbPop">
                                (4.5 out of 5)
                            </span>
                        </div> */}
              {service.astrologerName && (
                <p className="text-gray-600 text-sm font-tbPop mb-2">
                  Astrologer: {service.astrologerName}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <p className="flex items-center gap-4 font-tbPop">
              <Timer1 className="w-6 h-6" />
              <span>Duration: {service.durationInMinutes} minutes</span>
            </p>

            <p className="flex items-center gap-4 font-tbPop">
              <Calendar className="w-6 h-6" />
              <span>
                Date: {service.bookingDate} ({service.startTime} -{" "}
                {service.endTime})
              </span>
            </p>

            <p className="flex items-center gap-4 font-tbPop">
              <Icon icon="ph:device-mobile" className="w-6 h-6" />
              <span>Mode: {service.serviceType}</span>
            </p>

            <div className="flex items-center gap-4 font-tbPop">
              <span className="font-semibold">
                Price: ₹{service.servicePrice?.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-4 font-tbPop">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  service.astrologerStatus === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : service.astrologerStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Status: {service.astrologerStatus}
              </span>
            </div>

            {service.zoomLink && (
              <div className="flex items-center gap-4 mt-3">
                <Zoom className="w-6 h-6" />
                <a
                  href={service.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm break-words font-tbPop text-blue-600 hover:text-blue-800"
                >
                  Join Session
                </a>
              </div>
            )}

            {service.rejectReason && (
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-tbPop">
                  <strong>Rejection Reason:</strong> {service.rejectReason}
                </p>
              </div>
            )}
          </div>
        </div>

        <hr />

        {/* Reviews & Messages */}
        <div className="space-y-3">
          {/* Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-bold text-gray-800 font-tbPop">
                4.5
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        star <= Math.floor(4.5)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      weight={star <= Math.floor(4.5) ? "fill" : "regular"}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs sm:text-sm font-tbPop">
                  Based on {ratings?.length || 0} reviews
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-colors font-tbPop"
                onClick={() => {
                  setActiveReview(!activeReview);
                }}
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Review Input */}
          {activeReview && (
            <form onSubmit={handleSubmit(handleAddRating)}>
              <div className="mt-3 flex flex-col gap-3 bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 font-tbPop">
                  Write a Review
                </h4>

                <div className="flex flex-col gap-2">
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.onChange(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= field.value
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              } hover:text-yellow-400 transition-colors`}
                              weight={star <= field.value ? "fill" : "regular"}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 font-tbPop">
                    Review
                  </label>
                  <Controller
                    name="reviewText"
                    control={control}
                    rules={{ required: "Please write a review" }}
                    render={({ field, fieldState }) => (
                      <div>
                        <CustomTextArea
                          placeholder="Write your review here..."
                          props={{
                            ...field,
                            rows: 3,
                          }}
                          style="font-tbPop"
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-xs mt-1 font-tbPop">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveReview(!activeReview);
                      reset();
                    }}
                    className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition font-tbPop"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* List of Submitted Reviews */}
          <div className="mt-4 space-y-4">
            <h5 className="font-semibold text-gray-800 font-tbPop">
              Service Reviews
            </h5>
            <div className="overflow-y-auto max-h-[300px] space-y-4">
              {ratingsLoading ? (
                <div className="flex justify-center items-center h-20">
                  {" "}
                  Loading
                  <PulseLoader color="#000" size={4} />
                </div>
              ) : ratings?.length > 0 ? (
                <>
                  {ratings?.map((review, i) => (
                    <div
                      key={i}
                      className="flex gap-3 bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={
                          review.user?.profileImage ||
                          "https://i.pravatar.cc/40?img=3"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-800 font-tbPop capitalize">
                            {review.user?.firstName}{" "}
                            {review.user?.lastName || "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-500 font-tbPop">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              size={16}
                              className={`${
                                star <= review?.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              } hover:text-yellow-400 transition-colors`}
                              weight={
                                star <= review?.rating ? "fill" : "regular"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm font-tbPop">
                          {review.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-slate-500 font-tbPop text-base text-center py-5 bg-slate-50 rounded-lg">
                  No reviews available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderViewModal;
