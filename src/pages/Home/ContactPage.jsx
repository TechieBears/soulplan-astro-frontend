import React, { useState } from "react";
import Breadcrumbs from "../../components/breadcrum";
import TextInput from "../../components/TextInput/TextInput";
import { inputClass, labelClass, formBtn3 } from "../../utils/CustomClass";
import { useForm } from "react-hook-form";
import { validateAlphabets, validateEmail, validatePhoneNumber } from '../../utils/validateFunction';
import LoadBox from '../../components/Loader/LoadBox';
import CustomTextArea from "../../components/TextInput/CustomTextArea";

const ContactPage = () => {
    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();

    const [loader, setLoader] = useState()
    const onSubmit = () => {

    }
    return (
        <div className="bg-[#FFF9EF]  pt-10 lg:pt-16">
            <Breadcrumbs />
            <section className="w-full  lg:py-2 xl:py-4 px-5 xl:px-0">
                <div className="container mx-auto ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 xl:gap-10 ">
                        <div className=" text-gray-700 flex justify-between flex-col space-y-2  xl:space-y-10">
                            <div className="bg-white rounded-lg p-6 lg:p-10 ">
                                <h4 className="text-base font-medium font-tbLex text-black">Phone</h4>
                                <p className="mt-1 font-medium text-sm break-words font-tbPop tracking-tight text-slate-500">
                                    +97 147654321
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 lg:p-10 ">
                                <h4 className="text-base font-medium font-tbLex text-black">Email</h4>
                                <p className="mt-1 font-medium text-sm break-words font-tbPop tracking-tight text-slate-500">
                                    booking@Astro.com
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 lg:p-10 ">
                                <h4 className="text-base font-medium font-tbLex text-black">Address</h4>
                                <p className="mt-1 font-medium text-sm break-words font-tbPop tracking-tight text-slate-500">
                                    Germany — 785 15th Street, Office 478 <br />
                                    Berlin, De 81566
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className='bg-white p-3 md:p-5 xl:p-8 rounded-lg
                            grid  md:grid-cols-2 gap-5 items-center' >
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
                                <div>
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
                                <div className="md:col-span-2">
                                    <h4
                                        className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                    >
                                        Message
                                    </h4>
                                    <CustomTextArea
                                        label="Enter Message"
                                        placeholder="Enter Message"
                                        registerName="message"
                                        props={{
                                            ...register('message', {
                                                required: "Message is required",
                                                minLength: {
                                                    value: 10,
                                                    message: "Message must be at least 10 characters"
                                                }
                                            })
                                        }}
                                        errors={errors.message}
                                    />
                                </div>
                                <div className="flex justify-start">
                                    {loader ? <LoadBox className={formBtn3} /> : <button type='submit' className={`${formBtn3} !w-auto`}>submit</button>}
                                </div>
                            </div>


                        </form>
                    </div>

                    {/* Google Maps */}
                    <div className="mt-12 pb-10 text-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl text-p font-medium mb-6 sm:mb-10 font-tbLex tracking-tight">
                            Find Us on Google Maps
                        </h1>
                        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md">
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.990798153229!2d55.27078241501025!3d25.204849983898388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434f1e0e4e0f%3A0xa7b5b89cfba3e7e0!2sDubai!5e0!3m2!1sen!2sae!4v1674834000000!5m2!1sen!2sae"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
