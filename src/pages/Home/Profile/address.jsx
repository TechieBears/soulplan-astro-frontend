"use client";
// import Image from "next/image";
import React from "react";
import Sidebar from "../../../components/Sidebar/ProfileSidebar";

const AddressPage = () => {
  const handleAddAddress = () => {
    // Add your routing or modal logic here
    alert("Redirect to Add New Address form.");
  };

  return (
    <>
      <Sidebar />
      <div className="justify-center items-center px-4 pt-8 bg-white">
        <div className="max-w-screen-md mx-auto w-full">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-lg md:text-xl font-bold text-black">
              My Address
            </h1>
            <button
              onClick={handleAddAddress}
              className="bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Add New Address
            </button>
          </div>

          {/* Empty Address State */}
          <div className="flex flex-col items-center justify-center text-center mt-16 px-2">
            {/* <Image
            src="/assets/images/location.png"
            alt="Location Icon"
            width={140}
            height={140}
            className="mb-4"
          /> */}
            <p className="text-sm text-black">
              No saved address. Tap to add a new address.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
