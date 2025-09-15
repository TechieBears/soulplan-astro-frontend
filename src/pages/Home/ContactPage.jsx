import React from "react";
import Breadcrumbs from "../../components/breadcrum";
import TextInput from "../../components/TextInput/TextInput";
import { inputClass, labelClass, formBtn3 } from "../../utils/CustomClass";

const ContactPage = () => {
  return (
    <>
      <Breadcrumbs />
      <section className="w-full bg-[#fff6ef] py-10 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info & Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Left Side - Info */}
            <div className="space-y-6 text-gray-700">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h4 className="text-base sm:text-lg font-medium">Phone</h4>
                <p className="mt-1 font-semibold text-sm sm:text-base break-words">
                  +971 4 765 4321
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h4 className="text-base sm:text-lg font-medium">Email</h4>
                <p className="mt-1 font-semibold text-sm sm:text-base break-words">
                  booking@Astro.com
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h4 className="text-base sm:text-lg font-medium">Address</h4>
                <p className="mt-1 font-semibold text-sm sm:text-base break-words">
                  Germany — 785 15th Street, Office 478 <br />
                  Berlin, De 81566
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <form className="bg-white shadow-md rounded-lg p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <TextInput
                    type="text"
                    placeholder="Enter first name"
                    style={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <TextInput
                    type="text"
                    placeholder="Enter last name"
                    style={inputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <TextInput
                    type="text"
                    placeholder="Enter phone number"
                    style={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <TextInput
                    type="email"
                    placeholder="Enter email address"
                    style={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  rows="4"
                  className={`${inputClass} resize-none`}
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className={`${formBtn3} w-48 py-3  font-semibold text-white shadow-md hover:opacity-90`}
              >
                Submit
              </button>
            </form>
          </div>

          {/* Google Maps */}
          <div className="mt-12 sm:mt-16 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-p font-bold mb-6 sm:mb-10">
              Find Us on <span className="text-red-500">Google Maps</span>
            </h1>
            <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.990798153229!2d55.27078241501025!3d25.204849983898388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434f1e0e4e0f%3A0xa7b5b89cfba3e7e0!2sDubai!5e0!3m2!1sen!2sae!4v1674834000000!5m2!1sen!2sae"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
