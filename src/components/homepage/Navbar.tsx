
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
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

      <div className="flex items-center justify-between flex-wrap gap-4 md:gap-8">
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
      </div>

      <div className="my-auto">
        <Link to="/signup">
          <button className="bg-white text-[#0B294B] py-2 px-6 rounded-[10px] hover:bg-gray-100 transition-colors">
            <div className="text-center text-lg font-medium">Sign Up</div>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
