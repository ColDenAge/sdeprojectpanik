
import React, { ReactNode } from "react";

interface FeatureCardContainerProps {
  children: ReactNode;
}

const FeatureCardContainer: React.FC<FeatureCardContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-stretch w-[33%] ml-5 first:ml-0 max-md:w-full max-md:ml-0">
      {children}
    </div>
  );
};

export default FeatureCardContainer;
