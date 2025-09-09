import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaInstagram, FaApple } from "react-icons/fa";

import TextInput from '../../components/TextInput/TextInput';
import SelectTextInput from '../../components/TextInput/SelectTextInput';
import LoadBox from '../../components/Loader/LoadBox';
import { registerUser } from '../../api';
import { setLoggedUserDetails } from '../../redux/Slices/loginSlice';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../utils/validateFunction';
import { DRAFT_KEY_C, DRAFT_KEY_L, DRAFT_KEY_P } from '../../env';

const RegisterPage = () => {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      await registerUser(data)
        .then((res) => {
          if (res?.message === 'User created successfully') {
            document.title = `Hamax : Talent Dashboard | ${res?.user?.baseRole || ''}`;
            localStorage.removeItem('persist:root');
            localStorage.removeItem(DRAFT_KEY_C);
            localStorage.removeItem(DRAFT_KEY_L);
            localStorage.removeItem(DRAFT_KEY_P);
            setTimeout(() => {
              dispatch(setLoggedUserDetails(res?.data || {}));
              setLoader(false);
              toast.success('Account created!');
            }, 100);
          } else {
            setLoader(false);
            toast.error(res?.message || 'Something went wrong');
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err?.message || 'Something went wrong');
        });
    } catch (error) {
      setLoader(false);
      console.log(error?.message || 'Something went wrong');
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

  return (
    <div className="min-h-screen bg-[#FFF9EF] mt-12 flex items-center justify-center bg-gray-50 px-4">
      <div className="card w-full max-w-3xl bg-white p-8 sm:p-10 rounded-xl shadow-md">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-red-500 text-transparent bg-clip-text">Register</h2>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="col-span-1">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <TextInput
              id="fullName"
              placeholder="Enter full name"
              type="text"
              registerName="fullName"
              props={{ ...register('fullName', { required: 'Full name is required' }) }}
              errors={errors.fullName}
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <TextInput
              id="email"
              placeholder="Enter email address"
              type="email"
              registerName="email"
              props={{ ...register('email', { required: 'Email is required', validate: validateEmail }) }}
              errors={errors.email}
            />
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <TextInput
              id="phoneNumber"
              placeholder="Enter phone number"
              type="tel"
              registerName="phoneNumber"
              props={{
                ...register('phoneNumber', { required: 'Phone number is required', validate: validatePhoneNumber }),
              }}
              errors={errors.phoneNumber}
            />
          </div>

          {/* Gender */}
          <div className="col-span-1">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <SelectTextInput
              id="gender"
              placeholder="Select gender"
              registerName="gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
              props={{
                ...register('gender', { required: 'Gender is required' }),
                value: watch('gender') || '',
              }}
              errors={errors.gender}
            />
          </div>

          {/* Password */}
          <div className="col-span-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Create Password
            </label>
            <TextInput
              id="password"
              placeholder="Enter password"
              type="password"
              registerName="password"
              props={{ ...register('password', { required: 'Password is required', validate: validatePassword }) }}
              errors={errors.password}
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <TextInput
              id="confirmPassword"
              placeholder="Confirm password"
              type="password"
              registerName="confirmPassword"
              props={{
                ...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                }),
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
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white font-medium rounded-md text-lg hover:opacity-90 transition"
              >
                Register
              </button>
            )}
          </div>
        </form>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <NavLink to="/login" className="text-center bg-gradient-to-r from-purple-600 to-red-500 text-transparent bg-clip-text">
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
          <button className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100">
            <FcGoogle size={22} />
          </button>
          <button className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 text-blue-600">
            <FaFacebookF size={20} />
          </button>
          <button className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 text-pink-500">
            <FaInstagram size={20} />
          </button>
          <button className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 text-black">
            <FaApple size={22} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
