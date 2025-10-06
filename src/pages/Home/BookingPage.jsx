import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TextInput from "../../components/TextInput/TextInput";
import SelectTextInput from "../../components/TextInput/SelectTextInput";
import { validateAlphabets, validateEmail, validatePhoneNumber } from "../../utils/validateFunction";
import Calendar from 'react-calendar';
import { Controller, useForm } from "react-hook-form";
import '../../css/CustomCalendar.css';
import star from '../../assets/helperImages/star.png'
import { addServiceToCart, checkAvailability, getPublicServicesDropdown } from "../../api";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";

const BookingPage = () => {
    const user = useSelector((state) => state.user.userDetails);
    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const service = location.state;
    const [timeSlots, setTimeSlots] = useState([]);
    const [Searvice, setSearvice] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingService, setIsLoadingService] = useState(false);
    const dateWatch = watch('date');
    const serviceTypeWatch = watch('serviceType');

    const currencyOptions = [
        { value: "INR", label: "Indian (INR)" },
        { value: "USD", label: "USD" },
    ];

    const handleBooking = async (data) => {
        try {
            setIsLoadingService(true);
            const payload = {
                serviceId: service?.service?._id,
                astrologerId: "68ca9cf272e2d0202ee1b902",
                date: moment(dateWatch).format('YYYY-MM-DD'),
                serviceMode: "online",
                startTime: data?.timeSlot?.split(" - ")[0],
                endTime: data?.timeSlot?.split(" - ")[1],
                currency: data?.currency,
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email,
                phone: data?.mobileNo,
            }
            console.log("⚡️🤯 ~ BookingPage.jsx:80 ~ handleBooking ~ payload:", payload)
            await addServiceToCart(payload).then(res => {
                if (res?.success) {
                    setIsLoadingService(false);
                    reset();
                    navigate("/cart", { state: { type: "services" } });
                    toast.success(res?.message || "Booking Successfully");
                } else {
                    setIsLoadingService(false);
                    toast.error(res?.message || "Something went wrong");
                }
            })
        } catch (error) {
            console.log('Error submitting form:', error);
            setIsLoading(false);
            toast.error(error?.message || "Failed to book Service");
        }
    }
    const fetchService = async () => {
        if (!dateWatch) return;
        const payload = {
            date: moment(dateWatch).format('YYYY-MM-DD'),
            astrologer_id: "68ca9cf272e2d0202ee1b902",
            service_type: "online",
            service_duration: service?.service?.durationInMinutes || 30,
        }
        setIsLoading(true);
        await checkAvailability(payload).then(res => {
            console.log("⚡️🤯 ~ BookingPage.jsx:107 ~ fetchService ~ res:", res)
            if (res?.success) {
                const availableSlots = res?.data?.timeSlots?.filter((item) =>
                    !item?.booked && item?.status === 'available'
                );
                setTimeSlots(availableSlots?.map((item) => ({ value: item?.time, label: item?.time, disabled: item?.disabled })) || []);
                setIsLoading(false);
            } else {
                toast.error(res?.message || "Something went wrong")
                setIsLoading(false);
            }
        })
    }

    useMemo(() => {
        fetchService();
    }, [dateWatch, serviceTypeWatch]);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            const response = await getPublicServicesDropdown();
            setSearvice(response?.data);
        }
        fetchServiceCategories();
    }, []);

    useEffect(() => {
        reset({
            serviceType: service?.service?._id,
            timeSlot: "",
            date: new Date(),
            currency: "",
            firstName: user?.firstName,
            lastName: user?.lastName,
            mobileNo: user?.mobileNo,
            email: user?.email
        });
    }, [user]);


    return (
        <div className="min-h-screen bg-[#FFF9EF]  pt-16 lg:pt-24 relative">
            <div className="absolute top-1/4 left-0 ">
                <img src={star} alt="" className="w-full h-full object-fill" />
            </div>
            <div className="absolute bottom-40 right-0 rotate-45 scale-75">
                <img src={star} alt="" className="w-full h-full object-fill" />
            </div>
            <div className="container mx-auto px-5 xl:px-0 py-5">
                {/* Header */}
                <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute left-0">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-black hover:text-gray-800 transition-colors text-sm md:text-base font-tbLex"
                        >
                            <ArrowLeft className="mr-2" color="#000" size={20} weight="bold" />
                            Go Back
                        </button>
                    </div>

                    <h1 className="text-xl md:text-2xl font-tbLex font-normal tracking-tight text-slate-800">
                        Booking Calendar
                    </h1>
                </div>


                <form onSubmit={handleSubmit(handleBooking)} >
                    <div className='bg-white p-3 md:p-5 xl:p-8 rounded-lg
                            grid  md:grid-cols-2 gap-x-12' >
                        <div className="space-y-5 ">
                            <div className="">
                                <h4
                                    className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                >
                                    Services Type
                                </h4>
                                <SelectTextInput
                                    label="Select Services Type"
                                    registerName="serviceType"
                                    options={Searvice?.map((item) => ({ value: item?._id, label: item?.name }))}
                                    placeholder="Select Services Type"
                                    props={{
                                        ...register('serviceType', { required: true }),
                                        value: watch('serviceType') || ''
                                    }}
                                    errors={errors.serviceType}
                                />
                            </div>
                            <div>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Calendar
                                            className="custom-calendar"
                                            onChange={onChange}
                                            value={value}
                                            minDate={new Date()}
                                            navigationLabel={({ date, label, locale, view }) =>
                                                view === 'month' ?
                                                    `${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` :
                                                    label
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
                                <h4
                                    className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                >
                                    Time Slots
                                </h4>
                                <SelectTextInput
                                    label="Select Time Slots"
                                    registerName="timeSlot"
                                    options={timeSlots}
                                    placeholder="Select Time Slots"
                                    props={{
                                        ...register('timeSlot', { required: true }),
                                        value: watch('timeSlot') || ''
                                    }}
                                    errors={errors.timeSlot}
                                />
                            </div>
                            <div className="">
                                <h4
                                    className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                >
                                    Currency
                                </h4>
                                <SelectTextInput
                                    props={{
                                        ...register('currency', { required: true }),
                                        value: watch('currency') || ''
                                    }}
                                    errors={errors.currency}
                                    label="Select Currency"
                                    registerName="currency"
                                    options={currencyOptions}
                                    placeholder="Select Currency"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="">
                                    <h4
                                        className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                    >
                                        First Name
                                    </h4>
                                    <TextInput
                                        label="Enter First Name*"
                                        placeholder="Enter First Name"
                                        type="text"
                                        registerName="firstName"
                                        props={{ ...register('firstName', { required: "First name is required", validate: validateAlphabets }), minLength: 3 }}
                                        errors={errors.firstName}
                                    />
                                </div>
                                <div className="">
                                    <h4
                                        className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                    >
                                        Last Name
                                    </h4>
                                    <TextInput
                                        label="Enter Last Name*"
                                        placeholder="Enter Last Name"
                                        type="text"
                                        registerName="lastName"
                                        props={{ ...register('lastName', { required: "Last name is required", validate: validateAlphabets }), minLength: 3 }}
                                        errors={errors.lastName}
                                    />
                                </div>
                                <div className="">
                                    <h4
                                        className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                    >
                                        Email
                                    </h4>
                                    <TextInput
                                        label="Enter Your Email"
                                        placeholder="Enter Your Email"
                                        type="text"
                                        registerName="email"
                                        props={{ ...register('email'), valdate: validateEmail, required: "Email is required" }}
                                        errors={errors.email}
                                    />
                                </div>
                                <div className="">
                                    <h4
                                        className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                    >
                                        Phone Number
                                    </h4>
                                    <TextInput
                                        label="Enter Your Phone Number"
                                        placeholder="Enter Your Phone Number"
                                        type="tel"
                                        registerName="mobileNo"
                                        props={{ ...register('mobileNo', { validate: validatePhoneNumber, required: true }), maxLength: 10, minLength: 10 }}
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
                                    <span className="text-base xl:text-lg font-tbPop text-p">{isLoadingService ? "Processing..." : "Book Service"}</span>
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
