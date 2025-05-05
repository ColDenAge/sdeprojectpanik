
import React, { ReactNode } from "react";

interface FeatureSectionProps {
  title: string;
  bgColor?: string;
  children: ReactNode;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ 
  title, 
  bgColor = "bg-white", 
  children 
}) => {
  return (
    <section className={`w-full py-16 ${bgColor}`}>
      <div className="container mx-auto px-5 max-w-5xl">
        <h2 className="text-[#0b294b] text-3xl font-bold mb-6">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default FeatureSection;
