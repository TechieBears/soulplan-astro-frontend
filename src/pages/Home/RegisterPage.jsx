import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import TextInput from '../../components/TextInput/TextInput';
import SelectTextInput from '../../components/TextInput/SelectTextInput';
import LoadBox from '../../components/Loader/LoadBox';
import { registerUser } from '../../api';
import { setLoggedUser, setUserDetails } from '../../redux/Slices/loginSlice';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../utils/validateFunction';
import { formBtn1, formBtn3 } from '../../utils/CustomClass';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase';

const RegisterPage = () => {
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            setLoader(true);
            const response = await registerUser(data);
            if (response?.message === 'User created successfully' || response?.success) {
                document.title = `SoulPlan : Dashboard | ${response?.user?.role || ''}`;
                dispatch(setLoggedUser(true));
                dispatch(setUserDetails(response?.user || response?.data));
                toast.success('Account created successfully!');
                setLoader(false);
                reset()
                navigate('/login', { replace: true });
            } else {
                setLoader(false);
                toast.error(response?.message || 'Registration failed');
            }
        } catch (error) {
            setLoader(false);
            console.error('Registration error:', error);
            toast.error(error?.message || 'Something went wrong');
        }
    };

    useGSAP(() => {
        gsap.from('.card', {
            y: 30,
            opacity: 0,
            ease: 'power1.inOut',
            duration: 1,
        });
    }, []);

    const handerGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="h-full bg-[#FFF9EF] py-24 flex items-center justify-center  px-4">
            <div className="card w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
                {/* Title */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-center text-p">
                        Register
                    </h2>
                </div>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* First Name */}
                    <div className="col-span-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                            First Name
                        </label>
                        <TextInput
                            id="firstName"
                            placeholder="Enter first name"
                            type="text"
                            registerName="firstName"
                            props={{ ...register('firstName', { required: "First name is required", minLength: { value: 3, message: "First name must be at least 3 characters" }, maxLength: { value: 50, message: "First name cannot exceed 50 characters" } }), minLength: 3 }}
                            errors={errors.firstName}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="col-span-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Last Name
                        </label>
                        <TextInput
                            id="lastName"
                            placeholder="Enter last name"
                            type="text"
                            registerName="lastName"
                            props={{ ...register('lastName', { required: "Last name is required", minLength: { value: 3, message: "Last name must be at least 3 characters" }, maxLength: { value: 50, message: "Last name cannot exceed 50 characters" } }), minLength: 3 }}
                            errors={errors.lastName}
                        />
                    </div>

                    {/* Email */}
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email
                        </label>
                        <TextInput
                            label="Enter Your Email"
                            placeholder="Enter Your Email"
                            type="text"
                            registerName="email"
                            props={{ ...register('email'), validate: validateEmail, required: "Email is required" }}
                            errors={errors.email}
                        />
                    </div>

                    {/* Phone */}
                    <div className="col-span-1">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone Number
                        </label>
                        <TextInput
                            label="Enter Your Phone Number"
                            placeholder="Enter Your Phone Number"
                            type="tel"
                            registerName="phoneNumber"
                            props={{ ...register('phoneNumber', { validate: validatePhoneNumber, required: "Phone number is required" }), maxLength: 10, minLength: 10 }}
                            errors={errors.phoneNumber}
                        />
                    </div>

                    {/* Gender */}
                    <div className="col-span-1">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Gender
                        </label>
                        <SelectTextInput
                            label="Select Gender"
                            placeholder="Select Gender"
                            registerName="gender"
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' },
                            ]}
                            props={{
                                ...register('gender', { required: "Gender is required" }),
                                onChange: (e) => {
                                    setValue('gender', e.target.value);
                                },
                                value: watch('gender') || '',
                            }}
                            errors={errors.gender}
                        />
                    </div>

                    {/* Password */}
                    <div className="col-span-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <TextInput
                            label="Enter Your Password"
                            placeholder="Enter Your Password"
                            type="password"
                            registerName="password"
                            props={{ ...register('password', { validate: validatePassword, required: "Password is required" }), minLength: 6, }}
                            errors={errors.password}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="col-span-1">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Confirm Password
                        </label>
                        <TextInput
                            label="Enter Your Confirm Password"
                            placeholder="Enter Your Confirm Password"
                            type="password"
                            registerName="confirmPassword"
                            props={{
                                ...register('confirmPassword', {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watch('password') || 'Passwords do not match',
                                }), minLength: 6,
                            }}
                            errors={errors.confirmPassword}
                        />
                    </div>

                    {/* Button */}
                    <div className="md:col-span-2 mt-2">
                        {loader ? (
                            <LoadBox />
                        ) : (
                            <button
                                type="submit"
                                className={`${formBtn3}`}
                            >
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

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        className="p-3 px-5 w-3/4 h-[51px] flex justify-center items-center rounded-full shadow-md bg-white hover:bg-gray-100 border border-slate-100 gap-2"
                        onClick={handerGoogleSignIn}
                    >

                        <FcGoogle size={22} />
                        <span className="text-sm font-tbLex font-normal">Continue with Google</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
