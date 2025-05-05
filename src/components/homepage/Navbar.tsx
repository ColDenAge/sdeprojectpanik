
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <nav className="flex items-center gap-5 text-2xl font-normal text-center flex-wrap justify-between max-md:max-w-full">
      <div className="self-stretch flex flex-col items-stretch font-bold">
        <Link to="/">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
            alt="ByteMinds Systems Logo"
            className="aspect-[1] object-contain w-[104px] self-center z-10 max-w-full"
          />
        </Link>
        <div className="mt-[-9px]">ByteMinds Systems</div>
      </div>
      <Link 
        to="/" 
        className={`text-[rgba(54,59,64,1)] self-stretch my-auto ${isActive('/') ? 'text-[rgba(54,59,64,1)]' : ''}`}
      >
        Home
      </Link>
      <Link 
        to="/features" 
        className={`z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 ${isActive('/features') ? 'text-gray-500' : ''}`}
      >
        Features
      </Link>
      <div className="z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5">
        FAQs
      </div>
      <div className="z-10 self-stretch pt-[-6px] my-auto pb-1.5">
        About Us
      </div>
      <div className="z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5">
        Contact
      </div>
      <div className="z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5">
        Login
      </div>
      <div className="self-stretch my-auto">
        <button className="bg-[rgba(11,41,75,1)] pt-[11px] pb-1 px-[26px] rounded-[10px] max-md:px-5 text-white">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
