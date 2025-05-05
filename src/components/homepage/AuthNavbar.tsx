
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, User, LogOut } from "lucide-react";

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
      <Link to="/" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors ${currentPath === '/' ? 'text-gray-300' : ''}`}>Homepage</Link>
      <Link to="/features" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors ${currentPath === '/features' ? 'text-gray-300' : ''}`}>Features</Link>
      <Link to="/faqs" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors ${currentPath === '/faqs' ? 'text-gray-300' : ''}`}>FAQs</Link>
      <Link to="/about-us" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors ${currentPath === '/about-us' ? 'text-gray-300' : ''}`}>About Us</Link>
      <Link to="/contact" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors ${currentPath === '/contact' ? 'text-gray-300' : ''}`}>Contact Us</Link>
      <Link to="/dashboard" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors ${currentPath === '/dashboard' ? 'text-gray-300' : ''}`}>Dashboard</Link>
      
      <div className="flex items-center gap-4">
        <button className="hover:bg-[#0a2544] rounded-full p-2">
          <User className="h-6 w-6" />
        </button>
        <button className="hover:bg-[#0a2544] rounded-full p-2">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default AuthNavbar;
