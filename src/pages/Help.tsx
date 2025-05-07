
import React, { useContext } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AuthContext } from "../App";
import HelpPageHeader from "@/components/help/HelpPageHeader";
import FAQSection from "@/components/help/FAQSection";
import ContactSection from "@/components/help/ContactSection";

const Help = () => {
  const { userRole } = useContext(AuthContext);
  
  return (
    <DashboardLayout>
      <HelpPageHeader />
      <div className="grid grid-cols-1 gap-8 mb-8">
        <FAQSection userRole={userRole} />
        <ContactSection />
      </div>
    </DashboardLayout>
  );
};

export default Help;
