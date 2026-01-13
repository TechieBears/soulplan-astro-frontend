import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import toast from "react-hot-toast";
import TextInput from "../../components/TextInput/TextInput";
import SelectTextInput from "../../components/TextInput/SelectTextInput";
import LoadBox from "../../components/Loader/LoadBox";
import { registerUser } from "../../api";
import { setLoggedUser, setRoleIs, setUserDetails, setIsRegistered } from "../../redux/Slices/loginSlice";
import {
    validateEmail,
    validatePassword,
    validatePhoneNumber,
} from "../../utils/validateFunction";
import { formBtn3 } from "../../utils/CustomClass";

const RegisterPage = () => {
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
        reset,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const playload = {
            ...data,
            registerType: "normal",
        };
        try {
            setLoader(true);
            const response = await registerUser(playload);
            if (
                response?.message === "User created successfully" ||
                response?.success
            ) {
                document.title = `SoulPlan : Dashboard | ${response?.data?.user?.role || response?.user?.role || ""}`;

                const userData = response?.data?.user || response?.user || response?.data;
                const token = response?.data?.token || response?.token;
                const role = response?.data?.user?.role || response?.user?.role;

                dispatch(setUserDetails(userData));
                dispatch(setLoggedUser(true));
                dispatch(setRoleIs(role));
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                dispatch(setIsRegistered(true));

                toast.success("Registration and login successful!");
                setLoader(false);
                reset();
                navigate("/", { replace: true });
            } else {
                setLoader(false);
                toast.error(response?.message || "Registration failed");
            }
        } catch (error) {
            setLoader(false);
            console.error("Registration error:", error);
            toast.error(error?.message || "Something went wrong");
        }
    };

    useGSAP(() => {
        gsap.from(".card", {
            y: 30,
            opacity: 0,
            ease: "power1.inOut",
            duration: 1,
        });
    }, []);

    return (
        <div className="h-full w-full overflow-x-hidden bg-[#FFF9EF] py-24 flex items-center justify-center  px-4">
            <div className="card w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
                {/* Title */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-center text-p">
                        Register
                    </h2>
                </div>

                {/* Form */}
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Title */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                            Title <span className="text-red-500">*</span>
                        </h4>
                        <div className="flex gap-2 overflow-x-auto">
                            {["Mr", "Mrs", "Miss", "Baby", "Master"].map((type) => (
                                <Controller
                                    key={type}
                                    name="title"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <button
                                            type="button"
                                            onClick={() => onChange(type)}
                                            className={`px-4 md:px-5 font-tbLex py-3 rounded-md text-sm font-medium whitespace-nowrap ${value === type
                                                ? "bg-linear-gradient text-white"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* First Name */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                            First Name <span className="text-red-500">*</span>
                        </h4>
                        <TextInput
                            label="First Name"
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            errors={errors.firstName}
                            registerName="firstName"
                            props={{
                                ...register('firstName', {
                                    required: "First name is required",
                                    pattern: {
                                        value: /^[A-Za-z\s\-']+$/,
                                        message: "Please enter a valid first name (letters only)"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "First name must be at least 2 characters"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "First name cannot exceed 30 characters"
                                    }
                                })
                            }}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                            Last Name <span className="text-red-500">*</span>
                        </h4>
                        <TextInput
                            label="Last Name"
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            registerName="lastName"
                            errors={errors.lastName}
                            props={{
                                ...register('lastName', {
                                    required: "Last name is required",
                                    pattern: {
                                        value: /^[A-Za-z\s\-']+$/,
                                        message: "Please enter a valid last name (letters only)"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Last name must be at least 2 characters"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Last name cannot exceed 30 characters"
                                    }
                                })
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                            Email <span className="text-red-500">*</span>
                        </h4>
                        <TextInput
                            label="Enter Your Email"
                            placeholder="Enter Your Email"
                            type="text"
                            registerName="email"
                            props={{
                                ...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Invalid email address",
                                    },
                                }),
                            }}
                            errors={errors.email}
                        />
                    </div>

                    {/* Phone */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                            Phone Number <span className="text-red-500">*</span>
                        </h4>
                        <TextInput
                            label="Enter Your Phone Number"
                            placeholder="Enter Your Phone Number"
                            type="tel"
                            registerName="mobileNo"
                            props={{
                                ...register("mobileNo", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter a valid 10-digit number",
                                    },
                                }),
                                maxLength: 10,
                                minLength: 10,
                            }}
                            errors={errors.mobileNo}
                        />
                    </div>

                    {/* Gender */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                            Gender <span className="text-red-500">*</span>
                        </h4>
                        <SelectTextInput
                            label="Select Gender"
                            placeholder="Select Gender"
                            registerName="gender"
                            options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Other" },
                            ]}
                            props={{
                                ...register("gender", { required: "Gender is required" }),
                                onChange: (e) => {
                                    setValue("gender", e.target.value);
                                },
                                value: watch("gender") || "",
                            }}
                            errors={errors.gender}
                        />
                    </div>

                    {/* Password */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                            Password <span className="text-red-500">*</span>
                        </h4>
                        <TextInput
                            label="Enter Your Password"
                            placeholder="Enter Your Password"
                            type="password"
                            registerName="password"
                            props={{
                                ...register("password", {
                                    validate: validatePassword,
                                    required: "Password is required",
                                }),
                                minLength: 6,
                            }}
                            errors={errors.password}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                            Confirm Password <span className="text-red-500">*</span>
                        </h4>
                        <TextInput
                            label="Enter Your Confirm Password"
                            placeholder="Enter Your Confirm Password"
                            type="password"
                            registerName="confirmPassword"
                            props={{
                                ...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match",
                                }),
                                minLength: 6,
                            }}
                            errors={errors.confirmPassword}
                        />
                    </div>

                    {/* Button */}
                    <div className="mt-2 col-span-1 md:col-span-2">
                        {loader ? (
                            <LoadBox className={formBtn3} />
                        ) : (
                            <button type="submit" className={`${formBtn3}`}>
                                Register
                            </button>
                        )}
                    </div>
                </form>

                {/* Already have account */}
                <div className="mt-6 text-center">
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <NavLink
                            to="/login"
                            className="font-medium text-pink-600 hover:text-pink-500 underline"
                        >
                            Login
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
