import { useState } from "react";
import { X, Star, Share2 } from "lucide-react";
import ring from "../../assets/shop/product2.png";
import CustomTextArea from "../TextInput/CustomTextArea";
import download from "../../assets/download.png";
import delivery from "../../assets/deliver.png";
import { Calendar, Timer1, Zoom } from "iconsax-reactjs";
import { Icon } from "@iconify/react";
import verified from "../../assets/verify.png";


const Details = [
    {
        order: { _id: "ORD123456" },
        product: {
            name: "Crystal Showpiece",
            quantity: 2,
            mrpPrice: 2499,
            sellingPrice: 1799,
            discountPercentage: 28,
            reviews: { rating: 4.5, count: 120, list: [] },
        },
        images: [ring],
        status: "Delivered",
    },
    {
        order: { _id: "ORD123457" },
        product: {
            name: "Decorative Vase",
            quantity: 1,
            mrpPrice: 1999,
            sellingPrice: 1499,
            discountPercentage: 25,
            reviews: { rating: 4.2, count: 80, list: [] },
        },
        images: [ring],
        status: "Processing",
    },
    {
        order: { _id: "ORD123458" },
        product: {
            name: "Antique Clock",
            quantity: 1,
            mrpPrice: 3499,
            sellingPrice: 2999,
            discountPercentage: 15,
            reviews: { rating: 4.8, count: 50, list: [] },
        },
        images: [ring],
        status: "Shipped",
    },
];

const services = [
    {
        id: "s1",
        type: "Palmistry",
        duration: "30–60 minutes",
        date: "15th Sep, 2025 / 12:00PM – 01:00PM",
        mode: "Online",
        link: "zoommtg://zoom.us/join?confno=8529015",
    },
];

const OrderViewModal = ({ isOpen, onClose, modalType = "product" }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeReview, setActiveReview] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [allReviews, setAllReviews] = useState(
        Details.map((d) => d.product.reviews.list || [])
    );

    if (!isOpen) return null;

    const handleSubmitReview = (productIndex) => {
        if (!reviewText.trim()) return;
        const newReviews = [...allReviews];
        newReviews[productIndex] = [...newReviews[productIndex], reviewText];
        setAllReviews(newReviews);
        setReviewText("");
        setActiveReview(null);
    };

    const renderProductView = (
        { order, product, images, status },
        productIndex
    ) => (


        <div
            key={productIndex}
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
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 my-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(product.reviews?.rating || 0)
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 text-xs sm:text-sm font-tbPop">
                                Based on{" "}
                                {product.reviews?.count + allReviews[productIndex].length}{" "}
                                reviews
                            </span>
                        </div>

                        {/* <p className="text-gray-600 text-sm font-tbPop">
              Order ID: {order._id}
            </p> */}
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
                </div>

                <hr />

                {/* Reviews */}
                <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 font-tbPop">
                        Reviews
                    </h3>

                    {/* Rating */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xl sm:text-2xl font-bold text-gray-800 font-tbPop">
                                {product.reviews?.rating}
                            </span>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(product.reviews?.rating || 0)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600 text-xs sm:text-sm font-tbPop">
                                    Based on{" "}
                                    {product.reviews?.count + allReviews[productIndex].length}{" "}
                                    reviews
                                </span>
                            </div>
                        </div>

                        <button
                            className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-colors font-tbPop"
                            onClick={() =>
                                setActiveReview(
                                    activeReview === productIndex ? null : productIndex
                                )
                            }
                        >
                            Write a Review
                        </button>
                    </div>

                    {/* Review Input */}
                    {activeReview === productIndex && (
                        <div className="mt-3 flex flex-col gap-2">
                            <CustomTextArea
                                placeholder="Write your review here..."
                                props={{
                                    value: reviewText,
                                    onChange: (e) => setReviewText(e.target.value),
                                    rows: 3,
                                }}
                                style="font-tbPop"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setActiveReview(null)}
                                    className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSubmitReview(productIndex)}
                                    className="px-3 py-2 text-sm rounded-lg bg-black text-white transition font-tbPop"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* List of Submitted Reviews */}
                    {allReviews[productIndex].length > 0 && (
                        <div className="mt-4 space-y-4">
                            {allReviews[productIndex].map((rev, i) => (
                                <div key={i} className="flex gap-3 bg-gray-50 py-3 rounded-lg">
                                    {/* Avatar */}
                                    <img
                                        src="https://i.pravatar.cc/40?img=3" // You can replace with dynamic avatar
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        {/* Name + Rating + Time */}
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-800 font-tbPop">
                                                Krishna Kumar
                                            </span>
                                            <span className="text-xs text-gray-500 font-tbPop">
                                                1 day ago
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= 4
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        {/* Review Text */}
                                        <p className="text-gray-700 text-sm font-tbPop">{rev}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderServiceView = (
        { order, product, images, status },
        productIndex
    ) => (
        <div
            key={productIndex}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-lg p-4 border-b"
        >
            {/* Main Image */}
            <div className="flex flex-col lg:flex-row gap-4">
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

            {/* Service Info */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:leading-[1.8] ">
                    {services.map((s) => (
                        <div key={s.id} className="bg-white rounded-lg  text-black">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-xl lg:text-3xl font-medium text-slate-800 mb-2 font-tbPop">
                                        {s.type}
                                    </h1>
                                    <div className="flex items-center gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(product.reviews?.rating || 0)
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm font-tbPop">
                                            ({product.reviews?.rating || 0} out of 5)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="flex items-center gap-4 mb-2 font-tbPop">
                                <Timer1 className="w-6 h-6" />
                                <span>Session Duration: {s.duration}</span>
                            </p>

                            <p className="flex items-center gap-4 mb-2 font-tbPop">
                                <Calendar className="w-6 h-6" />
                                <span>Date: {s.date}</span>
                            </p>

                            <p className="flex items-center gap-4 mb-2 font-tbPop">
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
                                        className="text-sm break-words font-tbPop"
                                    >
                                        {s.link}
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <hr />

                {/* Reviews */}
                <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 font-tbPop">
                        Reviews
                    </h3>

                    {/* Rating */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xl sm:text-2xl font-bold text-gray-800 font-tbPop">
                                {product.reviews?.rating}
                            </span>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(product.reviews?.rating || 0)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600 text-xs sm:text-sm font-tbPop">
                                    Based on{" "}
                                    {product.reviews?.count + allReviews[productIndex].length}{" "}
                                    reviews
                                </span>
                            </div>
                        </div>

                        <button
                            className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-colors font-tbPop"
                            onClick={() =>
                                setActiveReview(
                                    activeReview === productIndex ? null : productIndex
                                )
                            }
                        >
                            Write a Review
                        </button>
                    </div>

                    {/* Review Input */}
                    {activeReview === productIndex && (
                        <div className="mt-3 flex flex-col gap-2">
                            <CustomTextArea
                                placeholder="Write your review here..."
                                props={{
                                    value: reviewText,
                                    onChange: (e) => setReviewText(e.target.value),
                                    rows: 3,
                                }}
                                style="font-tbPop"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setActiveReview(null)}
                                    className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSubmitReview(productIndex)}
                                    className="px-3 py-2 text-sm rounded-lg bg-black text-white transition font-tbPop"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* List of Submitted Reviews */}
                    {allReviews[productIndex].length > 0 && (
                        <div className="mt-4 space-y-4">
                            {allReviews[productIndex].map((rev, i) => (
                                <div key={i} className="flex gap-3 bg-gray-50 py-3 rounded-lg">
                                    {/* Avatar */}
                                    <img
                                        src="https://i.pravatar.cc/40?img=3" // You can replace with dynamic avatar
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        {/* Name + Rating + Time */}
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-800 font-tbPop">
                                                Krishna Kumar
                                            </span>
                                            <span className="text-xs text-gray-500 font-tbPop">
                                                1 day ago
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= 4
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        {/* Review Text */}
                                        <p className="text-gray-700 text-sm font-tbPop">{rev}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center sm:p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[70vh] overflow-y-auto scroll-hide">
                <div className="flex items-center justify-between border-b bg-gray-50 sticky top-0 z-10 p-4 sm:px-6">
                    <h2 className="text-lg font-semibold text-gray-800 font-tbPop">
                        {modalType === "product" ? "Order Details" : "Order Details"}
                    </h2>

                    <div className="flex items-center gap-x-4">
                        {modalType === "product" ? (
                            <>
                                <button className="flex items-center space-x-2 sm:p-2 bg-[#daede7] text-green-800 text-md sm:text-md font-tbPop rounded">
                                    <img src={delivery} alt="Delivery status" className="w-6 h-6" />
                                    <span className="hidden sm:inline">{Details[0].status}</span>
                                </button>
                                <button className="flex items-center space-x-2 sm:p-2 bg-[#dfddf0] text-blue-600 text-md sm:text-md font-tbPop rounded">
                                    <img src={download} alt="Download Invoice" className="w-6 h-6" />
                                    <span className="hidden sm:inline">Download Invoice</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="flex items-center space-x-2 sm:p-2 bg-[#e8f5e8] text-green-700 text-md sm:text-md font-tbPop rounded">
                                    <img src={verified} alt="" className="w-6 h-6" />
                                    <span className="hidden sm:inline">Session Completed</span>
                                </button>
                                {/* <button className="flex items-center space-x-2 sm:p-2 bg-[#f0f4ff] text-blue-700 text-md sm:text-md font-tbPop rounded">
                  <Zoom className="w-6 h-6" />
                  <span className="hidden sm:inline">Join Meeting</span>
                </button> */}
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

                {/* Products/Services List */}
                <div className="p-4 sm:p-6 space-y-6 max-h-[85vh] overflow-y-auto scroll-hide">
                    {Details.map((detail, productIndex) =>
                        modalType === "product"
                            ? renderProductView(detail, productIndex)
                            : renderServiceView(detail, productIndex)
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderViewModal;
