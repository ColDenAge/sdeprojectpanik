
import React from "react";
import FeatureSection from "./FeatureSection";
import FeatureCard from "./FeatureCard";
import FeatureCardContainer from "./FeatureCardContainer";

const BusinessSection: React.FC = () => {
  return (
    <FeatureSection 
      title="Business Management"
      description="Comprehensive tools to run your fitness business more efficiently."
      className="mb-24 max-md:mb-10"
    >
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/01ede6b7c4df6018abd4c5f896e32c9ba5c7e22f?placeholderIfAbsent=true"
          title="Staff Management"
          description="Handle employee scheduling, permissions, and performance tracking."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/e5de1581409258136d3f46f3e739221799ee6377?placeholderIfAbsent=true"
          title="Reporting & Analytics"
          description="Data-driven insights on attendance, revenue, and business performance."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/daaadd35557446d9766ae81236fe87daaa464557?placeholderIfAbsent=true"
          title="Marketing Tools"
          description="Email campaigns, referral programs, and promotional tools to grow your business."
        />
      </FeatureCardContainer>
    </FeatureSection>
  );
};

export default BusinessSection;
