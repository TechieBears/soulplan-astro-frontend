import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaChevronUp, FaChevronDown } from "react-icons/fa";
import product1 from "../../assets/shop/product1.png";
import product2 from "../../assets/shop/product2.png";
import product3 from "../../assets/shop/product3.png";
import product4 from "../../assets/shop/product4.png";
import product5 from "../../assets/shop/product5.png";
import product6 from "../../assets/shop/product6.png";
import { formBtn3 } from "../../utils/CustomClass";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import ProductCard from '../../components/Products/ProductCard';
import star from "../../assets/helperImages/star.png"
import sun from "../../assets/helperImages/sun.png"

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Toggle description expansion
    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    // Function to truncate text by lines (approximately)
    const truncateTextByLines = (text, lineLimit = 20) => {
        // Estimate characters per line (adjust based on your design)
        const avgCharsPerLine = 80; // Approximate characters per line
        const maxChars = lineLimit * avgCharsPerLine;

        if (text.length <= maxChars) return { truncated: text, needsTruncation: false };

        // Find a good breaking point (end of sentence or word)
        let truncateAt = maxChars;
        while (truncateAt > 0 && text[truncateAt] !== ' ' && text[truncateAt] !== '.') {
            truncateAt--;
        }

        return {
            truncated: text.substring(0, truncateAt) + '...',
            needsTruncation: true
        };
    };

    // Mock product data - replace with actual data from API
    const products = {
        P4000: {
            id: "P4000",
            title: "Sacred Rudraksha Bead",
            price: 3520,
            oldPrice: 4090,
            rating: 4,
            reviewCount: 24,
            description:
                "Rudraksha is a sacred seed revered in Vedic traditions, known for its spiritual and healing properties. Worn by sages and seekers for centuries, it is believed to bring peace, clarity, and protection. This authentic Rudraksha bead is carefully sourced, retaining its natural texture and energy.",
            images: [product4, product2, product3],
            category: "Amulets",
            inStock: true,
            stockCount: 15,
            sku: "P4000",
            tags: ["Spiritual", "Healing", "Meditation"],
            features: [
                "Authentic natural Rudraksha bead",
                "Rooted in Vedic traditions & Indian culture",
                "Symbol of divine energy, meditation & healing",
                "Hand-selected and lab-certified for authenticity",
                "Ideal for spiritual practices, yoga, and daily wear",
            ],
            specifications: {
                Type: "Natural Rudraksha Bead",
                Origin: "India & Nepal (sacred regions)",
                Size: "10–20 mm (approx.)",
                Certification: "Authenticity lab-certified",
                Material: "100% Natural Seed",
                Use: "Meditation, Healing, Daily Wear, Spiritual Practices",
                Weight: "250 grams",
                Color: "Brown to Dark Brown",
                Shape: "Round, slightly irregular",
            },
        },
        P4001: {
            id: "P4001",
            title: "James Stone Crystal",
            price: 3520,
            oldPrice: 4090,
            rating: 5,
            reviewCount: 18,
            description:
                "A powerful healing crystal known for its protective and grounding properties. Perfect for meditation and energy work. Rudraksha is a sacred seed revered in Vedic traditions, known for its spiritual and healing properties. Worn by sages and seekers for centuries, it is believed to bring peace, clarity, and protection. This authentic Rudraksha bead is carefully sourced, retaining its natural texture and energy. Rudraksha is a sacred seed ",
            images: [product2, product1, product3],
            category: "Gemstone",
            inStock: true,
            stockCount: 8,
            sku: "P4001",
            tags: ["Crystal", "Healing", "Protection"],
            features: [
                "Natural healing crystal",
                "Protective and grounding properties",
                "Perfect for meditation",
                "Energy cleansing abilities",
                "Ethically sourced",
            ],
            specifications: {
                Type: "Natural Crystal",
                Origin: "Brazil",
                Size: "15–25 mm",
                Certification: "Gemological certified",
                Material: "100% Natural Stone",
                Use: "Meditation, Healing, Protection",
                Weight: "180 grams",
                Color: "Deep Blue",
                Shape: "Polished",
            },
        },
    };

    const product = products[id] || products["P4000"];

    // Related products data
    const relatedProducts = [
        {
            id: "P4001",
            title: "Rudraksha",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product1,
            inStock: true,
        },
        {
            id: "P4002",
            title: "James stone",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product2,
            inStock: true,
        },
        {
            id: "P4003",
            title: "Exclusive James Stone",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product3,
            inStock: true,
        },
        {
            id: "P4004",
            title: "Bracelets",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product4,
            inStock: true,
        },
        {
            id: "P4005",
            title: "Sacred Gemstone",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product5,
            inStock: true,
        },
        {
            id: "P4006",
            title: "Spiritual Pendant",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product6,
            inStock: true,
        },
        {
            id: "P4006",
            title: "Spiritual Pendant",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product6,
            inStock: true,
        },
        {
            id: "P4006",
            title: "Spiritual Pendant",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product6,
            inStock: true,
        },
        {
            id: "P4006",
            title: "Spiritual Pendant",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product6,
            inStock: true,
        },
        {
            id: "P4006",
            title: "Spiritual Pendant",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product6,
            inStock: true,
        },
        {
            id: "P4006",
            title: "Spiritual Pendant",
            price: 3520,
            oldPrice: 4000,
            rating: 5,
            image: product6,
            inStock: true,
        },
    ];

    const handleQuantityChange = (increment) => {
        const newQuantity = increment ? quantity + 1 : Math.max(1, quantity - 1);
        setQuantity(newQuantity);
    };

    const navigateToImage = (direction) => {
        if (direction === "next") {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
            );
        }
    };

    const addToCart = () => {
        // Add to cart logic here
        console.log(`Added ${quantity} ${product.title} to cart`);
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 304; // Card width (288px) + spacing (16px)
            if (direction === "left") {
                carouselRef.current.scrollLeft -= scrollAmount;
            } else {
                carouselRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    const handleAddToCart = (productId) => {
        console.log(`Added product ${productId} to cart`);
        // Add to cart logic here
    };

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
                    {/* Product Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12  gap-y-10 lg:gap-x-10">
                        {/* Left - Thumbnails */}
                        <div className="hidden md:flex flex-col space-y-4 w-24 lg:w-16 xl:w-24 md:col-span-2 lg:col-span-1 xl:col-span-1">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)} className={`relative w-full  aspect-square  rounded overflow-hidden border-2 ${currentImageIndex === index
                                        ? "border-orange-500"
                                        : "border-transparent "
                                        }`} style={{ background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)` }}>
                                    <img
                                        src={img}
                                        alt={`${product.title} ${index + 1}`}
                                        className="w-full h-full object-contain p-4 "
                                        loading="eager"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Right - Main Image */}
                        <div className="flex-1 md:col-span-10 lg:col-span-4 xl:col-span-5">
                            <div className="relative w-full  aspect-square bg-gray-50 rounded-lg overflow-hidden" style={{ background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)` }}>
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.title}
                                    className="w-full h-full object-contain p-4 "
                                    loading="eager"
                                />
                            </div>

                            {/* Mobile Thumbnails */}
                            <div className="md:hidden flex space-x-2 mt-4 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)} className={`relative w-full  aspect-square  rounded overflow-hidden border-2 ${currentImageIndex === index
                                            ? "border-orange-500"
                                            : "border-transparent "
                                            }`} style={{ background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)` }}>
                                        <img
                                            src={img}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-full object-contain p-4 "
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
                                <h2 className="text-xl lg:text-3xl font-medium font-tbPop text-slate-800 mb-2">
                                    {product.title}
                                </h2>
                                <div className="flex items-center space-x-4 mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl lg:text-2xl font-semibold font-tbPop text-p">
                                            ₹{product.price.toLocaleString()}
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-base lg:text-lg text-slate-500 font-tbPop line-through">
                                                ₹{product.oldPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    {product.oldPrice && (
                                        <span className="bg-red-100 text-red-600 px-2 py-1  text-sm lg:text-base font-tbPop font-semibold">
                                            {Math.round(
                                                ((product.oldPrice - product.price) / product.oldPrice) *
                                                100
                                            )}
                                            % OFF
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stock Status */}
                            {/* <div className="mb-4">
              {product.inStock ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <FaCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </div>
              ) : (
                <div className="text-red-600 text-sm font-medium">
                  Out of Stock
                </div>
              )}
            </div> */}

                            {/* Product Description */}
                            <div className="space-y-2 mb-4">
                                {(() => {
                                    const fullDescription = product?.description;
                                    const { truncated, needsTruncation } = truncateTextByLines(fullDescription, 10);

                                    return (
                                        <>
                                            <p className="text-sm text-slate-500 font-tbPop leading-relaxed whitespace-pre-line">
                                                {isDescriptionExpanded ? fullDescription : truncated}
                                            </p>

                                        </>
                                    );
                                })()}
                            </div>

                            <div className="flex items-center w-full space-x-2 flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0">
                                <div className="flex h-[51px]  items-center rounded-md bg-white overflow-hidden justify-between   shadow-md w-full md:w-auto">
                                    <div className="px-5 py-1 text-center font-medium text-gray-900 ">
                                        {quantity}
                                    </div>
                                    <div className="flex flex-col">
                                        <button
                                            className="w-full px-10 py-1 text-gray-600  transition-colors flex items-center justify-center"
                                        >
                                            <FaChevronUp className="w-3 h-3" />
                                        </button>
                                        <button
                                            className="w-full px-10 py-1 text-gray-600  transition-colors flex items-center justify-center"
                                        >
                                            <FaChevronDown className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-3 !w-full flex-row-reverse md:flex-row">
                                    <button className={`${formBtn3} `}>Buy Now</button>
                                    <button
                                        className={`h-[48px] lg:h-[46px] xl:h-[51px] py-3 text-white !font-medium !tracking-normal text-sm xl:text-base bg-primary-gradient hover:opacity-90  disabled:opacity-50  transition  w-full rounded relative `}
                                        onClick={handleAddToCart}
                                        style={{
                                            background: `linear-gradient(90deg, rgba(0, 121, 208, 0.6) -12.5%, rgba(158, 82, 216, 0.6) 30.84%, rgba(218, 54, 92, 0.6) 70.03%, rgba(208, 73, 1, 0.6) 111%)`
                                        }}
                                    >
                                        <div className="flex items-center justify-center space-x-1.5 bg-[#FFF9EF]  rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[46px] lg:h-[43px] xl:h-[48px] w-[99%] z-10">
                                            <ShoppingCartIcon className="text-black text-xl lg:text-xl" />
                                            <span className="text-base xl:text-lg font-tbPop text-p">Add to Cart</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {/* Product Info */}
                            <div className="text-sm lg:text-base text-black space-y-1 mt-5">
                                <p>
                                    <span className="font-medium text-slate-500 font-tbPop">Category: </span>
                                    {product.category}
                                </p>
                                <p>
                                    <span className="font-medium text-slate-500 font-tbPop">Tags: </span>
                                    {product.tags.join(", ")}
                                </p>
                                <p>
                                    <span className="font-medium text-slate-500 font-tbPop">Product ID: </span> {product.sku}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-8 lg:mt-12 w-full">
                        <div className="border-b border-slate-200/60">
                            <nav className="flex space-x-4 lg:space-x-8">
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
                                    Reviews ({product.reviewCount})
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="py-5">
                            {activeTab === "description" && (
                                <p className="text-slate-600 leading-relaxed font-tbPop font-medium text-sm">
                                    {product.description}
                                </p>
                            )}

                            {activeTab === "specifications" && (
                                <p className="text-slate-600 leading-relaxed font-tbPop font-medium text-sm">
                                    {product.description}
                                </p>
                            )}

                            {activeTab === "reviews" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold font-tbPop text-black">Customer Reviews</h3>
                                        <button className={`${formBtn3} px-4 py-2 text-sm !w-auto`}>
                                            Write a Review
                                        </button>
                                    </div>

                                    {/* Sample Reviews */}
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((review) => (
                                            <div key={review} className="border-b border-gray-100 pb-4">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className="w-4 h-4 text-yellow-400"
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="font-medium">Customer {review}</span>
                                                    <span className="text-sm text-gray-500">
                                                        • 2 days ago
                                                    </span>
                                                </div>
                                                <p className="text-gray-600">
                                                    Excellent quality product! Very satisfied with the
                                                    purchase. The spiritual energy is amazing and it arrived
                                                    quickly.
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <div className="mt-10 lg:mt-16">
                        <h2 className="text-lg lg:text-xl font-semibold text-p mb-3 lg:mb-8">Related Products</h2>
                        <RelatedProducts data={relatedProducts} urlPath={"/product"} />
                    </div>
                </div>
            </section>
        </div>
    );
};


const RelatedProducts = ({ data, urlPath }) => {
    return (
        <Swiper
            slidesPerView={"auto"}
            freeMode={true}
            navigation={true}
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            modules={[FreeMode, Navigation, Autoplay]}
            className="mySwiper !py-3 !px-3 w-full"
            breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 4 },
                480: { slidesPerView: 1, spaceBetween: 6 },
                640: { slidesPerView: 1, spaceBetween: 8 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 4, spaceBetween: 10 },
                1280: { slidesPerView: 4, spaceBetween: 10 }
            }}
        >
            {data?.map((relatedProduct, index) => (
                <SwiperSlide
                    key={index}
                >
                    <ProductCard product={relatedProduct} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductDetail;
