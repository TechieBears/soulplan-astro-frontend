import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { validatePassword } from '../../utils/validateFunction';
import { resetPassword } from '../../api';
import TextInput from '../../components/TextInput/TextInput';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
          Reset Your Password!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password to reset your account.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New password *
            </label>
            <TextInput
              label="New password"
              type="password"
              registerName="newPassword"
              placeholder="Enter new password"
              props={{
                ...register('newPassword', {
                  validate: validatePassword,
                  required: "Password is required"
                })
              }}
              errors={errors.newPassword}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm password *
            </label>
            <TextInput
              label="Confirm password"
              type="password"
              registerName="confirmPassword"
              placeholder="Confirm new password"
              props={{
                ...register('confirmPassword', {
                  validate: validatePassword,
                  required: "Please confirm your password"
                })
              }}
              errors={errors.confirmPassword}
            />
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
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 inline-flex items-center gap-1 font-semibold"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;