import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TextInput from "../../components/TextInput/TextInput";
import SelectTextInput from "../../components/TextInput/SelectTextInput";
import {
  validateAlphabets,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/validateFunction";
import Calendar from "react-calendar";
import { Controller, useForm } from "react-hook-form";
import "../../css/CustomCalendar.css";
import star from "../../assets/helperImages/star.png";
import {
  addServiceToCart,
  checkAvailability,
  getAllAstrologer,
  getPublicServicesDropdown,
} from "../../api";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import { InfoCircle } from "iconsax-reactjs";

const BookingPage = () => {
  const user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state;
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      serviceType: service?.service?._id || "",
      astrologer: "",
      timeSlot: "",
      date: new Date(),
      currency: "",
      bookingType: "self",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      mobileNo: user?.mobileNo || "",
      email: user?.email || "",
    },
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [Searvice, setSearvice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingService, setIsLoadingService] = useState(false);
  const dateWatch = watch("date");
  const astrologerWatch = watch("astrologer");
  const serviceTypeWatch = watch("serviceType");
  const [astrologers, setAstrologers] = useState([]);
  const [isAstrologersLoading, setIsAstrologersLoading] = useState(false);

  const currencyOptions = [
    { value: "INR", label: "Indian (INR)" },
    { value: "USD", label: "USD" },
  ];

  const handleBooking = async (data) => {
    try {
      setIsLoadingService(true);
      const payload = {
        serviceId: serviceTypeWatch,
        astrologer: astrologerWatch || "",
        bookingType: data?.bookingType,
        date: moment(dateWatch).format("YYYY-MM-DD"),
        serviceMode: "online",
        startTime: data?.timeSlot?.split(" - ")[0],
        endTime: data?.timeSlot?.split(" - ")[1],
        currency: data?.currency,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phone: data?.mobileNo,
      };
      await addServiceToCart(payload).then((res) => {
        if (res?.success) {
          setIsLoadingService(false);
          reset();
          navigate("/cart", { state: { type: "services" } });
          toast.success(res?.message || "Booking Successfully");
        } else {
          setIsLoadingService(false);
          toast.error(res?.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.log("Error submitting form:", error);
      setIsLoading(false);
      toast.error(error?.message || "Failed to book Service");
    }
  };
  const fetchService = async () => {
    if (!dateWatch || !astrologerWatch || !serviceTypeWatch) return;
    const payload = {
      date: moment(dateWatch).format("YYYY-MM-DD"),
      astrologer_id: astrologerWatch || "",
      service_type: "online",
      service_duration: service?.service?.durationInMinutes || 30,
    };
    setIsLoading(true);
    await checkAvailability(payload).then((res) => {
      if (res?.success) {
        const availableSlots = res?.data?.timeSlots?.filter(
          (item) => !item?.booked && item?.status === "available"
        );
        setTimeSlots(
          availableSlots?.map((item) => ({
            value: item?.time,
            label: item?.time,
            disabled: item?.disabled,
          })) || []
        );
        setIsLoading(false);
      } else {
        toast.error(res?.message || "Something went wrong");
        setIsLoading(false);
      }
    });
  };

  useMemo(() => {
    fetchService();
  }, [dateWatch, serviceTypeWatch]);

  useEffect(() => {
    const fetchServiceCategories = async () => {
      const response = await getPublicServicesDropdown();
      setSearvice(response?.data);
    };
    fetchServiceCategories();
  }, []);

  const bookingType = watch("bookingType");

  useEffect(() => {
    if (bookingType === "others") {
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("mobileNo", "");
      setValue("email", "");
    } else if (bookingType === "self" && user) {
      setValue("firstName", user?.firstName || "");
      setValue("lastName", user?.lastName || "");
      setValue("mobileNo", user?.mobileNo || "");
      setValue("email", user?.email || "");
    }
  }, [bookingType, user, setValue]);

  const fetchAstrologers = useCallback(async () => {
    if (astrologers.length > 0 || isAstrologersLoading) return;

    try {
      setIsAstrologersLoading(true);
      const response = await getAllAstrologer();
      if (response?.success) {
        setAstrologers(response.data || []);
      } else {
        setAstrologers([]);
        toast.error("Failed to load astrologers. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching astrologers:", error);
      setAstrologers([]);
      toast.error("Failed to load astrologers. Please try again.");
    } finally {
      setIsAstrologersLoading(false);
    }
  }, [astrologers.length, isAstrologersLoading]);

  const AstrologerOptions = useMemo(() => {
    if (!astrologers.length) return [];
    return astrologers.map((astrologer) => ({
      value: astrologer._id,
      label:
        astrologer?.profile?.firstName + " " + astrologer.profile?.lastName,
    }));
  }, [astrologers]);

  useEffect(() => {
    fetchAstrologers();
  }, [fetchAstrologers]);

  return (
    <div className="min-h-screen bg-[#FFF9EF]  pt-16 lg:pt-24 relative">
      <div className="hidden md:absolute md:top-1/4 md:left-0 md:block">
        <img src={star} alt="" className="w-full h-full object-fill " />
      </div>
      <div className="hidden md:absolute md:bottom-40 md:right-0 md:rotate-45 md:scale-75 md:block">
        <img src={star} alt="" className="w-full h-full object-fill" />
      </div>
      <div className="container mx-auto xl:px-0 py-5">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="absolute left-0 sm:left-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-black hover:text-gray-800 transition-colors text-xs xs:text-sm sm:text-base font-tbLex"
            >
              <ArrowLeft
                className="mr-1 xs:mr-2 w-4 h-4 xs:w-5 xs:h-5"
                color="#000"
                weight="bold"
              />
              <span className="hidden xs:inline">Go Back</span>
              <span className="xs:hidden">Back</span>
            </button>
          </div>

          <h1 className="text-md xs:text-xl sm:text-2xl font-tbLex font-normal tracking-tight text-slate-800 text-center px-10 xs:px-0">
            Booking Calendar
          </h1>
        </div>

        <form onSubmit={handleSubmit(handleBooking)}>
          <div
            className="bg-white p-3 md:p-5 xl:p-8 rounded-lg
                            grid  md:grid-cols-2 gap-x-12"
          >
            <div className="space-y-5 ">
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                  Services Type
                </h4>
                <SelectTextInput
                  label="Select Services Type"
                  registerName="serviceType"
                  options={Searvice?.map((item) => ({
                    value: item?._id,
                    label: item?.name,
                  }))}
                  placeholder="Select Services Type"
                  props={{
                    ...register("serviceType", { required: true }),
                    value: serviceTypeWatch || "",
                  }}
                  errors={errors.serviceType}
                />
              </div>
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                  Select Astrologer*
                </h4>
                <SelectTextInput
                  label="Select Astrologer"
                  registerName="astrologer"
                  options={AstrologerOptions}
                  placeholder="Select Astrologer"
                  props={{
                    ...register("astrologer", { required: true }),
                    value: watch("astrologer") || "",
                  }}
                  errors={errors.astrologer}
                />
              </div>
              <div>
                <Controller
                  name="date"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Calendar
                      className="custom-calendar"
                      onChange={onChange}
                      value={value}
                      minDate={new Date()}
                      navigationLabel={({ date, label, locale, view }) =>
                        view === "month"
                          ? `${date.toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}`
                          : label
                      }
                      prev2Label="«"
                      next2Label="»"
                      prevLabel={null}
                      nextLabel={null}
                    />
                  )}
                />
              </div>
            </div>
            <div className="space-y-5 ">
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-800 py-2.5">
                  Time Slots*
                </h4>
                <SelectTextInput
                  label="Select Time Slots"
                  registerName="timeSlot"
                  options={timeSlots}
                  placeholder="Select Time Slots"
                  props={{
                    ...register("timeSlot", { required: true }),
                    value: watch("timeSlot") || "",
                  }}
                  errors={errors.timeSlot}
                />
              </div>
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                  Currency*
                </h4>
                <SelectTextInput
                  props={{
                    ...register("currency", { required: true }),
                    value: watch("currency") || "",
                  }}
                  errors={errors.currency}
                  label="Select Currency"
                  registerName="currency"
                  options={currencyOptions}
                  placeholder="Select Currency"
                />
              </div>
              <div className="">
                <Controller
                  name="bookingType"
                  control={control}
                  render={({ field }) => (
                    <div className="flex justify-end">
                      <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm w-56">
                        <button
                          type="button"
                          className={`px-3 py-2 rounded-full transition-colors font-tbLex font-medium text-sm flex-1 ${
                            field.value === "self"
                              ? "bg-linear-gradient text-white hover:opacity-90"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          onClick={() => field.onChange("self")}
                        >
                          For Self
                        </button>
                        <button
                          type="button"
                          className={`px-3 py-2 rounded-full transition-colors font-tbLex font-medium text-sm flex-1 ${
                            field.value === "others"
                              ? "bg-linear-gradient text-white hover:opacity-90"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          onClick={() => field.onChange("others")}
                        >
                          For Others
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className="sm:grid grid-cols-2 gap-5">
                <div className="">
                  <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                    First Name{" "}
                    <span className="text-yellow-500 font-tbPop font-normal text-xs">
                      {bookingType == "others" ? "*" : "(Read Only)"}
                    </span>
                  </h4>
                  <TextInput
                    label="Enter First Name*"
                    placeholder="Enter First Name"
                    type="text"
                    disabled={bookingType === "self"}
                    registerName="firstName"
                    props={{
                      ...register("firstName", {
                        required:
                          bookingType === "others"
                            ? "First name is required"
                            : false,
                        validate: validateAlphabets,
                      }),
                      minLength: 3,
                    }}
                    errors={errors.firstName}
                  />
                </div>
                <div className="">
                  <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                    Last Name{" "}
                    <span className="text-yellow-500 font-tbPop font-normal text-xs">
                      {bookingType == "others" ? "*" : "(Read Only)"}
                    </span>
                  </h4>
                  <TextInput
                    label="Enter Last Name*"
                    placeholder="Enter Last Name"
                    type="text"
                    disabled={bookingType === "self"}
                    registerName="lastName"
                    props={{
                      ...register("lastName", {
                        required:
                          bookingType === "others"
                            ? "Last name is required"
                            : false,
                        validate: validateAlphabets,
                      }),
                      minLength: 3,
                    }}
                    errors={errors.lastName}
                  />
                </div>
                <div className="">
                  <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                    Email{" "}
                    <span className="text-yellow-500 font-tbPop font-normal text-xs">
                      {bookingType == "others" ? "*" : "(Read Only)"}
                    </span>
                  </h4>
                  <TextInput
                    label="Enter Your Email"
                    placeholder="Enter Your Email"
                    type="text"
                    registerName="email"
                    disabled={bookingType === "self"}
                    props={{
                      ...register("email"),
                      valdate: validateEmail,
                      required:
                        bookingType === "others" ? "Email is required" : false,
                    }}
                    errors={errors.email}
                  />
                </div>
                <div className="">
                  <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                    Phone Number{" "}
                    <span className="text-yellow-500 font-tbPop font-normal text-xs">
                      {bookingType == "others" ? "*" : "(Read Only)"}
                    </span>
                  </h4>
                  <TextInput
                    label="Enter Your Phone Number"
                    placeholder="Enter Your Phone Number"
                    type="tel"
                    registerName="mobileNo"
                    disabled={bookingType === "self"}
                    props={{
                      ...register("mobileNo", {
                        validate: validatePhoneNumber,
                        required:
                          bookingType === "others"
                            ? "Phone number is required"
                            : false,
                      }),
                      maxLength: 10,
                      minLength: 10,
                    }}
                    errors={errors.mobileNo}
                  />
                </div>
              </div>
              <div className="gradientBtn w-full">
                <button
                  className={`!w-full`}
                  type="submit"
                  disabled={isLoadingService}
                >
                  <span className="text-base xl:text-lg font-tbPop text-p">
                    {isLoadingService ? "Processing..." : "Book Service"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
