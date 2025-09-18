import React, { useState } from "react";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar"; // adjust import path if needed
import { formBtn3 } from "../../../utils/CustomClass";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+1 234-567-8900",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      type: "Home",
      isDefault: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    type: "Home",
    isDefault: false,
  });

  const handleAddAddress = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      type: "Home",
      isDefault: false,
    });
    setEditingAddress(null);
    setShowAddForm(true);
  };

  const handleEditAddress = (address) => {
    setFormData(address);
    setEditingAddress(address.id);
    setShowAddForm(true);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If setting as default, remove default from other addresses
    if (formData.isDefault) {
      setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
    }

    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress
            ? { ...formData, id: editingAddress, name: `${formData.firstName} ${formData.lastName}` }
            : addr
        )
      );
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
      };
      setAddresses([...addresses, newAddress]);
    }

    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <ProfileSidebar>
      <div className="flex justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-medium text-secondary">My Address</h2>

        <div className="flex gap-3">
          <button
            className={`${formBtn3} border-b`}
            onClick={handleAddAddress}
          >
            Add New Address
          </button>
        </div>
      </div>

      {/* Address List */}
      {addresses.length > 0 && !showAddForm && (
        <div className="space-y-4 mb-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {address.name}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{address.phone}</p>
                  <p className="text-gray-600 mb-1">{address.address}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} {address.postalCode},{" "}
                    {address.country}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-[#420098] hover:text-[#5c1bb5] text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {addresses.length === 0 && !showAddForm && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">
              No saved address. Add a new address to get started.
            </p>
          </div>
      )}

      {/* Add/Edit Address Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Phone + Address Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <div className="flex gap-2">
                  {["Home", "Office", "Friend", "Other"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`px-4 py-2 rounded-md text-sm font-medium border ${
                        formData.type === type
                          ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter address"
              />
            </div>

            {/* State, City, Zip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter city name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code / Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            {/* Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>

            {/* Default Address */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />

              <label className="text-sm text-gray-700 cursor-pointer">
                Set as default address
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 justify-self-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 rounded-md border border-gray-900 text-gray-900 bg-white hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${formBtn3}`}
              >
                {editingAddress ? "Save Changes" : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      )}
    </ProfileSidebar>
  );
};

export default AddressPage;
