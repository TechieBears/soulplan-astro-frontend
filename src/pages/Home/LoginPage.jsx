import React, { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaInstagram, FaApple } from "react-icons/fa";
import ForgetPasswordModal from "../../components/Modals/ForgetPassword/ForgetPasswordModal";
// import ResetPasswordModal from "../../components/Modals/ResetPassword/ResetPasswordModal";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  // const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", formData);
  };

  return (
    <div className="min-h-screen mt-12 flex items-center justify-center bg-[#FFF9EF] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-red-500 text-transparent bg-clip-text">
          Login
        </h2>

        {/* Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email *
            </label>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password *
            </label>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowForgetPasswordModal(true)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-blue-600 to-red-500 hover:opacity-90 transition"
          >
            Login
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Sign Up
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">Or Continue With</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100"
            >
              <FcGoogle size={22} />
            </button>
            <button
              type="button"
              className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 text-blue-600"
            >
              <FaFacebookF size={20} />
            </button>
            <button
              type="button"
              className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 text-pink-500"
            >
              <FaInstagram size={20} />
            </button>
            <button
              type="button"
              className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 text-black"
            >
              <FaApple size={22} />
            </button>
            {/* <button
              type="button"
              onClick={() => setShowResetPasswordModal(true)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              ResetPass
            </button> */}
          </div>
        </form>
      </div>

      {/* Forget Password Modal */}
      <ForgetPasswordModal
        open={showForgetPasswordModal}
        setOpen={setShowForgetPasswordModal}
      />
      {/* Forget Password Modal */}
      {/* <ResetPasswordModal
        open={showResetPasswordModal}
        setOpen={setShowResetPasswordModal}
      /> */}
    </div>
  );
};

export default LoginPage;
