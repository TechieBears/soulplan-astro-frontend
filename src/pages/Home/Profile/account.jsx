import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import { formBtn3 } from "../../../utils/CustomClass";
import TextInput from "../../../components/TextInput/TextInput";
import { inputClass, labelClass } from "../../../utils/CustomClass";
import ImageUploadInput from "../../../components/TextInput/ImageUploadInput";

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
    gender: "",
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
              <h2 className="text-2xl font-medium text-secondary">My Account</h2>

              <div className="flex gap-3">
                {!isEditable && (
                  <button
                    onClick={() => setIsEditable(true)}
                    className={`${formBtn3} border-b`}
                  >
                    Edit Profile
                  </button>
                )}
                {/* <button
                  className={`${formBtn3} border-b`}
                  onClick={() => setShowChangePasswordModal(true)}
                >
                  Change Password
                </button> */}
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
                      <label className={labelClass}>Old Password</label>
                      <div className="relative">
                        <TextInput
                          type={showOldPassword ? "text" : "password"}
                          value={passwordForm.oldPassword}
                          onChange={handlePasswordInputChange}
                          registerName="oldPassword"
                          style={inputClass + " pr-10"}
                          placeholder="Enter old password"
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
                      <label className={labelClass}>New Password</label>
                      <div className="relative">
                        <TextInput
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={handlePasswordInputChange}
                          registerName="newPassword"
                          style={inputClass + " pr-10"}
                          placeholder="Enter new password"
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
                      <label className={labelClass}>Confirm Password</label>
                      <div className="relative">
                        <TextInput
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordInputChange}
                          registerName="confirmPassword"
                          style={inputClass + " pr-10"}
                          placeholder="Enter confirm password"
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
                <label className={labelClass} htmlFor="firstName">
                  First Name
                </label>
                <TextInput
                  type="text"
                  registerName="firstName"
                  value={formData.firstName}
                  onChange={isEditable ? handleChange : undefined}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                  style={inputClass}
                  placeholder="Enter First Name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className={labelClass} htmlFor="lastName">
                  Last Name *
                </label>
                <TextInput
                  type="text"
                  registerName="lastName"
                  value={formData.lastName}
                  onChange={isEditable ? handleChange : undefined}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                  style={inputClass}
                  placeholder="Enter Last Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} htmlFor="email">
                  Email address *
                </label>
                <TextInput
                  type="email"
                  registerName="email"
                  value={formData.email}
                  onChange={isEditable ? handleChange : undefined}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                  style={inputClass}
                  placeholder="Enter Email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone Number *
                </label>
                <TextInput
                  type="tel"
                  registerName="phone"
                  value={formData.phone}
                  onChange={isEditable ? handleChange : undefined}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                  style={inputClass}
                  placeholder="Enter Phone Number"
                />
                {apiError.toLowerCase().includes("phone") && (
                  <p className="text-red-600 text-sm mt-1">{apiError}</p>
                )}
              </div>

              {/* Profile Image */}
              <div className="col-span-1">
                <label className={labelClass} htmlFor="profileImage">
                  Profile Image
                </label>
                <ImageUploadInput
                  label="Profile Image"
                  registerName="profileImage"
                  defaultValue={user?.profileImg}
                  setValue={isEditable ? (name, value) =>
                    setFormData((prev) => ({ ...prev, [name]: value })) : undefined
                  }
                  disabled={!isEditable}
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

              {/* Gender */}
              <div className="col-span-1">
                <label htmlFor="gender" className={labelClass}>
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender || ''}
                  onChange={isEditable ? (e) => {
                    setFormData(prev => ({ ...prev, gender: e.target.value }));
                  } : undefined}
                  disabled={!isEditable}
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Action Buttons */}
              {isEditable && (
                <div className="md:col-span-2 flex gap-4 justify-self-end">
                  <button
                    type="button"
                    onClick={() => setIsEditable(false)}
                    className="px-6 py-2 border border-gray-900 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${formBtn3}`}
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
