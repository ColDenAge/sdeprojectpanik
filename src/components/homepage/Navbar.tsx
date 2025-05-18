import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to determine if a link is active
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <nav className="flex flex-col items-center gap-4 font-normal text-center flex-wrap justify-between w-full bg-[#0B294B] text-white p-4 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 flex-shrink-0 md:w-1/4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
            alt="ByteMinds Systems Logo"
            className="aspect-[1] object-contain w-[60px] max-w-full"
          />
          <div className="text-sm font-bold">ByteMinds Systems</div>
        </div>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`hover:text-gray-300 transition-colors ${
            isActive('/')
              ? 'text-white font-medium border-b-2 border-white pb-1'
              : 'text-gray-300'
          }`}
        >
          Home
        </Link>
        <Link
          to="/features"
          className={`hover:text-gray-300 transition-colors ${
            isActive('/features')
              ? 'text-white font-medium border-b-2 border-white pb-1'
              : 'text-gray-300'
          }`}
        >
          Features
        </Link>
        <Link
          to="/faqs"
          className={`hover:text-gray-300 transition-colors ${
            isActive('/faqs')
              ? 'text-white font-medium border-b-2 border-white pb-1'
              : 'text-gray-300'
          }`}
        >
          FAQs
        </Link>
        <Link
          to="/about-us"
          className={`hover:text-gray-300 transition-colors ${
            isActive('/about-us')
              ? 'text-white font-medium border-b-2 border-white pb-1'
              : 'text-gray-300'
          }`}
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className={`hover:text-gray-300 transition-colors ${
            isActive('/contact')
              ? 'text-white font-medium border-b-2 border-white pb-1'
              : 'text-gray-300'
          }`}
        >
          Contact
        </Link>
        <Link
          to="/login"
          className={`hover:text-gray-300 transition-colors ${
            isActive('/login')
              ? 'text-white font-medium border-b-2 border-white pb-1'
              : 'text-gray-300'
          }`}
        >
          Login
        </Link>
        <Link to="/signup">
          <button className="bg-white text-[#0B294B] py-2 px-4 rounded-[10px] hover:bg-gray-100 transition-colors">
            <div className="text-center text-lg font-medium">Sign Up</div>
          </button>
        </Link>
      </div>

      <div className="hidden md:block md:w-1/4"></div> {/* Empty div for balance */}
    </nav>
  );
};

export default Navbar;
