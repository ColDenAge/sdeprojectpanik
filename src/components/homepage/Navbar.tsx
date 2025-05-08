
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

        {/* Center space - for visual balance */}
        <div className="hidden md:block md:flex-1"></div>

        {/* User Controls - Empty div for consistency with AuthNavbar */}
        <div className="flex items-center gap-4 md:w-1/4 justify-end">
          {/* This space is left empty intentionally to match AuthNavbar layout */}
        </div>
      </div>

      {/* Navigation Links - Centered */}
      <div className="w-full flex items-center justify-center gap-4 text-lg">
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
              isActive('/') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
            }`}
          >
            <span>Home</span>
          </Link>
        
          <Link
            to="/features"
            className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
              isActive('/features') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
            }`}
          >
            <span>Features</span>
          </Link>
        
          <Link
            to="/faqs"
            className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
              isActive('/faqs') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
            }`}
          >
            <span>FAQs</span>
          </Link>
        
          <Link
            to="/about-us"
            className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
              isActive('/about-us') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
            }`}
          >
            <span>About Us</span>
          </Link>
        
          <Link
            to="/contact"
            className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
              isActive('/contact') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
            }`}
          >
            <span>Contact</span>
          </Link>

          <Link
            to="/login"
            className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
              isActive('/login') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
            }`}
          >
            <span>Login</span>
          </Link>

          <Link to="/signup">
            <button className="bg-white text-[#0B294B] py-2 px-4 rounded-[10px] hover:bg-gray-100 transition-colors">
              <div className="text-center text-lg font-medium">Sign Up</div>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
