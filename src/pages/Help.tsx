
import React, { useContext } from "react";
import { AuthContext } from "../App";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import FAQSection from "@/components/help/FAQSection";
import ContactSection from "@/components/help/ContactSection";

const Help = () => {
  const { userRole, isAuthenticated } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen w-full">
      {/* Navigation Bar */}
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">Help & Support</h1>
        <div className="grid grid-cols-1 gap-8 mb-8">
          <FAQSection userRole={userRole} />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Help;
