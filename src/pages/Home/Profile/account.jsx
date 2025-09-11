import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";

// Temporary placeholder components
const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

export default function AccountPage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const user = useSelector((state) => state.user.userDetails);

  const [previewImage, setPreviewImage] = useState(null);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profileImage: null,
  });

  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "profileImage" && files && files[0]) {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, profileImage: file }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check image size only before submit
    if (formData.profileImage && formData.profileImage.size > 2 * 1024 * 1024) {
      toast.error("Profile image must be under 2MB");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
      setIsEditable(false);
      setApiError("");
    } catch (error) {
      console.error("Update failed:", error);
      const errorMessage = "Failed to update profile.";
      toast.error(errorMessage);
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Simulate API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowChangePasswordModal(false);
    } catch (err) {
      console.error("Change password error:", err);
      toast.error("Failed to change password");
    }
  };

  return (
    <>
      <Private>
        <UserDashboard>
          <ProfileSidebar>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">My Account</h2>

              <div className="flex gap-3">
                {!isEditable && (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="px-4 py-2 bg-[#420098] text-white rounded-lg hover:bg-[#5c1bb5]"
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-[#420098] text-white rounded-lg hover:bg-[#5c1bb5]"
                  onClick={() => setShowChangePasswordModal(true)}
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Change Password Modal */}
            {showChangePasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
                    <button
                      onClick={() => setShowChangePasswordModal(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>

                    <h2 className="text-xl font-semibold mb-4">
                      Change Password
                    </h2>

                    <form onSubmit={handlePasswordSubmit}>
                      {/* Old Password */}
                      <div className="mb-4">
                        <label className="block mb-1">Old Password</label>
                        <div className="relative">
                          <input
                            name="oldPassword"
                            type={showOldPassword ? "text" : "password"}
                            value={passwordForm.oldPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full p-2 pr-10 border border-gray-300 rounded"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                          >
                            {showOldPassword ? "👁️" : "🙈"}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div className="mb-4">
                        <label className="block mb-1">New Password</label>
                        <div className="relative">
                          <input
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full p-2 pr-10 border border-gray-300 rounded"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                          >
                            {showNewPassword ? "👁️" : "🙈"}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="mb-4">
                        <label className="block mb-1">Confirm Password</label>
                        <div className="relative">
                          <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full p-2 pr-10 border border-gray-300 rounded"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? "👁️" : "🙈"}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#420098] text-white px-4 py-2 rounded hover:bg-[#5c1bb5]"
                        disabled={isLoading}
                      >
                        {isLoading ? "Changing..." : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
            )}

            {/* Profile Form */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* First Name */}
              <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    required
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />
              </div>

              {/* Last Name */}
              <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    required
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />
              </div>

              {/* Email */}
              <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email address *
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />
              </div>

              {/* Phone */}
              <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    required
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />
                {apiError.toLowerCase().includes("phone") && (
                  <p className="text-red-600 text-sm mt-1">{apiError}</p>
                )}
              </div>

              {/* Profile Image */}
              <div className="md:col-span-2">
                  <label
                    htmlFor="profileImage"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Profile Image
                  </label>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />

                {/* Show existing or preview image */}
                {(previewImage || user?.profileImg) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-1">Preview:</p>
                    <img
                      src={previewImage || user.profileImg}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Save Button */}
              {isEditable && (
                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-[#420098] text-white font-medium rounded-lg hover:bg-[#5c1bb5]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </ProfileSidebar>
        </UserDashboard>
      </Private>
    </>
  );
}
