
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountSettingsHeader from "@/components/settings/AccountSettingsHeader";
import ProfileSection from "@/components/settings/ProfileSection";
import SecuritySection from "@/components/settings/SecuritySection";
import NotificationsSection from "@/components/settings/NotificationsSection";

const AccountSettings = () => {
  return (
    <DashboardLayout>
      <AccountSettingsHeader />
      <div className="grid grid-cols-1 gap-8 mb-8">
        <ProfileSection />
        <SecuritySection />
        <NotificationsSection />
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
