import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { RoleContext } from "../router/App";

const Index = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  const handleGetStarted = () => {
    navigate("/choice");
  };

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Hero Section */}
        <div className="relative bg-[#0B294B] rounded-3xl overflow-hidden mb-16">
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

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0B294B] sm:text-4xl">
              Why Choose ByteMinds?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform offers everything you need to run a successful gym business
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0B294B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0B294B] mb-2">Easy Management</h3>
              <p className="text-gray-600">
                Streamline your operations with our intuitive management tools
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0B294B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0B294B] mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0B294B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0B294B] mb-2">Fast Setup</h3>
              <p className="text-gray-600">
                Get started in minutes with our simple onboarding process
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#E5DEFF] rounded-3xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#0B294B] sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Join thousands of gym owners who trust ByteMinds Systems
              </p>
              <div className="mt-8">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0B294B] hover:bg-[#0a2544] md:py-4 md:text-lg md:px-10"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
