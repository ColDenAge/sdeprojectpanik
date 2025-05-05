
import React from "react";
import FeaturesHeader from "../components/features/FeaturesHeader";
import MembershipsFeature from "../components/features/MembershipsFeature";
import BillingsFeature from "../components/features/BillingsFeature";
import BookingFeature from "../components/features/BookingFeature";
import ManagementFeature from "../components/features/ManagementFeature";
import BottomDiagonal from "../components/features/BottomDiagonal";

const Features: React.FC = () => {
  return (
    <main className="flex flex-col w-full">
      {/* Header section with blue background */}
      <FeaturesHeader />

      {/* Feature Sections */}
      <MembershipsFeature />
      <BillingsFeature />
      <BookingFeature />
      
      {/* Management Section with gray background */}
      <div className="w-full">
        <ManagementFeature />
        <BottomDiagonal />
      </div>
    </main>
  );
};

export default Features;
