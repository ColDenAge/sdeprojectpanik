import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../router/App";

const CallToAction = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  const handleGetStarted = () => {
    navigate("/choice");
  };

  return (
    <div className="bg-[#0B294B] rounded-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block text-[#E5DEFF]">Join GymWatch today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#0B294B] bg-white hover:bg-gray-100"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
