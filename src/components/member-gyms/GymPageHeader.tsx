
import React from "react";
import { MapPin } from "lucide-react";

const GymPageHeader = () => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">My Gyms</h1>
      <button className="bg-[#0B294B] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors">
        <MapPin className="h-5 w-5" />
        Find New Gyms
      </button>
    </div>
  );
};

export default GymPageHeader;
