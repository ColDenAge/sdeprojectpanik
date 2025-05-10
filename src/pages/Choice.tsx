import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/homepage/Navbar";
import { RoleContext } from "../router/App";
import { useAuth } from "@/context/AuthProvider";

const Choice = () => {
  const navigate = useNavigate();
  const { userRole, setUserRole } = useContext(RoleContext);
  const { user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChoice = (role: string) => {
    // Set the role in context and localStorage
    setUserRole(role);
    localStorage.setItem("userRole", role);
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="w-full px-6 py-4">
        <Navbar />
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Heading Shape */}
        <div className="flex justify-center items-center mb-12 mt-8">
          <h1 className="text-black font-bold text-5xl font-cairo">Choose Your Role</h1>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-start cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleChoice("manager")}
            >
              <h2 className="text-3xl font-bold text-[#0B294B] mb-4">Gym Owner</h2>
              <p className="text-gray-700 mb-6">
                Manage your gym operations efficiently with our comprehensive management tools.
                Track memberships, handle payments, and streamline your business processes.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Member management</li>
                <li>Payment processing</li>
                <li>Class scheduling</li>
                <li>Equipment tracking</li>
                <li>Business analytics</li>
              </ul>
              <button
                className="mt-auto w-full bg-[#0B294B] hover:bg-[#0a2544] text-white font-semibold py-2 px-4 rounded transition-colors"
                onClick={e => { e.stopPropagation(); handleChoice("manager"); }}
              >
                Join as Gym Owner
              </button>
            </div>

            <div
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-start cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleChoice("member")}
            >
              <h2 className="text-3xl font-bold text-[#0B294B] mb-4">Gym Member</h2>
              <p className="text-gray-700 mb-6">
                Access your gym membership details, book classes, and manage your fitness journey
                all in one place.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Class bookings</li>
                <li>Membership details</li>
                <li>Payment history</li>
                <li>Fitness tracking</li>
                <li>Progress monitoring</li>
              </ul>
              <button
                className="mt-auto w-full bg-[#0B294B] hover:bg-[#0a2544] text-white font-semibold py-2 px-4 rounded transition-colors"
                onClick={e => { e.stopPropagation(); handleChoice("member"); }}
              >
                Join as Gym Member
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0B294B] text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
              alt="ByteMinds Systems Logo"
              className="w-14 h-14 mb-2"
            />
            <span className="font-bold text-lg">ByteMinds Systems</span>
          </div>
          <div className="flex space-x-8">
            <a href="/about-us" className="hover:underline">About Us</a>
            <a href="/features" className="hover:underline">Features</a>
            <a href="/faqs" className="hover:underline">FAQs</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Choice;
