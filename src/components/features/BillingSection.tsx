
import React from "react";
import FeatureSection from "./FeatureSection";
import FeatureCard from "./FeatureCard";
import FeatureCardContainer from "./FeatureCardContainer";

const BillingSection: React.FC = () => {
  return (
    <FeatureSection 
      title="Billing & Payments"
      description="Streamlined financial management to save time and reduce payment headaches."
    >
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/f8e0bb1d2f78de5ff4deefb324d61797e4a20880?placeholderIfAbsent=true"
          title="Recurring Billing"
          description="Automate subscription payments with flexible payment schedules."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/a371a749002d4efa449412d39c4be0e991660aff?placeholderIfAbsent=true"
          title="Payment Processing"
          description="Secure processing for credit cards, bank transfers, and digital payments."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/597339dff7ccb32bc170be8841a8205aeda6fad5?placeholderIfAbsent=true"
          title="Financial Reporting"
          description="Generate detailed financial reports and track revenue metrics easily."
        />
      </FeatureCardContainer>
    </FeatureSection>
  );
};

export default BillingSection;
