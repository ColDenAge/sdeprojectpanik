
import React from "react";
import Navbar from "@/components/homepage/Navbar";
import FeaturesHeader from "@/components/features/FeaturesHeader";
import MembershipSection from "@/components/features/MembershipSection";
import BillingSection from "@/components/features/BillingSection";
import BookingSection from "@/components/features/BookingSection";
import BusinessSection from "@/components/features/BusinessSection";

const Features: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-5 max-w-[1194px] mx-auto mt-6">
        <Navbar />
      </div>
      <section className="flex flex-col items-stretch gap-5 max-w-full w-[1194px] mt-5 max-md:mt-10">
        <FeaturesHeader />
        <MembershipSection />
        <BillingSection />
        <BookingSection />
        <BusinessSection />
      </section>
    </div>
  );
};

export default Features;
