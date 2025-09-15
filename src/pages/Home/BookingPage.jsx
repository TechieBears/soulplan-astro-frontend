import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import TextInput from "../../components/TextInput/TextInput";
import SelectTextInput from "../../components/TextInput/SelectTextInput";
import { formBtn3 } from "../../utils/CustomClass";

const BookingPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceType: "Palmistry",
    timeSlot: "12:00 PM - 01:00 PM",
    currency: "Indian (INR)",
    fullName: "Siddharth Singh",
    mobile: "9856585685",
    email: "siddharthsingh123@gmail.com",
  });

  const serviceOptions = [
    { value: "Palmistry", label: "Palmistry" },
    { value: "Astrology", label: "Astrology" },
    { value: "Tarot Reading", label: "Tarot Reading" },
    { value: "Numerology", label: "Numerology" },
  ];

  const timeSlotOptions = [
    { value: "09:00 AM - 10:00 AM", label: "09:00 AM - 10:00 AM" },
    { value: "10:00 AM - 11:00 AM", label: "10:00 AM - 11:00 AM" },
    { value: "11:00 AM - 12:00 PM", label: "11:00 AM - 12:00 PM" },
    { value: "12:00 PM - 01:00 PM", label: "12:00 PM - 01:00 PM" },
    { value: "02:00 PM - 03:00 PM", label: "02:00 PM - 03:00 PM" },
    { value: "03:00 PM - 04:00 PM", label: "03:00 PM - 04:00 PM" },
  ];

  const currencyOptions = [
    { value: "Indian (INR)", label: "Indian (INR)" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Booking request submitted successfully!");
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-orange-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-left sm:justify-left py-4 gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-left text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Go Back
          </button>

        </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-self-center justify-self-center p-8 sm:text-self-center">
            Booking Calendar
          </h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left side - Service Type + Calendar */}
          <div className="space-y-6">
            {/* Service Type */}
            <div>
              <SelectTextInput
                label="Services Type"
                options={serviceOptions}
                registerName="serviceType"
                props={{
                  value: formData.serviceType,
                  onChange: (e) =>
                    setFormData({ ...formData, serviceType: e.target.value }),
                }}
              />
            </div>
            {/* Calendar */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-4 sm:p-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button className="text-white">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="bg-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
                <span className="text-purple-600 font-medium text-sm sm:text-base">
                  August 2025
                </span>
              </div>
              <button className="text-white">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-white text-xs sm:text-sm">
              {/* Day headers */}
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                <div key={day} className="font-medium">
                  {day}
                </div>
              ))}

              {/* Example static days (1–31) */}
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-1.5 sm:p-2 rounded-lg cursor-pointer ${
                    i + 1 === 14
                      ? "bg-orange-500"
                      : "hover:bg-white hover:text-purple-600"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Right side - Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Time Slots */}
            <div>
              <SelectTextInput
                label="Time Slots"
                options={timeSlotOptions}
                registerName="timeSlot"
                props={{
                  value: formData.timeSlot,
                  onChange: (e) =>
                    setFormData({ ...formData, timeSlot: e.target.value }),
                }}
              />
            </div>

            {/* Currency */}
            <div>
              <SelectTextInput
                label="Currency"
                options={currencyOptions}
                registerName="currency"
                props={{
                  value: formData.currency,
                  onChange: (e) =>
                    setFormData({ ...formData, currency: e.target.value }),
                }}
              />
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TextInput
                  label="Full Name"
                  type="text"
                  registerName="fullName"
                  placeholder="Enter your full name"
                  props={{
                    value: formData.fullName,
                    onChange: (e) =>
                      setFormData({ ...formData, fullName: e.target.value }),
                  }}
                />
              </div>
              <div>
                <TextInput
                  label="Mobile Number"
                  type="tel"
                  registerName="mobile"
                  placeholder="Enter your mobile number"
                  props={{
                    value: formData.mobile,
                    onChange: (e) =>
                      setFormData({ ...formData, mobile: e.target.value }),
                  }}
                />
              </div>
            </div>

            <div>
              <TextInput
                label="Email Address"
                type="email"
                registerName="email"
                placeholder="Enter your email address"
                props={{
                  value: formData.email,
                  onChange: (e) =>
                    setFormData({ ...formData, email: e.target.value }),
                }}
              />
            </div>

            {/* Book Service Button */}
            <div className="flex items-center bg-gray-100 rounded-lg p-3 sm:p-4">
              <button
                type="submit"
                className={` ${formBtn3} py-2.5 sm:py-3 px-4 sm:px-6 rounded-md font-medium transition-colors text-sm sm:text-base`}
              >
                Book Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
