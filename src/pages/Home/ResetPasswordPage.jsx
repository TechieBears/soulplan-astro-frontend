import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { validatePassword } from '../../utils/validateFunction';
import { resetPassword } from '../../api';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link');
      navigate('/login');
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({
        token,
        password: data.newPassword,
      });

      if (response?.success || response?.message === 'Password updated successfully') {
        toast.success('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response?.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-12 flex items-center justify-center bg-[#FFF9EF] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-red-500 text-transparent bg-clip-text mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter new password"
                {...register('newPassword', {
                  required: 'New password is required',
                  validate: validatePassword
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm new password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('newPassword') || 'Passwords do not match'
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-blue-600 to-red-500 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Back to Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;