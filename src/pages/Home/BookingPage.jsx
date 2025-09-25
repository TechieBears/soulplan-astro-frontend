import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import TextInput from "../../components/TextInput/TextInput";
import SelectTextInput from "../../components/TextInput/SelectTextInput";
import { formBtn3 } from "../../utils/CustomClass";
import { validateAlphabets, validateEmail, validatePhoneNumber } from "../../utils/validateFunction";
import Calendar from 'react-calendar';
import { Controller, useForm } from "react-hook-form";
import '../../css/CustomCalendar.css';
import star from '../../assets/helperImages/star.png'
import { checkAvailability, getPublicServicesDropdown } from "../../api";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import MultiSelectTextInput from '../../components/TextInput/MultiSelectTextInput';

const BookingPage = () => {
    const user = useSelector((state) => state.user.userDetails);
    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const service = location.state;
    const [timeSlots, setTimeSlots] = useState([]);
    console.log("⚡️🤯 ~ BookingPage.jsx:23 ~ BookingPage ~ timeSlots:", timeSlots)
    console.log("⚡️🤯 ~ BookingPage.jsx:22 ~ BookingPage ~ service:", service)

    const [formData, setFormData] = useState({
        serviceType: "Palmistry",
        timeSlot: "12:00 PM - 01:00 PM",
        currency: "Indian (INR)",
        fullName: "Siddharth Singh",
        mobile: "9856585685",
        email: "siddharthsingh123@gmail.com",
    });

    const serviceOptions = [
        { value: "Palmistry", label: "Palmistry" },
        { value: "Astrology", label: "Astrology" },
        { value: "Tarot Reading", label: "Tarot Reading" },
        { value: "Numerology", label: "Numerology" },
    ];

    const timeSlotOptions = [
        { value: "09:00 AM - 10:00 AM", label: "09:00 AM - 10:00 AM" },
        { value: "10:00 AM - 11:00 AM", label: "10:00 AM - 11:00 AM" },
        { value: "11:00 AM - 12:00 PM", label: "11:00 AM - 12:00 PM" },
        { value: "12:00 PM - 01:00 PM", label: "12:00 PM - 01:00 PM" },
        { value: "02:00 PM - 03:00 PM", label: "02:00 PM - 03:00 PM" },
        { value: "03:00 PM - 04:00 PM", label: "03:00 PM - 04:00 PM" },
    ];

    const currencyOptions = [
        { value: "Indian (INR)", label: "Indian (INR)" },
        { value: "USD", label: "USD" },
    ];

    const dateWatch = watch('date');
    const onSubmit = (data) => {
        console.log("Booking submitted:", data);
        alert("Booking request submitted successfully!");
    };

    const [Searvice, setSearvice] = useState([]);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            const response = await getPublicServicesDropdown();
            console.log("⚡️🤯 ~ HomeNavbar.jsx:413 ~ fetchServiceCategories ~ response:", response)
            setSearvice(response?.data);
        }
        fetchServiceCategories();
    }, []);
    useMemo(() => {
        const fetchService = async () => {
            const payload = {
                date: moment(dateWatch).format('YYYY-MM-DD'),
                astrologer_id: "68ca9cf272e2d0202ee1b902"
            }
            const response = await checkAvailability(payload);
            const availableSlots = response?.data?.timeSlots?.filter((item) =>
                !item?.booked && item?.status === 'available'
            );

            setTimeSlots(availableSlots?.map((item) => ({
                value: `${item?.display_time} - ${item?.display_end_time}`,
                label: `${moment(item?.display_time, "HH:mm").format("hh:mm A")} - ${moment(item?.display_end_time, "HH:mm").format("hh:mm A")}`
            })) || []);
        }
        fetchService();
    }, [dateWatch]);

    useEffect(() => {
        reset({
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


                <form onSubmit={handleSubmit(onSubmit)} >
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
                                <Controller
                                    name="timeSlot"
                                    control={control}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <MultiSelectTextInput
                                            label="Select Time Slots"
                                            options={timeSlots}
                                            key={'timeSlot'}
                                            value={value || []}
                                            onChange={onChange}
                                            errors={errors.timeSlot}
                                        />
                                    )}
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
                                <button
                                    className={`h-[48px] lg:h-[46px] xl:h-[51px] py-3 text-white !font-medium !tracking-normal text-sm xl:text-base bg-primary-gradient hover:opacity-90  disabled:opacity-50 transition  w-full rounded relative col-span-2`}
                                    style={{
                                        background: `linear-gradient(90deg, rgba(0, 121, 208, 0.6) -12.5%, rgba(158, 82, 216, 0.6) 30.84%, rgba(218, 54, 92, 0.6) 70.03%, rgba(208, 73, 1, 0.6) 111%)`
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1.5 bg-white  rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[46px] lg:h-[43px] xl:h-[48px] w-[99.50%] z-10">
                                        <span className="text-base xl:text-lg font-tbPop text-p">Book Service</span>
                                    </div>
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
