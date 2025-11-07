import { useState, Fragment, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { getAllPublicCoupons } from "../../api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCoupon } from "../../redux/Slices/cartSlice";
import LoadBox from "../Loader/LoadBox";
import { PulseLoader } from "react-spinners";

const AvailableCouponsModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setSelectedCoupon(null);
    setCouponCode("");
    if (onClose) onClose();
  };

  const handleApply = async () => {
    if (selectedCoupon) {
      dispatch(setCoupon(selectedCoupon));
      toast.success("Coupon Applied Successfully!");
      setSelectedCoupon(null);
      setCouponCode("");
      onClose?.();
    } else {
      toast.error("Something went wrong");
      setSelectedCoupon(null);
      setCouponCode("");
    }
  };
  const fetchCoupons = async () => {
    try {
      setLoader(true);
      const response = await getAllPublicCoupons(type, couponCode);
      setCoupons(response?.data || []);
    } catch (error) {
      console.log("==========error in fetchCoupons", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [type]);

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className=" bg-white">
                  <div className="flex items-center justify-between border-b bg-slate1 sticky top-0 z-10 p-4 sm:px-6">
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
                      {/* Coupon Input Section */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            required
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 font-tbPop w-full"
                          />
                          <button
                            className="text-purple-600 font-medium hover:text-purple-700 text-base sm:text-lg px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-tbPop w-full sm:w-auto"
                            onClick={fetchCoupons}
                          >
                            Check
                          </button>
                        </div>
                      </div>

                      {/* Coupons List */}
                      <div className="space-y-4 transition-all duration-300">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 font-tbPop text-center sm:text-left">
                          Available Coupons
                        </h3>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto">
                          {loader ? (
                            <div className="min-h-[200px] flex justify-center items-center bg-[#f9fafb] text-base sm:text-lg font-tbLex text-primary text-center">
                              Loading
                              <span>
                                <PulseLoader color="#4f46e5" size={4} />
                              </span>
                            </div>
                          ) : coupons.length > 0 ? (
                            coupons.map((coupon) => (
                              <div
                                key={coupon._id}
                                className={`flex flex-col sm:flex-row sm:items-start gap-4 p-4 cursor-pointer transition-all rounded-lg border ${
                                  selectedCoupon === coupon
                                    ? "bg-purple-50 border-purple-200"
                                    : "border-gray-200 hover:bg-purple-50 hover:border-purple-200"
                                }`}
                                onClick={() => setSelectedCoupon(coupon)}
                              >
                                <input
                                  type="radio"
                                  name="coupon"
                                  checked={selectedCoupon === coupon}
                                  onChange={() => setSelectedCoupon(coupon)}
                                  className="mt-1 w-5 h-5 accent-purple-600 self-start sm:self-center"
                                />
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span
                                      className={`px-3 py-1 border rounded-md text-sm sm:text-base font-semibold font-tbPop ${
                                        selectedCoupon === coupon
                                          ? "border-purple-600 text-purple-700"
                                          : "border-purple-300 text-purple-700"
                                      }`}
                                    >
                                      {coupon.couponCode}
                                    </span>
                                  </div>
                                  <p className="text-green-600 font-semibold text-base sm:text-lg mt-2 font-tbPop">
                                    {coupon.discountIn === "percent"
                                      ? `${coupon.discount}% OFF`
                                      : `₹${coupon.discount} OFF`}
                                  </p>
                                  <p className="text-gray-600 text-sm sm:text-base mt-1 font-tbPop break-words">
                                    {coupon.couponName}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-600 text-sm sm:text-base font-tbPop text-center py-10">
                              No coupons found
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <footer className="py-3 flex flex-col sm:flex-row bg-slate1 justify-between px-4 space-y-3 sm:space-y-0 sm:space-x-3 w-full items-center text-center sm:text-left">
                    <p className="text-gray-800 text-base sm:text-lg font-medium font-tbPop w-full sm:w-auto">
                      Maximum Savings:{" "}
                      <span className="font-semibold">
                        ₹
                        {coupons.reduce(
                          (acc, coupon) => acc + coupon.discount,
                          0
                        )}
                      </span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={handleCancel}
                        className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-base transition-colors font-tbPop"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleApply}
                        disabled={!selectedCoupon?._id}
                        className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white text-base transition-colors font-tbPop ${
                          selectedCoupon?._id
                            ? "bg-gray-900 hover:bg-gray-800"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                  </footer>
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
