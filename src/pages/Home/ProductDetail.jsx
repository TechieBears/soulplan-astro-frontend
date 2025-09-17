import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaRegHeart,
  FaHeart,
  FaMinus,
  FaPlus,
  FaCircle,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ArrowDown2, ArrowUp2, ShoppingCart } from "iconsax-reactjs";
// Import product images (you can replace these with actual product images)
import product1 from "../../assets/shop/product1.png";
import product2 from "../../assets/shop/product2.png";
import product3 from "../../assets/shop/product3.png";
import product4 from "../../assets/shop/product4.png";
import product5 from "../../assets/shop/product5.png";
import product6 from "../../assets/shop/product6.png";
import backgroundImage from "../../assets/shop/card-bg.png";

import { formBtn3 } from "../../utils/CustomClass";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const carouselRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
        "A powerful healing crystal known for its protective and grounding properties. Perfect for meditation and energy work.",
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
    <div className="min-h-screen mt-20 bg-slate1">
      <div className="container mx-auto px-8 max-w-7xl py-8">
        {/* Product Section */}
        <div className="md:flex gap-6">
          {/* Left - Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 w-24">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-full aspect-square rounded-md overflow-hidden border-2 relative ${
                  currentImageIndex === index
                    ? "border-orange-500"
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <img
                  src={backgroundImage}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>

          {/* Right - Main Image */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg h-[500px] overflow-hidden relative">
              <img
                src={backgroundImage}
                alt="Background"
                className="w-full h-full object-cover"
              />
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-contain p-8"
              />
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex space-x-2 mt-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border relative ${
                    currentImageIndex === index
                      ? "border-orange-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover rounded"
                  />
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="md:w-1/2 mt-6 md:mt-0 px-4">
            {/* Title & Price */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-p">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.oldPrice && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-semibold">
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              {/* Rating */}
              {/* <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-4 h-4 ${
                        index < product.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div> */}
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

            {/* Product Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Product Highlights:
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-sm text-gray-600"
                  >
                    <FaCheck className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                {/* Quantity Box with Up/Down Arrows */}
                <div className="relative w-20">
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-full border border-gray-300 rounded-md text-center py-2 pr-8 appearance-none focus:outline-none focus:border-gray-500"
                  />

                  {/* Custom Arrows */}
                  <div className="absolute inset-y-0 right-0 flex flex-col divide-y p-2 border-gray-300 rounded-r-md overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(true)}
                      className="flex-1 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <ArrowUp2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleQuantityChange(false)}
                      className="flex-1 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <ArrowDown2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Wishlist */}
                {/* <button
                  onClick={toggleWishlist}
                  className="p-2 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  {isWishlisted ? (
                    <FaHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-gray-600" />
                  )}
                </button> */}

                {/* Buy Now & Add to Cart */}
                <div className="flex gap-3">
                  {/* Buy Now - Solid Gradient */}
                  <button className={`${formBtn3} `}>Buy Now</button>

                  {/* Add to Cart - Gradient Border */}
                  <button
                    onClick={addToCart}
                    className="px-6 py-3 rounded-md font-medium 
        text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 
        border-2 border-transparent 
        [border-image:linear-gradient(to_right,#a855f7,#ec4899)_1] 
        hover:opacity-80 transition-all duration-200 flex items-center gap-2"
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="flex flex-col items-center space-y-1">
                <FaTruck className="w-6 h-6 text-green-500" />
                <span className="text-xs text-gray-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FaShieldAlt className="w-6 h-6 text-blue-500" />
                <span className="text-xs text-gray-600">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FaUndo className="w-6 h-6 text-orange-500" />
                <span className="text-xs text-gray-600">Easy Returns</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-medium">Tags:</span>{" "}
                {product.tags.join(", ")}
              </p>
              <p>
                <span className="font-medium">Product ID:</span> {product.sku}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 w-full">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`relative py-3 px-1 font-medium transition-colors ${
                  activeTab === "description"
                    ? "text-p border-b-2 border-gradient-to-r from-purple-500 to-pink-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`relative py-3 px-1 font-medium transition-colors ${
                  activeTab === "specifications"
                    ? "text-p border-b-2 border-gradient-to-r from-purple-500 to-pink-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`relative py-3 px-1 font-medium transition-colors ${
                  activeTab === "reviews"
                    ? "text-p border-b-2 border-gradient-to-r from-purple-500 to-pink-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  {product.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Perfect for meditation, prayer, or as a spiritual accessory,
                  it embodies divine vibrations and holistic well-being. Each
                  piece is unique and carries the natural energy of its origin.
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <button className={`${formBtn3} px-4 py-2 text-sm`}>
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
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-p mb-8">Related Products</h2>

          <div className="relative ">
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
            >
              <IoIosArrowBack className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => scrollCarousel("right")}
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
            >
              <IoIosArrowForward className="w-5 h-5 text-gray-600" />
            </button>

            {/* Products Carousel */}
            <div
              ref={carouselRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="flex-shrink-0 w-72 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={backgroundImage}
                      alt="Background"
                      className="w-full aspect-square object-cover rounded-t-lg"
                    />
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                    {/* <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      {isWishlisted ? (
                        <FaHeart className="w-4 h-4 text-red-500" />
                      ) : (
                        <FaRegHeart className="w-4 h-4 text-gray-600" />
                      )}
                    </button> */}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex justify-between items-start  ">
                    <div className="flex flex-col ">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-1 sm:mb-2">
                        {relatedProduct.title}
                      </h3>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-2 sm:mb-3">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={`w-4 h-4 ${
                              index < relatedProduct.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        ₹{relatedProduct.oldPrice.toLocaleString()}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-gray-800">
                        ₹{relatedProduct.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {/* Add to Cart Button */}
                  <button
                    className={`${formBtn3} w-full m-2 flex items-center rounded-md justify-center gap-2 text-sm sm:text-base px-3 sm:px-5 py-2 sm:py-3`}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base ">Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
