
import React, { useContext } from "react";
import { AuthContext } from "../App";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GymManagementHeader from "@/components/gym-management/GymManagementHeader";
import GymStatsCards from "@/components/gym-management/GymStatsCards";
import GymManagementTabs from "@/components/gym-management/GymManagementTabs";
import { SearchProvider } from "@/components/gym-management/SearchContext";

const Members = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <SearchProvider>
        <GymManagementHeader />
      </SearchProvider>
      <GymStatsCards />
      <GymManagementTabs />
    </DashboardLayout>
  );
};

export default Members;
