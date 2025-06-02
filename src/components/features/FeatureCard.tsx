
import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center max-md:mt-10">
      <img
        loading="lazy"
        src={icon}
        alt={title}
        className="aspect-square object-contain object-center w-12 overflow-hidden"
      />
      <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
        {title}
      </div>
      <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
        {description}
      </div>
    </div>
  );
};

export default FeatureCard;
