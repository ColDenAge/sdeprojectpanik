
import React from "react";
import FeatureSection from "./FeatureSection";
import FeatureCard from "./FeatureCard";
import FeatureCardContainer from "./FeatureCardContainer";

const MembershipSection: React.FC = () => {
  return (
    <FeatureSection 
      title="Membership Management"
      description="Powerful membership management features that help you grow your business and keep members engaged."
    >
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/f4def0507e86acef0c6822ea8f8fb581a7afcb51?placeholderIfAbsent=true"
          title="Membership Lifecycle"
          description="Manage all aspects of membership from signup to renewal in one place."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/4e29922125736ce317257e6ac71e90db042c74fa?placeholderIfAbsent=true"
          title="Member Profiles"
          description="Collect custom data, track progress, and manage member info efficiently."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/99c1860d3516b3024e21274609d5df20aa7da30f?placeholderIfAbsent=true"
          title="Access Control"
          description="Secure entry system with card readers, QR codes, and biometric options."
        />
      </FeatureCardContainer>
    </FeatureSection>
  );
};

export default MembershipSection;
