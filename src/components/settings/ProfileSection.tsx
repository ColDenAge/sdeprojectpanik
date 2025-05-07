import React, { useContext } from "react";
import { RoleContext } from "../../router/App";

const ProfileSection = () => {
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[#0B294B] mb-6">Profile Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
            value={userRole || ""}
            disabled
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#0B294B] text-white rounded-md hover:bg-[#0a2544] focus:outline-none focus:ring-2 focus:ring-[#0B294B] focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
