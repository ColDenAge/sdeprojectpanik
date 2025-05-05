
import React from "react";
import { HelpCircle } from "lucide-react";

const HelpPageHeader = () => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Help & Support</h1>
      <button className="bg-[#0B294B] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors">
        <HelpCircle className="h-5 w-5" />
        Contact Support
      </button>
    </div>
  );
};

export default HelpPageHeader;
