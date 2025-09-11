import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <ProfileSidebar />
          </div>
          
          {/* Right Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;