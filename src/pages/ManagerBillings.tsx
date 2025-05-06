
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManagerBillingHeader from "@/components/billings/manager/ManagerBillingHeader";
import BillingStats from "@/components/billings/manager/BillingStats";
import RecentPayments from "@/components/billings/manager/RecentPayments";
import RevenueChart from "@/components/billings/manager/RevenueChart";
import ExportOptions from "@/components/billings/manager/ExportOptions";

const ManagerBillings = () => {
  return (
    <DashboardLayout>
      <ManagerBillingHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <BillingStats />
          <RevenueChart />
          <RecentPayments />
        </div>
        <div>
          <ExportOptions />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerBillings;
