
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
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
      <Link to="/" className="text-white self-stretch my-auto hover:text-gray-300 transition-colors">Home</Link>
      <Link to="/features" className="z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 text-white hover:text-gray-300 transition-colors">
        Features
      </Link>
      <div className="z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 hover:text-gray-300 transition-colors cursor-pointer">
        FAQs
      </div>
      <div className="z-10 self-stretch pt-[-6px] my-auto pb-1.5 hover:text-gray-300 transition-colors cursor-pointer">
        About Us
      </div>
      <div className="z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 hover:text-gray-300 transition-colors cursor-pointer">
        Contact
      </div>
      <div className="z-10 self-stretch whitespace-nowrap pt-[-6px] my-auto pb-1.5 hover:text-gray-300 transition-colors cursor-pointer">
        Login
      </div>
      <div className="self-stretch my-auto">
        <button className="bg-white text-[#0B294B] pt-[11px] pb-1 px-[26px] rounded-[10px] max-md:px-5 hover:bg-gray-100 transition-colors">
          <div className="text-center text-lg font-medium">Sign Up</div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
