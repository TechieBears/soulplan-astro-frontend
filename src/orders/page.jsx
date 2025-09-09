"use client";
import { Icon } from "@iconify/react";
import "./style.scss";
import { ICON_BASE_URL, IMAGE_BASE_URL } from "../utils/constant";
import Image from "next/image";
import Button from "../component/Button";
import {
  useGetMyOrdersQuery,
  useProductReviewMutation,
  useCancelOrderMutation,
  useTrackOrderQuery,
} from "../redux-tookit/services/authApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UploadImage from "../utils/reusable/uploadImage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Loader from "../component/Loader";
import Private from "../layout/Private";
import UserDashboard from "../dashboard/page";
import Breadcrumbs from "../component/breadcrum";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import OrderDetailsModal from "@/app/component/OrderDetailsModal";
import { openLoginModal } from "@/app/redux-tookit/modal/modalSlice";

const Invoice = dynamic(() => import("../component/Invoice"), { ssr: false });

export default function MyOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const { data, isLoading } = useGetMyOrdersQuery();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      selectedReason: "",
      customReason: "",
    },
  });
  const [submitReview] = useProductReviewMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isReturnModalOpen, setReturnModalOpen] = useState(false);
  const [isTrackModalOpen, setTrackModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);
  const [reviewImg, setReviewImg] = useState([]);
  const [height, setHeight] = useState("0px");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (!user) {
      dispatch(openLoginModal());
      router.push("/");
    }
  }, [user, dispatch, router]);
  
  useEffect(() => {
    const calculatedHeight = `calc(100% / 4 - 15px)`;
    setHeight(calculatedHeight);
  }, []);

  const { data: trackdata } = useTrackOrderQuery({ id: currentOrderId });
  console.log("trackdata", trackdata);

  const isCancelled = trackdata?.currentStatus === "Cancelled";
  let trackingSteps = trackdata?.steps || [];

  if (isCancelled) {
    const cancelIndex = trackingSteps.findIndex(
      (step) => step.step === "Cancelled"
    );
    if (cancelIndex !== -1) {
      trackingSteps = trackingSteps.slice(0, cancelIndex + 1);
    }
  }

  const selectedReason = watch("selectedReason");

  const onSubmit = (data) => {
    if (data.selectedReason === "Other" && !data.customReason) {
      return;
    }
    handleCancelOrder(data.selectedReason, data.customReason);
  };

  const handleCancelOrder = async (selectedReason, customReason) => {
    try {
      const payload = {
        reason:
          selectedReason == "Other"
            ? customReason
            : selectedReason || customReason,
      };
      const orderId = currentOrderId;
      await cancelOrder({ orderId, ...payload }).unwrap();
      toast.success("Order Cancelled Successfully!");
      setCancelModalOpen(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order.");
      setCancelModalOpen(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!currentProductId) return;

    const reviewData = {
      rating,
      comment: reviewText,
      productId: currentProductId,
      images: reviewImg || [],
    };
    try {
      await submitReview(reviewData).unwrap();
      toast.success("Review Submitted Successfully!");
      setReviewModalOpen(false);
      setRating(0);
      setReviewText("");
      setReviewImg([]);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  const handleImageChange = (newImages) => {
    if (reviewImg.length + newImages.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
    setReviewImg([...reviewImg, ...newImages]);
  };
  useEffect(() => {
    if (
      isReviewModalOpen ||
      isCancelModalOpen ||
      isReturnModalOpen ||
      isTrackModalOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup to ensure the style is reset
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isReviewModalOpen,
    isCancelModalOpen,
    isReturnModalOpen,
    isTrackModalOpen,
  ]);
  if (!user) return null;
  return (
    <Private>
      <Breadcrumbs />
      <UserDashboard>
        <div className="relative w-full">
          {/* Heading */}
          <h1 className="text-[24px] text-[#1d2e36] font-medium mb-4">
            My Orders
          </h1>
          <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {console.log("data?.orders:",data?.orders)}
            {data?.orders?.map((order) => (
            <div
              key={order._id}
              className="relative bg-[#F4F6F7] rounded-2xl p-4 flex items-start gap-4 cursor-pointer hover:shadow"
              onClick={() => setSelectedOrderId(order._id)}
            >
                  {/* Product Image */}
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={order.items[0].image}
                      alt={order.items[0].name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="flex flex-col gap-1 text-left">
                    {/* Product Name */}
                    <h2 className="text-base font-semibold text-[#1d2e36]">
                      {order.items[0].name}
                    </h2>

                    {/* Selling Price + Savings */}
                    <div className="text-sm text-[#1d2e36] font-semibold">
                      ₹{order.items[0].sellingPrice}
                      <span className="text-xs text-gray-500 font-normal ml-2">
                        (you saved ₹{order.items[0].mrpPrice - order.items[0].sellingPrice})
                      </span>
                    </div>

                    {/* MRP */}
                    <div className="text-sm text-gray-500">
                      MRP <span className="line-through">₹{order.items[0].mrpPrice}</span>{' '}
                      <span className="text-xs">(incl. of all taxes)</span>
                    </div>

                    {/* Quantity */}
                    <div className="text-sm text-gray-500">Qty {order.items[0].quantity}</div>
                  </div>
                  {order.items.length > 1 && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#420098] text-white text-xs rounded-full flex items-center justify-center">
                      +{order.items.length - 1}
                    </div>
                  )}
                </div>
            ))}
          </div>
        </div>
        {/* Render the OrderDetailsModal when an order is selected */}
        {selectedOrderId && (
          <OrderDetailsModal
            orderId={selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
          />
        )}
      </UserDashboard>
    </Private>
  );
}
