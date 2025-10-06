import React, { useState, Fragment } from "react";
import { X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import TextInput from "../TextInput/TextInput";

const couponsData = [
  {
    id: 1,
    title: "FLAT 300",
    saveText: "Save ₹300",
    description: "25% Off on minimum purchase of Rs. 500.",
    expiry: "Expires on: 5th July 2025 | 12:00pm",
  },
  {
    id: 2,
    title: "FLAT 300",
    saveText: "Save ₹300",
    description: "25% Off on minimum purchase of Rs. 500.",
    expiry: "Expires on: 5th July 2025 | 12:00pm",
  },
  {
    id: 3,
    title: "FLAT 300",
    saveText: "Save ₹300",
    description: "25% Off on minimum purchase of Rs. 500.",
    expiry: "Expires on: 5th July 2025 | 12:00pm",
  },
];

const AvailableCouponsModal = ({ isOpen, onClose }) => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  if (!isOpen) return null;

  const handleCancel = () => {
    setSelectedCoupon(null);
    setCouponCode("");
    if (onClose) onClose();
  };

  const handleApply = () => {
    if (selectedCoupon) {
      alert("Coupon Applied Successfully!");
      onClose?.();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-[2.3px] bg-black/20" />
        </Transition.Child>

        <div className="fixed inset-0 z-[9999999] w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl max-h-[85vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between border-b bg-gray-50 sticky top-0 z-10 p-4 sm:px-6">
                  <div>
                    <Dialog.Title className="text-lg font-semibold text-gray-800 font-tbLex">
                      Available Coupons
                    </Dialog.Title>
                    <p className="text-sm text-gray-600 font-tbLex">
                      Select and apply coupons to save money
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-black hover:text-gray-700 transition-colors p-2 rounded"
                    aria-label="Close Modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
                  <div className="space-y-6">
                    {/* Coupon Code Input */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 font-tbPop">
                        Enter Coupon Code
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <TextInput
                            type="text"
                            placeholder="Enter coupon code"
                            props={{
                              value: couponCode,
                              onChange: (e) => setCouponCode(e.target.value)
                            }}
                          />
                        </div>
                        <button className="text-purple-600 font-medium hover:text-purple-700 text-base px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-tbPop">
                          Check
                        </button>
                      </div>
                    </div>

                    {/* Coupons List */}
                    <div className="space-y-4">
                      <div className="space-y-4 max-h-[400px] overflow-y-auto scroll-hide">
                        {couponsData.map((coupon) => (
                          <div
                            key={coupon.id}
                            className={`flex items-start gap-4 p-4 cursor-pointer transition-all rounded-lg border ${
                              selectedCoupon === coupon.id
                                ? "bg-purple-50 border-purple-200"
                                : "border-gray-200 hover:bg-purple-50 hover:border-purple-200"
                            }`}
                            onClick={() => setSelectedCoupon(coupon.id)}
                          >
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="coupon"
                                checked={selectedCoupon === coupon.id}
                                onChange={() => setSelectedCoupon(coupon.id)}
                                className="hidden peer"
                              />
                              <div className="w-6 h-6 bg-linear-gradient bg-linear-gradient flex items-center justify-center peer-checked:before:content-['✔'] peer-checked:before:text-white peer-checked:before:text-sm transition-all duration-300 shadow-md" />
                              <span className="text-gray-700 text-sm ">
                                {coupon.name}
                              </span>
                            </label>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className={`px-3 py-1 border border-dotted rounded text-sm font-semibold font-tbPop ${
                                    selectedCoupon === coupon.id
                                      ? "border-purple-600 text-purple-700"
                                      : "border-purple-600 text-purple-700"
                                  }`}
                                >
                                  {coupon.title}
                                </span>
                              </div>
                              <p className="text-green-600 font-semibold text-base mt-2 font-tbPop">
                                {coupon.saveText}
                              </p>
                              <p className="text-gray-600 text-sm mt-1 font-tbPop">
                                {coupon.description}
                              </p>
                              <p className="text-gray-400 text-sm mt-1 font-tbPop">
                                {coupon.expiry}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    <p className="text-gray-800 text-base font-medium font-tbPop">
                      Maximum Savings:{" "}
                      <span className="font-semibold">₹300</span>
                    </p>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                      <button
                        onClick={handleCancel}
                        className="flex-1 lg:flex-none px-8  py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 text-base transition-colors font-tbPop"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApply}
                        disabled={!selectedCoupon}
                        className={`flex-1 lg:flex-none space-x-2 px-8 py-3  text-white text-base transition-colors font-tbPop ${
                          selectedCoupon
                            ? "bg-gray-900 hover:bg-gray-800"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AvailableCouponsModal;
