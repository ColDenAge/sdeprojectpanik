
import React from "react";
import FeatureSection from "./FeatureSection";

const ManagementFeature: React.FC = () => {
  return (
    <FeatureSection title="Management" bgColor="bg-[#e1e1e1]">
      <p className="text-[#363b40] mb-4">
        GymWatch supports the creation and management of businesses through using this tool to monitor and assess the
        members of your establishment. GymWatch allows you to communicate, oversee, and promote your growing business
        for more members.
      </p>
    </FeatureSection>
  );
};

export default ManagementFeature;
