import React from "react";
import Navbar from "@/components/homepage/Navbar";
import HeroSection from "@/components/homepage/HeroSection";
import FeatureSection from "@/components/homepage/FeatureSection";
import InfoBox from "@/components/homepage/InfoBox";
import FeaturesGrid from "@/components/homepage/FeaturesGrid";
import CallToAction from "@/components/homepage/CallToAction";

const Index: React.FC = () => {
  return (
    <main className="bg-[rgba(66,73,81,1)] flex flex-col overflow-hidden items-stretch">
      {/* Hero Section with Background */}
      <header className="flex flex-col relative z-10 min-h-[1083px] w-full text-white pt-[9px] px-20 max-md:max-w-full max-md:px-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/203385d887c2d460dda9e13a6b2fbe5afd49e7db?placeholderIfAbsent=true"
          alt="Hero background"
          className="absolute h-full w-full object-cover inset-0"
        />
        <div className="relative z-10 mb-[-89px] w-full max-w-[1587px] max-md:max-w-full max-md:mb-2.5">
          <Navbar />
          <HeroSection />
        </div>
      </header>

      {/* Simplify Process Section */}
      <FeatureSection
        title="Simplify the process of your gym"
        description="Easily enroll and streamline the membership registration of your gym, allowing sign-ups members and prospects online or through an in-person kiosk, using a laptop, tablet or mobile device."
        imageSrc="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9baccccdb853220625b2565728b74b88c2376fb0?placeholderIfAbsent=true"
        imageAlt="Gym management process"
        imageSecondary="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/ade4876cb50e35bf3ff8b3e87e33fb953f3355a1?placeholderIfAbsent=true"
      />

      {/* Billings Section */}
      <FeatureSection
        title="Check your payment informations"
        description="View your overall payments and checks, along with able to control how you can pay for membership. Automatic notifications will be sent regarding about deadlines and membership information."
        imageSrc="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/1c2779d24a82344aa0af3e06d8aa07d2f0cd3338?placeholderIfAbsent=true"
        imageAlt="Payment information"
        imageSecondary="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/1a7551a83d87357f5dd952742ac1442f34334fb0?placeholderIfAbsent=true"
        reversed={true}
      />

      {/* Reviewing Missed Billings */}
      <InfoBox
        title="Reviewing your missed billings"
        description="Able to review and track all the missed out deadlines and due payments, allowing you to further manage your bills and track your progress in the program you admitted to."
        imageSrc="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/c200d4069c2e467fbb13c3474c5ff3d15a05750a?placeholderIfAbsent=true"
      />

      {/* Features Grid */}
      <FeaturesGrid
        leftFeatures={[
          {
            title: "Gym Management",
            description:
              "Track and manage the members of your gym, see their activity and their billings. Create events, rankings or even, contact with the members to have appointments.",
          },
          {
            title: "Automation",
            description:
              "As a manager, you don't have to worry about your gym's reception of processing each and every single one of your gym. GymWatch is here to help you hasten the process and make customer-service easier on your staff.",
          },
        ]}
        rightTitle="Communication"
        rightDescription="Chat and communicate with the respective gyms, programs, or mentors you're aligned with or subscribed to. Set appointments, or meetings with the people."
        rightImageSrc="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/ccdf4d564d37e1a45ef3ff19949250660fd92a9b?placeholderIfAbsent=true"
      />

      {/* Call to Action */}
      <CallToAction
        title="Ready to start your program?"
        buttonText="Get Started"
        imageSrc="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/d489859c03ed768e25e5fb523cad2b80e1ebdd35?placeholderIfAbsent=true"
      />
    </main>
  );
};

export default Index;