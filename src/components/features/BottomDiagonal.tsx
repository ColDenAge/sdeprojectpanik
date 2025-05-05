
import React from "react";

const BottomDiagonal: React.FC = () => {
  return (
    <div className="relative h-20 mt-10">
      <div 
        className="absolute bottom-0 right-0 w-full h-20 bg-white" 
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 0)" }}
      ></div>
    </div>
  );
};

export default BottomDiagonal;
