import React from "react";
import { User } from "firebase/auth";

interface ProfileFormProps {
  fullName: string;
  onFullNameChange: (value: string) => void;
  user: User | null;
  userRole: string | null;
  isLoading: boolean;
  onSave: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  fullName,
  onFullNameChange,
  user,
  userRole,
  isLoading,
  onSave
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
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
          value={user?.email || ""}
          disabled
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B] bg-gray-50"
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
          value={userRole || ""}
          disabled
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B] bg-gray-50"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSave}
          disabled={isLoading}
          className="px-4 py-2 bg-[#0B294B] text-white rounded-md hover:bg-[#0a2544] focus:outline-none focus:ring-2 focus:ring-[#0B294B] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;