
import React from "react";
import FeatureSection from "./FeatureSection";

const BillingsFeature: React.FC = () => {
  return (
    <FeatureSection title="Billings">
      <p className="text-[#363b40] mb-4">
        Payments are automatically processed and systematic notifications regarding about the due deadlines are featured in
        GymWatch. This allows you to look and analyze your overall payments and information, seeing details about the
        programs you signed up for.
      </p>
    </FeatureSection>
  );
};

export default BillingsFeature;
