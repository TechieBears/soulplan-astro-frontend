import React from "react";
import phoneMockup from "../../assets/phone-mockup.png"; // replace with your phone image
import playstore from "../../assets/google-play-black.png"; // replace with your Play Store button image

export default function DownloadAppSection() {
  return (
    <div className="w-full bg-[#fff6ef] px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Text */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-2xl md:text-4xl font-bold leading-snug">
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              Download Our Astrologer
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent">
              App Today
            </span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg">
            For a seamless experience, download our apps on your phone
          </p>

          {/* Play Store Button */}
          <div className="mt-6 flex justify-center md:justify-start">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={playstore} alt="Google Play" className="h-14" />
            </a>
          </div>
        </div>

        {/* Right Side - Phone Mockup */}
        <div className="relative flex justify-center md:justify-end">
          {/* Background phones */}
          <img
            src={phoneMockup}
            alt="App Preview"
            className="w-60 md:w-72 lg:w-80 relative z-10"
          />
        </div>
      </div>
    </div>
  );
}
