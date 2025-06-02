import React, { useContext } from "react";
import { RoleContext } from "../router/App";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  const { userRole } = useContext(RoleContext);

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
