
import React, { ReactNode } from "react";

interface FeatureSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ 
  title, 
  description, 
  children,
  className = ""
}) => {
  return (
    <div className={`shadow-sm bg-white self-center flex w-full max-w-[1098px] items-center gap-5 px-14 py-12 rounded-2xl max-md:flex-wrap max-md:px-5 ${className}`}>
      <div className="flex flex-col items-stretch w-full max-md:max-w-full">
        <div className="text-slate-800 text-3xl font-bold tracking-wide text-center max-md:max-w-full">
          {title}
        </div>
        <div className="text-stone-500 text-base font-medium leading-6 mt-2.5 text-center max-md:max-w-full">
          {description}
        </div>
        <div className="mt-11 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex justify-center max-md:flex-col max-md:items-stretch max-md:gap-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
