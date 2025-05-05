
import React, { useContext } from "react";
import { AuthContext } from "../App";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GymManagementHeader from "@/components/gym-management/GymManagementHeader";
import GymStatsCards from "@/components/gym-management/GymStatsCards";
import GymManagementTabs from "@/components/gym-management/GymManagementTabs";

const Members = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <GymManagementHeader />
      <GymStatsCards />
      <GymManagementTabs />
    </DashboardLayout>
  );
};

export default Members;
