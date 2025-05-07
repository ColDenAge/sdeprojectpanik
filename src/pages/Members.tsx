
import React, { useContext } from "react";
import { AuthContext } from "../App";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GymManagementHeader from "@/components/gym-management/GymManagementHeader";
import GymStatsCards from "@/components/gym-management/GymStatsCards";
import GymManagementTabs from "@/components/gym-management/GymManagementTabs";
import { SearchProvider } from "@/components/gym-management/SearchContext";
import { Toaster } from "@/components/ui/toaster";

const Members = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <SearchProvider>
        <GymManagementHeader />
        <GymStatsCards />
        <GymManagementTabs userRole={userRole} />
        <Toaster />
      </SearchProvider>
    </DashboardLayout>
  );
};

export default Members;
