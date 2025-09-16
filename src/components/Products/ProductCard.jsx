import React from "react";
import { useNavigate } from "react-router-dom";
import { formBtn3 } from "../../utils/CustomClass";
import { ShoppingCart } from "iconsax-reactjs";
import backgroundImage from "../../assets/shop/card-bg.png";

const Star = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-300"}`}
    fill="currentColor"
  >
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.164L12 18.896l-7.334 3.864 1.4-8.164L.132 9.21l8.2-1.192L12 .587z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const { id, title, price, oldPrice, rating, image } = product;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
    console.log(`Added ${title} to cart`);
  };

  return (
    <div 
      className="h-full flex flex-col bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative w-full max-w-sm mx-auto aspect-square bg-gray-50 rounded-lg overflow-hidden">
        {/* Background Image */}
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Product Image (overlay) */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain p-4"
          loading="lazy"
        />
      </div>

      <div className="pt-4 flex flex-col flex-grow">
        <div className="flex flex-grow justify-between items-start">
          {/* Left side - Title & Rating */}
          
          <div className="flex flex-col w-full">
            <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-1 sm:mb-2">
              {title}
            </h3>

            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} filled={i <= rating} />
              ))}
            </div>
          </div>

          {/* Right side - Price */}
          <div className="flex flex-col items-end">
            <div className="text-xs sm:text-sm text-gray-500 line-through">
              ₹{oldPrice.toLocaleString()}
            </div>

            {oldPrice > price && (
              <div className="text-sm sm:text-base font-semibold text-gray-800">
                ₹{price.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className={`${formBtn3} flex items-center rounded-md justify-center gap-2 text-sm sm:text-base px-3 sm:px-5 py-2 sm:py-3`}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base ">Add to Cart</span>
      </button>
    </div>
  );
};

export default React.memo(ProductCard);
