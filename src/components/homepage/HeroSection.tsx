import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../router/App";

const HeroSection = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  const handleGetStarted = () => {
    navigate("/choice");
  };

  return (
    <div className="relative bg-[#0B294B] rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B294B] to-[#1a4b7c] opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Gym</span>
            <span className="block text-[#E5DEFF]">Management Experience</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Streamline your gym operations, enhance member experience, and grow your business with our comprehensive management platform.
          </p>
          <div className="mt-10">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#0B294B] bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
