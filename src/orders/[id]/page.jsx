"use client";

import { useParams } from "next/navigation";
import { useGetSingleOrderQuery, useGetInvoiceQuery } from "@/app/redux-tookit/services/authApi";
import Navbar from "@/app/component/Navbar";
import Loader from "@/app/component/Loader";
import { useEffect, useState } from "react";
import OrderDetailsContent from "@/app/component/OrderDetailsContent";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleOrderQuery({ id });
  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    error: invoiceError,
  } = useGetInvoiceQuery({ orderId: id }, { skip: !id });

  const order = data?.order;
  const [selectedImages, setSelectedImages] = useState([]);

  const statusStyles = {
    pending: { color: "#92400e", backgroundColor: "#fef3c7", icon: "fluent:clock-20-regular" },
    processing: { color: "#1d4ed8", backgroundColor: "#dbeafe", icon: "fluent:arrow-sync-checkmark-20-regular" },
    shipped: { color: "#0f766e", backgroundColor: "#ccfbf1", icon: "fluent:vehicle-ship-20-regular" },
    delivered: { color: "#166534", backgroundColor: "#dcfce7", icon: "fluent:box-checkmark-20-regular" },
    cancelled: { color: "#991b1b", backgroundColor: "#fee2e2", icon: "fluent:error-circle-20-regular" },
  };
  const currentStatus = order?.currentStatus?.toLowerCase() || "pending";
  const style = statusStyles[currentStatus] || statusStyles.pending;

  useEffect(() => {
    if (order?.items?.length > 0) {
      const product = order.items[0];
      setSelectedImages([{ url: product.image }]);
    }
  }, [order]);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">Failed to load order.</div>;
  if (!order) return <div className="p-4">No order data found.</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <OrderDetailsContent order={order} invoiceData={invoiceData} />
        </div>
    </>
  );
}
