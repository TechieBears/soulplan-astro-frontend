import { useState, Fragment, useEffect } from "react";
import { X, Star, Share2, MessageCircle, Send } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import ring from "../../assets/shop/product2.png";
import CustomTextArea from "../TextInput/CustomTextArea";
import download from "../../assets/download.png";
import delivery from "../../assets/deliver.png";
import { Calendar, Timer1, Zoom } from "iconsax-reactjs";
import { Icon } from "@iconify/react";
import verified from "../../assets/verify.png";
import { Dialog, Transition } from "@headlessui/react";

const OrderViewModal = ({ isOpen, onClose, orderData = null, orderType = "product" }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeReview, setActiveReview] = useState(null);
    const [activeMessage, setActiveMessage] = useState(null);
    const [allReviews, setAllReviews] = useState([]);
    const [messages, setMessages] = useState([]);

    const reviewForm = useForm({
        defaultValues: {
            rating: 5,
            reviewText: "",
        }
    });

    const messageForm = useForm({
        defaultValues: {
            message: "",
        }
    });

    useEffect(() => {
        if (orderData) {
            if (orderType === "product") {
                setAllReviews(orderData.items?.map(() => []) || []);
            } else {
                setAllReviews(orderData.services?.map(() => []) || []);
            }
            setMessages([]);
        }
    }, [orderData, orderType]);

    if (!isOpen || !orderData) return null;

    const handleSubmitReview = (itemIndex) => {
        reviewForm.handleSubmit((data) => {
            const newReviews = [...allReviews];
            const reviewWithRating = {
                text: data.reviewText,
                rating: data.rating,
                date: new Date().toISOString(),
                userName: "Current User",
            };
            newReviews[itemIndex] = [...(newReviews[itemIndex] || []), reviewWithRating];
            setAllReviews(newReviews);
            reviewForm.reset();
            setActiveReview(null);
        })();
    };

    const handleSubmitMessage = (itemIndex) => {
        messageForm.handleSubmit((data) => {
            const newMessage = {
                text: data.message,
                date: new Date().toISOString(),
                sender: "user",
                userName: "You",
            };
            setMessages(prev => [...prev, newMessage]);
            messageForm.reset();
        })();
    };

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

    const renderProductView = (item, itemIndex) => {
        const product = item.product;
        const images = product.images || [ring];

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
                                className={`relative w-full aspect-square rounded overflow-hidden border-2 ${currentImageIndex === index
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
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 font-tbPop">
                            Reviews & Messages
                        </h3>

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
                                                className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(4.5)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-xs sm:text-sm font-tbPop">
                                        Based on{" "}
                                        {(allReviews[itemIndex]?.length || 0)}{" "}
                                        reviews
                                    </span>
                                </div>
                            </div>

                            {/* <div className="flex gap-2">
                                <button
                                    className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-colors font-tbPop"
                                    onClick={() =>
                                        setActiveReview(
                                            activeReview === itemIndex ? null : itemIndex
                                        )
                                    }
                                >
                                    Write a Review
                                </button>
                            </div> */}
                        </div>

                        {activeReview === itemIndex && (
                            <div className="mt-3 flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 font-tbPop">Write a Review</h4>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700 font-tbPop">Rating</label>
                                    <Controller
                                        name="rating"
                                        control={reviewForm.control}
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
                                                            className={`w-6 h-6 ${star <= field.value
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                                } hover:text-yellow-400 transition-colors`}
                                                        />
                                                    </button>
                                                ))}
                                                <span className="ml-2 text-sm text-gray-600 font-tbPop">
                                                    {field.value} star{field.value !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700 font-tbPop">Review</label>
                                    <Controller
                                        name="reviewText"
                                        control={reviewForm.control}
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
                                            setActiveReview(null);
                                            reviewForm.reset();
                                        }}
                                        className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSubmitReview(itemIndex)}
                                        className="px-3 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition font-tbPop"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        )}

                        {(allReviews[itemIndex]?.length > 0) && (
                            <div className="mt-4 space-y-4">
                                <h5 className="font-semibold text-gray-800 font-tbPop">Customer Reviews</h5>
                                {allReviews[itemIndex].map((review, i) => (
                                    <div key={i} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                                        <img
                                            src="https://i.pravatar.cc/40?img=3"
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-gray-800 font-tbPop">
                                                    {review.userName || "Anonymous"}
                                                </span>
                                                <span className="text-xs text-gray-500 font-tbPop">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 mb-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= (review.rating || 5)
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 text-sm font-tbPop">{review.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderServiceView = (service, serviceIndex) => {
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
                                <Calendar className="w-16 h-16 mx-auto mb-4 text-purple-600" />
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
                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(4.5)
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                    <span className="text-sm font-tbPop">
                                        (4.5 out of 5)
                                    </span>
                                </div>
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
                                <span>Date: {service.bookingDate} ({service.startTime} - {service.endTime})</span>
                            </p>

                            <p className="flex items-center gap-4 font-tbPop">
                                <Icon icon="ph:device-mobile" className="w-6 h-6" />
                                <span>Mode: {service.serviceType}</span>
                            </p>

                            <div className="flex items-center gap-4 font-tbPop">
                                <span className="font-semibold">Price: ₹{service.servicePrice?.toLocaleString()}</span>
                            </div>

                            <div className="flex items-center gap-4 font-tbPop">
                                <span className={`px-2 py-1 rounded text-sm ${service.astrologerStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    service.astrologerStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
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
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 font-tbPop">
                            Service Reviews & Messages
                        </h3>

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
                                                className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(4.5)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-xs sm:text-sm font-tbPop">
                                        Based on{" "}
                                        {(allReviews[serviceIndex]?.length || 0)}{" "}
                                        reviews
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-colors font-tbPop"
                                    onClick={() =>
                                        setActiveReview(
                                            activeReview === serviceIndex ? null : serviceIndex
                                        )
                                    }
                                >
                                    Write a Review
                                </button>
                                <button
                                    className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors font-tbPop flex items-center gap-1"
                                    onClick={() =>
                                        setActiveMessage(
                                            activeMessage === serviceIndex ? null : serviceIndex
                                        )
                                    }
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Message
                                </button>
                            </div>
                        </div>

                        {/* Review Input */}
                        {activeReview === serviceIndex && (
                            <div className="mt-3 flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 font-tbPop">Write a Review</h4>

                                {/* Rating Selection */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700 font-tbPop">Rating</label>
                                    <Controller
                                        name="rating"
                                        control={reviewForm.control}
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
                                                            className={`w-6 h-6 ${star <= field.value
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                                } hover:text-yellow-400 transition-colors`}
                                                        />
                                                    </button>
                                                ))}
                                                <span className="ml-2 text-sm text-gray-600 font-tbPop">
                                                    {field.value} star{field.value !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Review Text */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700 font-tbPop">Review</label>
                                    <Controller
                                        name="reviewText"
                                        control={reviewForm.control}
                                        rules={{ required: "Please write a review" }}
                                        render={({ field, fieldState }) => (
                                            <div>
                                                <CustomTextArea
                                                    placeholder="Write your service review here..."
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
                                            setActiveReview(null);
                                            reviewForm.reset();
                                        }}
                                        className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSubmitReview(serviceIndex)}
                                        className="px-3 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition font-tbPop"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Message Input */}
                        {activeMessage === serviceIndex && (
                            <div className="mt-3 flex flex-col gap-3 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 font-tbPop">Send a Message</h4>

                                <div className="flex flex-col gap-2">
                                    <Controller
                                        name="message"
                                        control={messageForm.control}
                                        rules={{ required: "Please enter a message" }}
                                        render={({ field, fieldState }) => (
                                            <div>
                                                <CustomTextArea
                                                    placeholder="Type your message to the astrologer..."
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
                                            setActiveMessage(null);
                                            messageForm.reset();
                                        }}
                                        className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSubmitMessage(serviceIndex)}
                                        className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-tbPop flex items-center gap-1"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* List of Submitted Reviews */}
                        {(allReviews[serviceIndex]?.length > 0) && (
                            <div className="mt-4 space-y-4">
                                <h5 className="font-semibold text-gray-800 font-tbPop">Service Reviews</h5>
                                {allReviews[serviceIndex].map((review, i) => (
                                    <div key={i} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                                        <img
                                            src="https://i.pravatar.cc/40?img=3"
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-gray-800 font-tbPop">
                                                    {review.userName || "Anonymous"}
                                                </span>
                                                <span className="text-xs text-gray-500 font-tbPop">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 mb-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= (review.rating || 5)
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 text-sm font-tbPop">{review.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Messages */}
                        {messages.length > 0 && (
                            <div className="mt-4 space-y-4">
                                <h5 className="font-semibold text-gray-800 font-tbPop">Messages</h5>
                                {messages.map((message, i) => (
                                    <div key={i} className="flex gap-3 bg-blue-50 p-3 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-gray-800 font-tbPop">
                                                    {message.userName}
                                                </span>
                                                <span className="text-xs text-gray-500 font-tbPop">
                                                    {new Date(message.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 text-sm font-tbPop">{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
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
                                            {orderType === "product" ? "Product Order Details" : "Service Order Details"}
                                        </h2>
                                        <p className="text-sm text-gray-600 font-tbLex">
                                            Order ID: {orderType === "product" ? orderData._id : orderData.orderId}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-x-4">
                                        {orderType === "product" ? (
                                            <>
                                                <button className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${getOrderStatus() === 'DELIVERED' ? 'bg-green-100 text-green-500' :
                                                    getOrderStatus() === 'SHIPPED' ? 'bg-blue-100 text-blue-500' :
                                                        getOrderStatus() === 'PENDING' ? 'bg-orange-100 text-orange-500' :
                                                            'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    <img src={delivery} alt="Order status" className="w-6 h-6" />
                                                    <span className="hidden sm:inline">{getOrderStatus()}</span>
                                                </button>
                                                <button className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${getPaymentStatus() === 'PAID' ? 'bg-green-100 text-green-500' :
                                                    'bg-red-100 text-red-500'
                                                    }`}>
                                                    <span className="hidden sm:inline">Payment: {getPaymentStatus()}</span>
                                                </button>
                                                <button className="flex items-center space-x-2 sm:p-2 bg-blue-100 text-blue-500 text-md sm:text-md font-tbLex capitalize font-medium rounded">
                                                    <img src={download} alt="Download Invoice" className="w-6 h-6" />
                                                    <span className="hidden sm:inline">Download Invoice</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${getOrderStatus() === 'confirmed' ? 'bg-green-100 text-green-500' :
                                                    getOrderStatus() === 'pending' ? 'bg-yellow-100 text-yellow-500' :
                                                        'bg-green-100 text-green-500'
                                                    }`}>
                                                    <img src={verified} alt="" className="w-6 h-6" />
                                                    <span className="hidden sm:inline">Status: {getOrderStatus()}</span>
                                                </button>
                                                <button className={`flex items-center space-x-2 sm:p-2 text-md sm:text-md font-tbLex capitalize font-medium rounded ${getPaymentStatus() === 'paid' ? 'bg-green-100 text-green-500' :
                                                    'bg-yellow-100 text-yellow-500'
                                                    }`}>
                                                    <span className="hidden sm:inline">Payment: {getPaymentStatus()}</span>
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
                                        {orderType === "product" ? (
                                            // Render product items
                                            orderData.items?.map((item, itemIndex) =>
                                                renderProductView(item, itemIndex)
                                            )
                                        ) : (
                                            // Render service items
                                            orderData.services?.map((service, serviceIndex) =>
                                                renderServiceView(service, serviceIndex)
                                            )
                                        )}

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
                                                            <span className="font-tbPop">₹{orderData.totalAmount?.toLocaleString()}</span>
                                                        </div>
                                                        {orderData.amount?.gst && (
                                                            <div className="flex justify-between">
                                                                <span className="font-tbLex">GST:</span>
                                                                <span className="font-tbPop">₹{orderData.amount.gst?.toLocaleString()}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                                            <span className="font-tbLex">Total:</span>
                                                            <span className="font-tbPop">₹{orderData.finalAmount?.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="font-tbLex">Payment Method:</span>
                                                            <span className="font-tbPop">{orderData.paymentMethod}</span>
                                                        </div>
                                                        {orderData.address && (
                                                            <div className="mt-3 p-3 bg-white rounded border">
                                                                <h4 className="font-semibold font-tbLex mb-1">Delivery Address:</h4>
                                                                <p className="text-sm text-gray-600 font-tbPop">
                                                                    {orderData.address.city}, {orderData.address.state}, {orderData.address.country}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex justify-between font-semibold text-lg">
                                                            <span className="font-tbLex">Total Amount:</span>
                                                            <span className="font-tbPop">₹{orderData.totalAmount?.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="font-tbPop">Payment ID:</span>
                                                            <span className="font-tbPop">{orderData.paymentId}</span>
                                                        </div>
                                                        {orderData.paymentDetails?.note && (
                                                            <div className="mt-2 p-2 bg-yellow-50 rounded">
                                                                <p className="text-sm text-yellow-800 font-tbPop">
                                                                    <strong>Note:</strong> {orderData.paymentDetails.note}
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

export default OrderViewModal;
