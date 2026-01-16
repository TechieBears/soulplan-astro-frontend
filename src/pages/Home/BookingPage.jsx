import { useCallback, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import toast from "react-hot-toast";
import moment from "moment";
import TextInput from "../../components/TextInput/TextInput";
import SelectTextInput from "../../components/TextInput/SelectTextInput";
import AddressSelector from "../../components/HomeComponents/AddressSelector";
import {
    validateAlphabets,
    validateEmail,
    validatePhoneNumber,
} from "../../utils/validateFunction";
import {
    addServiceToCart,
    checkAvailability,
    getAllAstrologer,
    getPublicServicesDropdown,
    getSingleService,
} from "../../api";
import star from "../../assets/helperImages/star.png";
import sun from "../../assets/helperImages/sun.png";
import "../../css/CustomCalendar.css";

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
            serviceMode: "",
            bookingType: "self",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            mobileNo: user?.mobileNo || "",
            email: user?.email || "",
            description: "",
        },
    });
    const [timeSlots, setTimeSlots] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingService, setIsLoadingService] = useState(false);
    const [selectedServiceData, setSelectedServiceData] = useState(service?.service || null);
    const dateWatch = watch("date");
    const astrologerWatch = watch("astrologer");
    const serviceTypeWatch = watch("serviceType");
    const [astrologers, setAstrologers] = useState([]);
    const [isAstrologersLoading, setIsAstrologersLoading] = useState(false);
    const selectedAddress = useSelector((state) => state.cart?.addresses);

    const handleBooking = async (data) => {
        try {
            if (!data.date) {
                toast.error("Please select a date");
                return;
            }
            if (!data.timeSlot) {
                toast.error("Please select a time slot");
                return;
            }
            if (!data.astrologer) {
                toast.error("Please select an astrologer");
                return;
            }

            setIsLoadingService(true);

            const timeSlotParts = data.timeSlot.split(" - ");


            const payload = {
                serviceId: serviceTypeWatch,
                astrologer: astrologerWatch,
                bookingType: data?.bookingType,
                date: moment(dateWatch).format("YYYY-MM-DD"),
                serviceMode: data?.serviceMode,
                startTime: timeSlotParts[0],
                endTime: timeSlotParts[1],
                currency: "USD",
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email,
                phone: data?.mobileNo,
                reasonForBooking: data?.description || "",
            };

            // Add address or addressData based on booking type
            if (data?.bookingType === "self") {
                if (!selectedAddress || !selectedAddress._id) {
                    toast.error("Please select a default delivery address");
                    setIsLoadingService(false);
                    return;
                }
                payload.address = selectedAddress._id;
            } else {
                if (!data?.addressData || !data?.addressData.trim()) {
                    toast.error("Please enter address");
                    setIsLoadingService(false);
                    return;
                }
                payload.addressData = data?.addressData;
            }

            const res = await addServiceToCart(payload);

            if (res?.success) {
                toast.dismiss();
                toast.success(res?.message || "Service added to cart successfully!");
                navigate("/cart", { state: { type: "services", fromBooking: true } });
            } else {
                toast.dismiss();
                toast.error(res?.message || "Failed to add service to cart");
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.dismiss();
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to book service. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoadingService(false);
        }
    };
    const fetchService = useCallback(async () => {
        if (!dateWatch || !astrologerWatch || !serviceTypeWatch) return;

        const payload = {
            date: moment(dateWatch).format("YYYY-MM-DD"),
            astrologer_id: astrologerWatch || "",
            service_type: "online",
            service_duration: selectedServiceData?.durationInMinutes || 30,
        };

        setIsLoading(true);
        try {
            const res = await checkAvailability(payload);

            if (res && res.success === false) {
                toast.error(res.message || "Astrologer is not available on this day");
                setTimeSlots([]);
                setValue("timeSlot", "");
                return;
            }

            if (res && res.success === true) {
                const availableSlots = res?.data?.timeSlots?.filter(
                    (item) => !item?.booked && item?.status === "available" && !item?.disabled
                );

                if (availableSlots && availableSlots.length > 0) {
                    setTimeSlots(
                        availableSlots.map((item) => ({
                            value: item?.time,
                            label: item?.time,
                        }))
                    );
                } else {
                    setTimeSlots([]);
                    setValue("timeSlot", "");
                    toast.error("Astrologer is not available on this day");
                }
                return;
            }

            setTimeSlots([]);
            setValue("timeSlot", "");
        } catch (error) {
            console.error("Error checking availability:", error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to check availability. Please try again.");
            }

            setTimeSlots([]);
            setValue("timeSlot", "");
        } finally {
            setIsLoading(false);
        }
    }, [dateWatch, astrologerWatch, serviceTypeWatch, selectedServiceData?.durationInMinutes, setValue]);

    useEffect(() => {
        if (!dateWatch || !astrologerWatch || !serviceTypeWatch) {
            setTimeSlots([]);
            setValue("timeSlot", "");
            return;
        }
        fetchService();
    }, [dateWatch, astrologerWatch, serviceTypeWatch, fetchService, setValue]);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            try {
                const response = await getPublicServicesDropdown();
                setServices(response?.data || []);
            } catch (error) {
                console.error("Error fetching services:", error);
                toast.error("Failed to load services");
            }
        };
        fetchServiceCategories();
    }, []);

    useEffect(() => {
        const fetchSingleService = async () => {
            if (!serviceTypeWatch || service?.service?._id === serviceTypeWatch) return;

            try {
                const response = await getSingleService(serviceTypeWatch);
                if (response?.success) {
                    setSelectedServiceData(response.data);
                    if (response.data?.serviceType?.length === 1) {
                        setValue("serviceMode", response.data.serviceType[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching service details:", error);
                toast.error("Failed to load service details");
            }
        };

        if (serviceTypeWatch) {
            fetchSingleService();
        }
    }, [serviceTypeWatch, service?.service?._id, setValue]);

    const bookingType = watch("bookingType");

    useEffect(() => {
        if (bookingType === "others") {
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("mobileNo", "");
            setValue("email", "");
        } else if (bookingType === "self") {
            if (user && Object.keys(user).length > 0) {
                setValue("firstName", user?.firstName || "");
                setValue("lastName", user?.lastName || "");
                setValue("mobileNo", user?.mobileNo || "");
                setValue("email", user?.email || "");
            }
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

    useEffect(() => {
        if (AstrologerOptions.length === 1 && !astrologerWatch) {
            setValue("astrologer", AstrologerOptions[0].value);
        }
    }, [AstrologerOptions, astrologerWatch, setValue]);

    const serviceModeWatch = watch("serviceMode");
    useEffect(() => {
        const availableServiceTypes = selectedServiceData?.serviceType || [];
        if (availableServiceTypes.length === 1 && !serviceModeWatch) {
            setValue("serviceMode", availableServiceTypes[0]);
        }
    }, [selectedServiceData?.serviceType, serviceModeWatch, setValue]);

    return (
        <div className="min-h-screen bg-[#EFF2FA]  pt-16 lg:pt-24 relative">
            <div className="hidden md:absolute md:top-1/4 md:left-0 md:block">
                <img src={star} alt="" className="w-full h-full object-fill " />
            </div>
            <div className="hidden md:absolute md:bottom-40 md:right-0 md:rotate-45 md:scale-75 md:block">
                <img src={star} alt="" className="w-full h-full object-fill" />
            </div>
            <div className="container mx-auto xl:px-0 px-4 py-5 pb-24">
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
                            <span className="xs:hidden">Go Back</span>
                        </button>
                    </div>

                    <h1 className="text-md xs:text-xl sm:text-2xl font-tbLex font-normal tracking-tight text-slate-800 text-center px-10 xs:px-0">
                        Booking Calendar
                    </h1>
                </div>

                <form onSubmit={handleSubmit(handleBooking)}>
                    <div className="relative">
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-0">
                            <img src={sun} alt="" className="w-24 h-24 md:w-32 md:h-32" />
                        </div>
                        <div
                            className="bg-white p-6 md:p-8 xl:p-12 rounded-lg relative z-10 grid md:grid-cols-2 gap-x-12"
                        >
                            <div className="space-y-5 ">
                                <div className="">
                                    <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                                        Services Type*
                                    </h4>
                                    <SelectTextInput
                                        label="Select Services Type"
                                        registerName="serviceType"
                                        options={services?.map((item) => ({
                                            value: item?._id,
                                            label: item?.name,
                                        })) || []}
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
                                            // prevLabel="‹"
                                            // nextLabel="›"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="space-y-5 ">
                                <div className="">
                                    <h4 className="text-sm font-tbLex font-normal text-slate-800 py-2.5">
                                        Available Time Slots*
                                    </h4>
                                    <SelectTextInput
                                        label="Select Time Slots"
                                        registerName="timeSlot"
                                        options={timeSlots}
                                        placeholder={!dateWatch || !astrologerWatch ? "Please select date and astrologer first" : timeSlots.length === 0 ? "No available time slots" : "Select Time Slots"}
                                        props={{
                                            ...register("timeSlot", { required: true }),
                                            value: watch("timeSlot") || "",
                                            disabled: !dateWatch || !astrologerWatch || timeSlots.length === 0,
                                        }}
                                        errors={errors.timeSlot}
                                    />
                                    {dateWatch && astrologerWatch && timeSlots.length === 0 && (
                                        <p className="text-sm text-gray-500 mt-1">No available time slots for this date</p>
                                    )}
                                </div>
                                <div className="">
                                    <Controller
                                        name="serviceMode"
                                        control={control}
                                        rules={{ required: "Service Mode is required" }}
                                        render={({ field }) => {
                                            const availableServiceTypes = selectedServiceData?.serviceType || [];
                                            const serviceModeOptions = [
                                                { value: "online", label: "Online" },
                                                { value: "face_to_face", label: "Face to Face" },
                                            ];

                                            return (
                                                <div>
                                                    <label className="block text-sm font-tbLex font-normal text-slate-800 mb-3">
                                                        Service Mode*
                                                    </label>
                                                    <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2">
                                                        {serviceModeOptions.map((option) => {
                                                            const isAvailable = availableServiceTypes.includes(option.value);

                                                            return (
                                                                <label
                                                                    key={option.value}
                                                                    className={`flex items-center whitespace-nowrap flex-shrink-0 ${isAvailable
                                                                        ? "cursor-pointer"
                                                                        : "cursor-not-allowed opacity-50"
                                                                        }`}
                                                                >
                                                                    <div className="relative inline-flex items-center">
                                                                        <input
                                                                            type="radio"
                                                                            name="serviceMode"
                                                                            value={option.value}
                                                                            checked={field.value === option.value}
                                                                            onChange={() =>
                                                                                isAvailable && field.onChange(option.value)
                                                                            }
                                                                            disabled={!isAvailable}
                                                                            className="absolute opacity-0 w-0 h-0"
                                                                        />
                                                                        <span
                                                                            className={`relative w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-colors ${field.value === option.value
                                                                                ? "border-purple-600"
                                                                                : "border-[#E2E8F0]"
                                                                                }`}
                                                                        >
                                                                            {field.value === option.value && (
                                                                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full"></span>
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <span
                                                                        className={`ml-1.5 sm:ml-2 text-xs sm:text-sm ${isAvailable
                                                                            ? field.value === option.value
                                                                                ? "text-gray-700 font-medium"
                                                                                : "text-gray-600"
                                                                            : "text-gray-400"
                                                                            }`}
                                                                    >
                                                                        {option.label}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                    {errors.serviceMode && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.serviceMode.message}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        }}
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
                                                        className={`px-3 py-2 rounded-full transition-colors font-tbLex font-medium text-sm flex-1 ${field.value === "self"
                                                            ? "bg-linear-gradient text-white hover:opacity-90"
                                                            : "text-gray-600 hover:bg-gray-50"
                                                            }`}
                                                        onClick={() => field.onChange("self")}
                                                    >
                                                        For Self
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`px-3 py-2 rounded-full transition-colors font-tbLex font-medium text-sm flex-1 ${field.value === "others"
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
                                {bookingType === "others" && (
                                    <div className="col-span-2">
                                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                                            Address*
                                        </h4>
                                        <textarea
                                            {...register("addressData", {
                                                required: bookingType === "others" ? "Address is required" : false,
                                            })}
                                            placeholder="Enter complete address including street, city, state, and postal code"
                                            rows={4}
                                            className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white resize-vertical"
                                        />
                                        {errors.addressData && (
                                            <p className="text-red-500 text-sm mt-1">{errors.addressData.message}</p>
                                        )}
                                    </div>
                                )}
                                {bookingType === "self" && (
                                    <div className="col-span-2">
                                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                                            Delivery Address*
                                        </h4>
                                        <AddressSelector />
                                    </div>
                                )}
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
                                <div className="">
                                    <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                                        Description
                                    </h4>
                                    <textarea
                                        {...register("description")}
                                        placeholder="Enter description or reason for booking (optional)"
                                        rows={3}
                                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white resize-vertical"
                                    />
                                </div>
                                <div className="w-full">
                                    <button
                                        className="w-full gradient-border btn-fade-up py-3 px-6 rounded-md"
                                        type="submit"
                                        disabled={isLoadingService}
                                    >
                                        <span className="text-base xl:text-lg font-tbPop font-medium">
                                            {isLoadingService ? "Processing..." : "Book Service"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
