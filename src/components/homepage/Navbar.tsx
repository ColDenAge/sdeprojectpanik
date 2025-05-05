
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <nav className="flex items-center gap-5 text-lg font-normal text-center flex-wrap justify-between bg-[#e1e1e1] w-full py-4 px-8">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
            alt="ByteMinds Systems Logo"
            className="aspect-[1] object-contain w-[50px]"
          />
          <span className="font-bold text-xl">ByteMinds Systems</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className={`${isActive('/') ? 'text-[#0b294b] font-medium' : 'text-[#363b40]'}`}
        >
          Home
        </Link>
        <Link 
          to="/features" 
          className={`${isActive('/features') ? 'text-white bg-[#0b294b] px-4 py-2 rounded-md' : 'text-[#363b40]'}`}
        >
          Features
        </Link>
        <div className="text-[#363b40]">
          FAQs
        </div>
        <div className="text-[#363b40]">
          About Us
        </div>
        <div className="text-[#363b40]">
          Contact
        </div>
        <div className="text-[#363b40]">
          Login
        </div>
        <button className="bg-[#0b294b] py-2 px-6 rounded-md text-white">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
