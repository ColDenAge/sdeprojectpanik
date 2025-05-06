
import React from "react";
import { FileText, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ManagerBillingHeader = () => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Revenue Management</h1>
        <p className="text-muted-foreground mt-1">
          Monitor payments, revenue, and manage billing operations
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-muted hover:bg-muted/80 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 relative">
          <Bell className="h-5 w-5" />
          <span className="hidden md:inline">Notifications</span>
          <Badge className="absolute -top-2 -right-2 bg-red-500">3</Badge>
        </button>
        <button className="bg-[#0B294B] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors">
          <FileText className="h-5 w-5" />
          <span className="hidden md:inline">Generate Reports</span>
        </button>
      </div>
    </div>
  );
};

export default ManagerBillingHeader;
