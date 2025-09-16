import React from "react";
import { useNavigate } from "react-router-dom";
import product1 from "../../assets/shop/product1.png";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const orderItems = [
    {
      id: "P4000",
      name: "Amber Crystal",
      price: 3520,
      mrp: 4000,
      quantity: 1,
      image: product1,
    },
    {
      id: "P4001",
      name: "Amber Crystal",
      price: 3520,
      mrp: 4000,
      quantity: 1,
      image: product1,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl  shadow-lg w-full max-w-md p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Booking Confirmed
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Thank you for your order! Your total amount has been successfully
            processed.
          </p>
        </div>

        {/* Order Items */}
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#9E52D8] rounded-lg p-4 flex items-center justify-between"
            >
              {/* Left: Image + Details */}
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <div className="w-14 h-14 bg-white rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-white font-medium text-base">
                    {item.name}
                  </h3>
                  <div className="text-white font-bold text-lg">₹{item.price}</div>
                  <div className="text-white text-xs">
                    MRP <span className="line-through">₹{item.mrp}</span>{" "}
                    (incl. of all taxes)
                  </div>
                </div>
              </div>

              {/* Right: Quantity */}
              <div className="text-white font-medium text-sm">
                QTY : {item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* View My Orders Button */}
        <button
          onClick={() => navigate("/profile/my-orders")}
          className="w-full border border-orange-500 text-orange-500 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
