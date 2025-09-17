import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { formBtn3 } from "../../utils/CustomClass";

// Import product images
import product1 from "../../assets/shop/product3.png";
import backgroundImage from "../../assets/shop/card-bg.png";
import { Edit } from "iconsax-reactjs";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: "P4000",
      name: "Amber Crystal",
      price: 3520,
      mrp: 4000,
      quantity: 1,
      image: product1,
      gst: 18,
    },
    {
      id: "P4001",
      name: "Amber Crystal",
      price: 3520,
      mrp: 4000,
      quantity: 1,
      image: product1,
      gst: 18,
    },
  ]);

  const updateQuantity = (id, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateGST = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + (itemTotal * item.gst) / 100;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const gstAmount = calculateGST();
  const total = subtotal + gstAmount;

  return (
    <div className="min-h-screen mt-20 bg-[#FFF9EF]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl py-8">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute left-0">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
            >
              <BsArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-medium text-gray-900">
            Cart
          </h1>

          <div className="absolute right-0 hidden sm:flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button className="px-4 sm:px-6 py-1 sm:py-2 text-black rounded-full hover:bg-gray-50 transition-colors text-sm sm:text-base">
              Services
            </button>
            <button className="px-4 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base">
              Products
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 bg-white">
          {/* Cart Items */}
          <div className="lg:col-span-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#9E52D8] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                {/* Image */}
                <div className="w-full sm:w-20 h-40 sm:h-20 bg-white rounded-md overflow-hidden flex-shrink-0 relative">
                  <img
                    src={backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-white text-lg mb-1 sm:pr-6">
                    {item.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="font-medium text-lg text-white">
                      ₹{item.price.toLocaleString()}
                    </div>
                    <div className="text-white text-sm">
                      <span>
                        MRP{" "}
                        <span className="line-through">
                          ₹{item.mrp.toLocaleString()}
                        </span>
                      </span>
                      <span className="ml-1">(incl. of all taxes)</span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-end space-y-2 mt-2 sm:mt-0">
                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-white hover:bg-[#8B3FC1] rounded-md transition-colors flex-shrink-0"
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>

                  {/* Quantity Controls */}
                  <div className="flex gap-4  items-center space-y-1">
                    <span className="text-white text-sm font-medium">QTY:</span>
                    <div className="flex bg-white rounded-md border border-gray-200 overflow-hidden">
                      <div className="px-3 py-1 text-center font-medium text-gray-900 border-t border-b border-gray-200">
                        {item.quantity}
                      </div>
                      <div className="flex flex-col">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-full px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          <FaChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-full px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          <FaChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Amount Payable */}
          <div className="lg:col-span-5">
            <div className="rounded-lg lg:sticky lg:top-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-4 bg-white rounded-md shadow-sm mb-4">
                {/* Left: Delivery Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Deliver to: <span className="font-medium">Sid Sriram</span>
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    8520 Varaladevi road near Darshan Hotel, Bhiwandi – 421305
                  </p>
                </div>

                {/* Right: Change Button */}
                <button className="flex items-center gap-1 border border-gray-900 rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 transition-colors mt-2 sm:mt-0">
                  <Edit className="w-4 h-4" />
                  Change
                </button>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Amount Payable
              </h3>

              <div className="space-y-3 mb-6 bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Product {cartItems.reduce((t, i) => t + i.quantity, 0)}x
                    (incl. GST)
                  </span>
                  <span className="font-medium">
                    ₹ {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹ {gstAmount.toFixed(1)}</span>
                </div>

                <div className="border-t border-gray-300 my-2"></div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹ {total.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Continue to Pay */}
              <button
                onClick={() => navigate('/payment-success')}
                className={`${formBtn3} w-full py-3 text-white rounded-md`}
              >
                Continue to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
