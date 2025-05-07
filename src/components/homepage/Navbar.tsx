
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center gap-4 font-normal w-full bg-[#0B294B] text-white p-4 rounded-lg">
      <div className="flex-shrink-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
          alt="ByteMinds Systems Logo"
          className="aspect-[1] object-contain w-[90px] max-w-full"
        />
        <div className="mt-[-6px] text-sm font-bold">ByteMinds Systems</div>
      </div>

      <div className="flex-grow flex items-center gap-3 md:gap-5 flex-wrap text-lg">
        <Link to="/" className={`text-white hover:text-gray-300 transition-colors ${currentPath === '/' ? 'text-gray-300' : ''}`}>
          Home
        </Link>
        <Link to="/features" className={`text-white hover:text-gray-300 transition-colors ${currentPath === '/features' ? 'text-gray-300' : ''}`}>
          Features
        </Link>
        <Link to="/faqs" className={`text-white hover:text-gray-300 transition-colors ${currentPath === '/faqs' ? 'text-gray-300' : ''}`}>
          FAQs
        </Link>
        <Link to="/about-us" className={`text-white hover:text-gray-300 transition-colors ${currentPath === '/about-us' ? 'text-gray-300' : ''}`}>
          About Us
        </Link>
        <Link to="/contact" className={`text-white hover:text-gray-300 transition-colors ${currentPath === '/contact' ? 'text-gray-300' : ''}`}>
          Contact
        </Link>
        <Link to="/login" className={`text-white hover:text-gray-300 transition-colors ${currentPath === '/login' ? 'text-gray-300' : ''}`}>
          Login
        </Link>
        <Link to="/signup">
          <button className="bg-white text-[#0B294B] py-2 px-4 rounded-[10px] hover:bg-gray-100 transition-colors">
            <div className="text-center text-lg font-medium">Sign Up</div>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
