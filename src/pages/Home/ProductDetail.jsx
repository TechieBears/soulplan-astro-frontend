import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formBtn3 } from "../../utils/CustomClass";
import { ShoppingCartIcon, Star } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../components/Products/ProductCard";
import star from "../../assets/helperImages/star.png";
import sun from "../../assets/helperImages/sun.png";
import { addProductToCart, addRating, getPublicProductsSingle, getRatings } from "../../api";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCartProductCount } from "../../redux/Slices/cartSlice";
import Preloaders from "../../components/Loader/Preloaders";
import moment from "moment";
import CustomTextArea from "../../components/TextInput/CustomTextArea";
import { Controller, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const login = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userDetails);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("description");
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [ratingsLoading, setRatingsLoading] = useState(false);
    const dispatch = useDispatch();

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            rating: 0,
            reviewText: "",
        }
    });

    const fetchRatings = async () => {
        try {
            setRatingsLoading(true);
            const res = await getRatings({ product: id });
            setRatings(res?.data);
        } catch (err) {
            console.log("==========err in fetchRatings", err);
            setRatings([]);
        } finally {
            setRatingsLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getPublicProductsSingle(id);
                setRelatedProducts(res?.data?.relatedProducts);
                setProduct(res?.data);
            } catch (err) {
                setError(err.message || "Failed to fetch product details");
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        fetchRatings();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = async (productId) => {
        if (!login) {
            navigate("/login");
            return;
        }
        try {
            const res = await addProductToCart({ productId, quantity });
            console.log("==========res in handleAddToCart", res);
            if (res?.success) {
                dispatch(setCartProductCount(res?.data?.items?.length));
                toast.success(res?.message || "Product added to cart");
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        } catch (err) {
            console.log("==========err in handleAddToCart", err);
            toast.error(err?.message || "Something went wrong");
        }
    };

    const handleBuyNow = (productId) => {
        if (!login) {
            toast.error('Please login to continue with your purchase');
            return;
        }
        navigate('/buy-now', {
            state: {
                product: product,
                quantity: quantity
            }
        });
    };

    const handleAddRating = async (data) => {
        console.log("⚡️🤯 ~ ProductDetail.jsx:111 ~ handleAddRating ~ data:", data)
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
                rating: data?.rating
            }
            await addRating(payload).then(res => {
                if (res?.success) {
                    toast.success("Review Added Successfully");
                    fetchRatings();
                    reset();
                } else {
                    toast.error(res?.message || "Something went wrong");
                }
            })
        } catch (error) {
            console.log('Error submitting form:', error);
            toast.error("Failed to add Review");
        }
    }

    if (loading) {
        return (
            <div className="">
                <Preloaders className="bg-[#FFF9EF]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#FFF9EF] min-h-screen flex items-center justify-center pt-20 lg:pt-24 pb-10">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        Error Loading Product
                    </h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-[#FFF9EF] min-h-screen flex items-center justify-center pt-20 lg:pt-24 pb-10">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                        Product Not Found
                    </h2>
                    <p className="text-gray-500">
                        The product you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FFF9EF]  pt-20 lg:pt-24 pb-10 relative">
            <div className="absolute top-56 -left-16 scale-75  ">
                <img src={sun} alt="" className="w-full h-full object-fill" />
            </div>
            <div className="absolute bottom-40 right-0 scale-75">
                <img src={star} alt="" className="w-full h-full object-fill" />
            </div>
            <section className="w-full  lg:py-2 xl:py-4 px-5 xl:px-0">
                <div className="container mx-auto ">
                    <div className="grid grid-cols-1 md:grid-cols-12  gap-y-10 lg:gap-x-10">
                        <div className="hidden md:flex flex-col space-y-4 w-24 lg:w-16 xl:w-24 md:col-span-2 lg:col-span-1 xl:col-span-1">
                            {product?.images?.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`relative w-full  aspect-square  rounded overflow-hidden border-2 ${currentImageIndex === index
                                        ? "border-orange-500"
                                        : "border-transparent "
                                        }`}
                                    style={{
                                        background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)`,
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`${product?.name} ${index + 1}`}
                                        className="w-full h-full object-contain p-4 "
                                        loading="eager"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Right - Main Image */}
                        <div className="flex-1 md:col-span-10 lg:col-span-4 xl:col-span-5">
                            <div
                                className="relative w-full  aspect-square bg-gray-50 rounded-lg overflow-hidden"
                                style={{
                                    background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)`,
                                }}
                            >
                                <img
                                    src={
                                        product?.images?.[currentImageIndex] || product?.images?.[0]
                                    }
                                    alt={product?.name}
                                    className="w-full h-full object-contain p-4 "
                                    loading="eager"
                                />
                                {product?.discountPercentage > 0 && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {product?.discountPercentage}% OFF
                                    </div>
                                )}
                            </div>

                            {/* Mobile Thumbnails */}
                            <div className="md:hidden flex space-x-2 mt-4 overflow-x-auto pb-2">
                                {product?.images?.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-16 h-16 aspect-square rounded overflow-hidden border-2 flex-shrink-0 ${currentImageIndex === index
                                            ? "border-orange-500"
                                            : "border-transparent "
                                            }`}
                                        style={{
                                            background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)`,
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product?.name} ${index + 1}`}
                                            className="w-full h-full object-contain p-1 "
                                            loading="eager"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right - Product Info */}
                        <div className="col-span-6 md:col-span-12 lg:col-span-6">
                            {/* Title & Price */}
                            <div className="mb-4">
                                <div className="text-sm text-gray-500 mb-2 capitalize  font-tbPop">
                                    {product?.category?.name}{" "}
                                    {product?.subcategory?.name &&
                                        `> ${product?.subcategory?.name}`}
                                </div>
                                <h2 className="text-xl lg:text-3xl font-medium font-tbPop text-slate-800 mb-2 capitalize">
                                    {product?.name}
                                </h2>
                                <div className="flex items-center space-x-4 mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl lg:text-2xl font-semibold font-tbPop text-p">
                                            ₹{product?.sellingPrice?.toLocaleString()}
                                        </span>
                                        {product?.mrpPrice > product?.sellingPrice && (
                                            <span className="text-base lg:text-lg text-slate-400 font-tbPop line-through">
                                                ₹{product?.mrpPrice?.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    {product?.discountPercentage > 0 && (
                                        <span className="bg-red-100 text-red-600 px-2 py-1  text-sm lg:text-base font-tbPop font-semibold capitalize">
                                            {product?.discountPercentage}% OFF
                                        </span>
                                    )}
                                </div>
                                {/* Stock Status */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div
                                        className={`w-3 h-3 rounded-full ${product?.stock > 0 ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    ></div>
                                    <span
                                        className={`font-medium text-sm ${product?.stock > 0 ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {product?.stock > 0
                                            ? `In Stock `
                                            : "Out of Stock"}
                                    </span>
                                </div>
                            </div>


                            {/* Product Description */}
                            <div className="space-y-2 mb-4">
                                {(() => {
                                    return (
                                        <>
                                            <p className="text-sm text-slate-500 font-tbPop leading-relaxed line-clamp-10">
                                                {product?.description}
                                            </p>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="flex items-center w-full flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-slate-300 rounded-md overflow-hidden w-[150px] h-[40px]">
                                    {/* Minus Button */}
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="flex-1 text-center text-xl font-semibold hover:bg-gray-100 transition"
                                    >
                                        -
                                    </button>

                                    {/* Quantity Display */}
                                    <div className="w-12 text-center border-l border-r border-slate-300 font-medium text-gray-900">
                                        {quantity}
                                    </div>

                                    {/* Plus Button */}
                                    <button
                                        onClick={() =>
                                            setQuantity(Math.min(product?.stock || 1, quantity + 1))
                                        }
                                        className="flex-1 text-center text-xl font-semibold hover:bg-gray-100 transition"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 !w-full flex-row-reverse md:flex-row">
                                    <button className={`${formBtn3} `} disabled={product?.stock === 0} onClick={() => handleBuyNow(product?._id)}>Buy Now</button>
                                    <button
                                        className={`h-[48px] lg:h-[46px] xl:h-[51px] py-3 text-white !font-medium !tracking-normal text-sm xl:text-base bg-primary-gradient hover:opacity-90  disabled:opacity-50  transition  w-full rounded relative `}
                                        onClick={() => handleAddToCart(product?._id)}
                                        disabled={product?.stock === 0}
                                        style={{
                                            background:
                                                product?.stock === 0
                                                    ? "#9ca3af"
                                                    : `linear-gradient(90deg, rgba(0, 121, 208, 0.6) -12.5%, rgba(158, 82, 216, 0.6) 30.84%, rgba(218, 54, 92, 0.6) 70.03%, rgba(208, 73, 1, 0.6) 111%)`,
                                        }}
                                    >
                                        <div className="flex items-center justify-center space-x-1.5 bg-[#FFF9EF]  rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[46px] lg:h-[43px] xl:h-[48px] w-[99%] z-10">
                                            <ShoppingCartIcon className="text-black text-xl lg:text-xl" />
                                            <span className="text-base xl:text-lg font-tbPop text-p">
                                                {product?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="text-sm lg:text-base text-black space-y-1 mt-5">
                                <p>
                                    <span className="font-medium text-slate-500 font-tbPop">
                                        Category:{" "}
                                    </span>
                                    {product?.category?.name}
                                </p>
                                <p>
                                    <span className="font-medium text-slate-500 font-tbPop">
                                        Subcategory:{" "}
                                    </span>
                                    {product?.subcategory?.name}
                                </p>
                                <p>
                                    <span className="font-medium text-slate-500 font-tbPop">
                                        Product ID:{" "}
                                    </span>{" "}
                                    {product?._id}
                                </p>
                                <p>
                                    <span className="font-medium text-slate-500 font-tbPop">
                                        Item Type:{" "}
                                    </span>{" "}
                                    {product?.itemType}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-8 lg:mt-12 w-full">
                        <div className="border-b border-slate-200/60">
                            <nav className="flex sm:space-x-4 lg:space-x-8">
                                <button
                                    onClick={() => setActiveTab("description")}
                                    className={`relative py-3 px-1 text-sm lg:text-base font-medium transition-colors ${activeTab === "description"
                                        ? "text-p"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    Description
                                </button>
                                <button
                                    onClick={() => setActiveTab("specifications")}
                                    className={`relative py-3 px-1 text-sm lg:text-base font-medium transition-colors ${activeTab === "specifications"
                                        ? "text-p"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    Additional Information
                                </button>
                                <button
                                    onClick={() => setActiveTab("reviews")}
                                    className={`relative py-3 px-1 text-sm lg:text-base font-medium transition-colors ${activeTab === "reviews"
                                        ? "text-p"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    Reviews ({ratings?.length || 0})
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="py-5">
                            {activeTab === "description" && (
                                <div className="space-y-4">
                                    <p className="text-slate-600 leading-relaxed font-tbPop font-medium text-sm">
                                        {product?.description}
                                    </p>
                                    {product?.highlights && (
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-blue-900 mb-2">
                                                Key Highlights
                                            </h4>
                                            <p className="text-blue-800 text-sm">
                                                {product?.highlights}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "specifications" && (
                                <div className="space-y-4">
                                    {/* {product?.specification ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.entries(product.specification).map(
                                                ([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="flex justify-between py-2 border-b border-gray-100"
                                                    >
                                                        <span className="font-medium text-slate-500 font-tbPop">
                                                            {key}:
                                                        </span>
                                                        <span className="text-slate-600 font-tbPop text-sm">
                                                            {value}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 font-tbPop text-sm">
                                            No specifications available
                                        </p>
                                    )}
                                    {product?.additionalInfo && (
                                        <div className="mt-6">
                                            <h4 className="font-semibold text-slate-700 mb-2">
                                                Additional Information
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed font-tbPop font-medium text-sm">
                                                {product?.additionalInfo}
                                            </p>
                                        </div>
                                    )} */}
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="">
                                    {
                                        login ? (
                                            <form onSubmit={handleSubmit(handleAddRating)}>
                                                <div className="mt-3 flex flex-col gap-3 p-4 bg-white/30 rounded-lg">
                                                    <h4 className="font-semibold text-gray-800 font-tbPop">Write a Review</h4>

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
                                                                                className={`w-6 h-6 ${star <= field.value
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
                                                        <label className="text-sm font-medium text-gray-700 font-tbPop">Review</label>
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
                                        ) : (
                                            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        Add review
                                                    </h3>
                                                    <button
                                                        onClick={() => navigate("/login")}
                                                        className={`${formBtn3} !w-auto py-1 `}
                                                    >
                                                        Login to Review
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }


                                    <div className="space-y-6 mt-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold font-tbPop text-black">
                                                Customer Reviews
                                            </h3>
                                        </div>

                                        {/* Sample Reviews */}
                                        {ratingsLoading ? <div className="flex justify-center items-center h-40"> <PulseLoader color="#000" size={4} /></div> :
                                            ratings?.length > 0 ?
                                                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                                    {ratings?.map((review) => (
                                                        <div
                                                            key={review?._id}
                                                            className="border-b border-gray-100 pb-4"
                                                        >
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <div className="flex">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <Star
                                                                            size={16}
                                                                            className={`${star <= review?.rating
                                                                                ? "text-yellow-400 fill-current"
                                                                                : "text-gray-300"
                                                                                } hover:text-yellow-400 transition-colors`}
                                                                            weight={star <= review?.rating ? "fill" : "regular"}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="font-medium font-tbPop capitalize text-sm ">
                                                                    {review?.user?.firstName || "----- ----- "} {review?.user?.lastName || "----- ----- "}
                                                                </span>
                                                                <span className="text-sm text-gray-500 capitalize">
                                                                    • {moment(review?.createdAt).format("DD MMM YYYY")}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-600 font-tbPop text-sm">
                                                                {review?.message}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div> :
                                                <div className="text-slate-500 font-tbPop text-base text-center py-20 bg-white/60 rounded-lg">
                                                    No reviews available
                                                </div>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <div className="mt-10 lg:mt-16">
                        <h2 className="text-lg lg:text-xl font-semibold text-p mb-3 lg:mb-8">
                            Related Products
                        </h2>
                        <RelatedProducts data={relatedProducts} />
                    </div>
                </div>
            </section >
        </div >
    );
};

const RelatedProducts = ({ data }) => {
    return (
        <div className="">
            <Swiper
                slidesPerView={"auto"}
                freeMode={true}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="mySwiper !py-3 !px-3 w-full"
                modules={[Autoplay, Navigation, FreeMode]}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 4 },
                    480: { slidesPerView: 1, spaceBetween: 6 },
                    640: { slidesPerView: 1, spaceBetween: 8 },
                    768: { slidesPerView: 3, spaceBetween: 10 },
                    1024: { slidesPerView: 4, spaceBetween: 10 },
                    1280: { slidesPerView: 4, spaceBetween: 10 },
                }}
            >
                {data &&
                    data?.map((relatedProduct, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard product={relatedProduct} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default ProductDetail;
