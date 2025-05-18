import React, { useContext } from "react";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { RoleContext } from "../router/App";

const AboutUs = () => {
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Heading Shape */}
        <div className="flex justify-center items-center mb-12 mt-8">
          <h1 className="text-black font-bold text-5xl font-cairo">About Us</h1>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#0B294B] mb-6">Our Story</h2>
            <p className="text-gray-700 mb-6">
              ByteMinds Systems is dedicated to revolutionizing the fitness industry through innovative technology solutions. 
              Our mission is to empower gym owners and members with tools that make fitness management seamless and enjoyable.
            </p>

            <h3 className="text-2xl font-semibold text-[#0B294B] mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              At ByteMinds Systems, our mission is to make gym management easier and more efficient through easy-to-use technology. We aim to help gym owners and members by providing tools that make daily tasks simple, improve communication, and support fitness goals. Our platform also allows gym owners to easily check when memberships expire and see how many members are registered, giving them better control over their gym operations.
            </p>

            <h3 className="text-2xl font-semibold text-[#0B294B] mb-4">Our Vision</h3>
            <p className="text-gray-700 mb-6">
              We envision a world where managing a gym is as easy as a few clicks, and where members can focus on their fitness 
              journey without worrying about administrative hassles. Our platform brings together the best of technology and fitness 
              management to create an unparalleled experience for both gym owners and members.
            </p>

            <h3 className="text-2xl font-semibold text-[#0B294B] mb-4">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>User-friendly interface for both gym owners and members</li>
              <li>Comprehensive management tools for gym operations</li>
              <li>Secure and reliable platform</li>
              <li>24/7 customer support</li>
              <li>Regular updates and new features</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#0B294B] mb-4">Our Team</h3>
            <p className="text-gray-700">
              Our team consists of passionate individuals who are committed to making a difference in the fitness industry. 
              With years of experience in both technology and fitness management, we understand the unique challenges faced 
              by gym owners and members, and we're here to solve them.
            </p>
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

export default AboutUs;
