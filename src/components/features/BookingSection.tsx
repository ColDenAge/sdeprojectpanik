
import React from "react";
import FeatureSection from "./FeatureSection";
import FeatureCard from "./FeatureCard";
import FeatureCardContainer from "./FeatureCardContainer";

const BookingSection: React.FC = () => {
  return (
    <FeatureSection 
      title="Booking & Scheduling"
      description="Efficient scheduling tools for classes, facilities, and personal training sessions."
    >
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/1a73d1b01cdf7ea4bba73b283b7234566131c55c?placeholderIfAbsent=true"
          title="Class Management"
          description="Organize classes with flexible schedules, waitlists, and instructor assignments."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/ebc0d9cd07f69bc1c5242a29cca0e4810daf50f1?placeholderIfAbsent=true"
          title="Facility Booking"
          description="Allow members to reserve courts, equipment, and rooms through online booking."
        />
      </FeatureCardContainer>
      <FeatureCardContainer>
        <FeatureCard
          icon="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/4417b0117b913aebb1fce471d8aa30008c96b0a8?placeholderIfAbsent=true"
          title="PT Scheduling"
          description="Coordinate trainer availability, client appointments, and session packages."
        />
      </FeatureCardContainer>
    </FeatureSection>
  );
};

export default BookingSection;
