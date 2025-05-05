
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { BellIcon, UserIcon, LogOut } from "lucide-react";

const AuthNavbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center gap-5 text-2xl font-normal text-center flex-wrap justify-between max-md:max-w-full bg-[#0B294B] text-white p-4 rounded-lg">
      <div className="self-stretch flex flex-col items-stretch font-bold">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
          alt="ByteMinds Systems Logo"
          className="aspect-[1] object-contain w-[104px] self-center z-10 max-w-full"
        />
        <div className="mt-[-9px]">ByteMinds Systems</div>
      </div>
      <Link to="/dashboard" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors ${currentPath === '/dashboard' ? 'text-gray-300' : ''}`}>Dashboard</Link>
      <Link to="/schedule" className={`z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 text-white hover:text-gray-300 transition-colors ${currentPath === '/schedule' ? 'text-gray-300' : ''}`}>
        Schedule
      </Link>
      <Link to="/classes" className={`z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 hover:text-gray-300 transition-colors ${currentPath === '/classes' ? 'text-gray-300' : ''}`}>
        Classes
      </Link>
      <Link to="/membership" className={`z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 hover:text-gray-300 transition-colors ${currentPath === '/membership' ? 'text-gray-300' : ''}`}>
        Membership
      </Link>
      <Link to="/billing" className={`z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 hover:text-gray-300 transition-colors ${currentPath === '/billing' ? 'text-gray-300' : ''}`}>
        Billing
      </Link>
      
      <div className="flex items-center gap-4">
        <button className="hover:bg-[#0a2544] rounded-full p-2">
          <BellIcon className="h-6 w-6" />
        </button>
        <button className="hover:bg-[#0a2544] rounded-full p-2">
          <UserIcon className="h-6 w-6" />
        </button>
        <button className="hover:bg-[#0a2544] rounded-full p-2">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default AuthNavbar;
