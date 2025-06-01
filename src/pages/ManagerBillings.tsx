import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManagerBillingHeader from "@/components/billings/manager/ManagerBillingHeader";
import BillingStats from "@/components/billings/manager/BillingStats";
import RecentPayments from "@/components/billings/manager/RecentPayments";
import RevenueChart from "@/components/billings/manager/RevenueChart";
import ExportOptions from "@/components/billings/manager/ExportOptions";
import { useAuth } from "@/context/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ManagerBillings = () => {
  const { user } = useAuth();
  const [gymIds, setGymIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchGyms = async () => {
      const gymsRef = collection(db, "gyms");
      const q = query(gymsRef, where("ownerId", "==", user.uid));
      const snapshot = await getDocs(q);
      setGymIds(snapshot.docs.map(doc => doc.id));
    };
    fetchGyms();
  }, [user]);

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
