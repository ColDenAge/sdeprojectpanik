
import React, { useContext } from "react";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import FeaturesHeader from "@/components/features/FeaturesHeader";
import FeatureSection from "@/components/features/FeatureSection";
import MembershipSection from "@/components/features/MembershipSection";
import BusinessSection from "@/components/features/BusinessSection";
import BookingSection from "@/components/features/BookingSection";
import BillingSection from "@/components/features/BillingSection";
import { AuthContext } from "../App";

const Features = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <div className="p-6">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>
      
      <div className="max-w-7xl mx-auto pb-20">
        <FeaturesHeader />
        {/* Note: The features components like MembershipSection already use FeatureSection internally */}
        <MembershipSection />
        <BusinessSection />
        <BookingSection />
        <BillingSection />
      </div>
    </div>
  );
};

export default Features;
