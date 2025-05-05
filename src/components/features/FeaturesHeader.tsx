
import React from "react";

const FeaturesHeader: React.FC = () => {
  return (
    <div className="bg-[#0b294b] w-full py-8 relative">
      <div className="container mx-auto px-5">
        <h1 className="text-white text-4xl font-bold">Features</h1>
      </div>
      {/* Diagonal cut shape */}
      <div 
        className="absolute bottom-0 right-0 w-full h-16 bg-white" 
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      ></div>
    </div>
  );
};

export default FeaturesHeader;
