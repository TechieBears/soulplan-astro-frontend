import React from "react";
import { Icon } from "@iconify/react";
import TextInput from "../../TextInput/TextInput";

export default function ResetPasswordModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Reset Password!
          </span>
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Enter your new password to reset your account
        </p>

        {/* Password Input */}
        <div className="space-y-4">
          <TextInput
            label="Password *"
            type="password"
            placeholder="Enter password"
            icon="mdi:lock-outline"
          />
          <TextInput
            label="Confirm Password *"
            type="password"
            placeholder="Enter password"
            icon="mdi:lock-outline"
          />
        </div>

        {/* Reset Button */}
        <button className="w-full mt-6 py-3 rounded-lg font-medium text-white shadow-md transition duration-200 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 hover:opacity-90">
          Reset your Password
        </button>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center text-sm text-gray-700 hover:text-black transition"
          >
            <Icon icon="mdi:arrow-left" className="mr-1" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
