
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GymPageHeader from "@/components/member-gyms/GymPageHeader";
import MemberGymStats from "@/components/member-gyms/MemberGymStats";
import ActiveSubscriptions from "@/components/member-gyms/ActiveSubscriptions";
import RecentActivities from "@/components/member-gyms/RecentActivities";
import AvailableGyms from "@/components/member-gyms/AvailableGyms";

const MemberGyms = () => {
  return (
    <DashboardLayout>
      <GymPageHeader />
      <MemberGymStats />
      <ActiveSubscriptions />
      <RecentActivities />
      <AvailableGyms />
    </DashboardLayout>
  );
};

export default MemberGyms;
