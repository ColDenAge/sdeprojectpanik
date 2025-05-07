
import React, { useContext } from "react";
import { AuthContext } from "../App";
import HelpPageHeader from "@/components/help/HelpPageHeader";
import FAQSection from "@/components/help/FAQSection";
import ContactSection from "@/components/help/ContactSection";

const Help = () => {
  const { userRole } = useContext(AuthContext);
  
  return (
    <div className="p-6">
      <HelpPageHeader />
      <div className="grid grid-cols-1 gap-8 mb-8">
        <FAQSection userRole={userRole} />
        <ContactSection />
      </div>
    </div>
  );
};

export default Help;
