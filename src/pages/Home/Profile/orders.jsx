// "use client";
import { Icon } from "@iconify/react";
// import "./style.scss";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";

// Temporary placeholder components
const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;
const OrderDetailsModal = ({ orderId, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <p>Order ID: {orderId}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
      >
        Close
      </button>
    </div>
  </div>
);

export default function MyOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Mock data for demonstration
  const data = {
    orders: [
      {
        _id: "1",
        items: [
          {
            name: "Sample Product",
            image: "/placeholder-image.jpg",
            sellingPrice: 999,
            mrpPrice: 1299,
            quantity: 1,
          },
        ],
      },
      {
        _id: "2",
        items: [
          {
            name: "Another Product",
            image: "/placeholder-image.jpg",
            sellingPrice: 1499,
            mrpPrice: 1999,
            quantity: 2,
          },
        ],
      },
    ],
  };
  const isLoading = false;

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // useEffect(() => {
  //   if (!user?.isLogged) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  // if (!user?.isLogged) return null;

  return (
    <>
      <Private>
        <UserDashboard>
          <ProfileSidebar>
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              My Orders
            </h1>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#420098]"></div>
              </div>
            ) : data?.orders?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Icon
                  icon="mdi:package-variant"
                  className="text-gray-300 text-6xl mb-4"
                />
                <h2 className="text-xl font-medium text-gray-600 mb-2">
                  No orders yet
                </h2>
                <p className="text-gray-500 mb-6">
                  You haven't placed any orders yet.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-[#420098] text-white px-6 py-2 rounded-lg hover:bg-[#2d0066] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {data?.orders?.map((order) => (
                  <div
                    key={order._id}
                    className="bg-[#F4F6F7] rounded-2xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                    onClick={() => setSelectedOrderId(order._id)}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 relative flex-shrink-0 bg-white rounded-lg p-2">
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjRGNkY3Ii8+CjxwYXRoIGQ9Ik0zMCAzNkMzMy4zMTM3IDM2IDM2IDMzLjMxMzcgMzYgMzBDMzYgMjYuNjg2MyAzMy4zMTM3IDI0IDMwIDI0QzI2LjY4NjMgMjQgMjQgMjYuNjg2MyAyNCAzMEMyNCAzMy4zMTM3IDI2LjY4NjMgMzYgMzAgMzZaIiBmaWxsPSIjQ0RDRENEIi8+CjxwYXRoIGQ9Ik0zMCAxNkMzMi4yMDkxIDE2IDM0IDE3Ljc5MDkgMzQgMjBDMzQgMjIuMjA5MSAzMi4yMDkxIDI0IDMwIDI0QzI3Ljc5MDkgMjQgMjYgMjIuMjA5MSAyNiAyMEMyNiAxNy43OTA5IDI3Ljc5MDkgMTYgMzAgMTZaIiBmaWxsPSIjQ0RDRENEIi8+CjxwYXRoIGQ9Ik0zMCA0MEMzNi42Mjc0IDQwIDQyIDM0LjYyNzQgNDIgMjhDNDIgMjEuMzcyNiAzNi42Mjc0IDE2IDMwIDE2QzIzLjM3MjYgMTYgMTggMjEuMzcyNiAxOCAyOEMxOCAzNC42Mjc0IDIzLjM3MjYgNDAgMzAgNDBaIiBzdHJva2U9IiNDRENEQ0QiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K";
                        }}
                      />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col gap-1 text-left flex-1 min-w-0">
                      {/* Product Name */}
                      <h2 className="text-base font-semibold text-[#1d2e36] truncate">
                        {order.items[0].name}
                      </h2>

                      {/* Selling Price + Savings */}
                      <div className="text-sm text-[#1d2e36] font-semibold">
                        ₹{order.items[0].sellingPrice.toLocaleString()}
                        <span className="text-xs text-green-600 font-normal ml-2">
                          (Saved ₹
                          {(
                            order.items[0].mrpPrice -
                            order.items[0].sellingPrice
                          ).toLocaleString()}
                          )
                        </span>
                      </div>

                      {/* MRP */}
                      <div className="text-sm text-gray-500">
                        MRP{" "}
                        <span className="line-through">
                          ₹{order.items[0].mrpPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="text-sm text-gray-500">
                        Qty: {order.items[0].quantity}
                      </div>

                      {/* View Details Button */}
                      <button className="text-[#420098] text-xs font-medium mt-2 text-left hover:text-[#2d0066]">
                        View Details →
                      </button>
                    </div>

                    {/* Multiple items indicator */}
                    {order.items.length > 1 && (
                      <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#420098] text-white text-xs rounded-full flex items-center justify-center shadow-md">
                        +{order.items.length - 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Order Details Modal */}
            {selectedOrderId && (
              <OrderDetailsModal
                orderId={selectedOrderId}
                onClose={() => setSelectedOrderId(null)}
              />
            )}
          </ProfileSidebar>
        </UserDashboard>
      </Private>
    </>
  );
}
