import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Users } from "lucide-react";

const BillingStats = () => {
  const { user } = useAuth();
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);
  const [overduePayments, setOverduePayments] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      // 1. Fetch gyms for owner
      const gymsRef = collection(db, "gyms");
      const gymsQuery = query(gymsRef, where("ownerId", "==", user.uid));
      const gymsSnapshot = await getDocs(gymsQuery);
      const gymIds = gymsSnapshot.docs.map(doc => doc.id);
      if (gymIds.length === 0) {
        setMonthlyRevenue(0);
        setYearlyRevenue(0);
        setActiveSubscriptions(0);
        setOverduePayments(0);
        return;
      }
      // 2. Fetch payments for these gyms
      const paymentsRef = collection(db, "payments");
      // Firestore 'in' queries are limited to 10 items
      const payments = [];
      for (let i = 0; i < gymIds.length; i += 10) {
        const batch = gymIds.slice(i, i + 10);
        const paymentsQuery = query(paymentsRef, where("gymId", "in", batch));
        const paymentsSnapshot = await getDocs(paymentsQuery);
        payments.push(...paymentsSnapshot.docs.map(doc => doc.data()));
      }
      // 3. Calculate stats
      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();
      let monthRevenue = 0;
      let yearRevenue = 0;
      let activeSubs = 0;
      let overdue = 0;
      payments.forEach(p => {
        if (p.status === "Paid") {
          const date = new Date(p.date);
          if (date.getFullYear() === thisYear) {
            yearRevenue += p.amount;
            if (date.getMonth() === thisMonth) {
              monthRevenue += p.amount;
            }
          }
          activeSubs += 1;
        } else if (p.status === "Overdue" || p.status === "Failed") {
          overdue += 1;
        }
      });
      setMonthlyRevenue(monthRevenue);
      setYearlyRevenue(yearRevenue);
      setActiveSubscriptions(activeSubs);
      setOverduePayments(overdue);
    };
    fetchStats();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Monthly Revenue" 
        value={`$${monthlyRevenue.toLocaleString()}`} 
        change={monthlyRevenue > 0 ? "+8.2%" : "0%"} 
        trend={monthlyRevenue > 0 ? "up" : "down"}
        icon={<Wallet className="h-5 w-5" />}
      />
      <StatCard 
        title="Yearly Revenue" 
        value={`$${yearlyRevenue.toLocaleString()}`} 
        change={yearlyRevenue > 0 ? "+12.5%" : "0%"} 
        trend={yearlyRevenue > 0 ? "up" : "down"}
        icon={<Wallet className="h-5 w-5" />}
      />
      <StatCard 
        title="Active Subscriptions" 
        value={activeSubscriptions.toString()} 
        change={activeSubscriptions > 0 ? "+5.3%" : "0%"} 
        trend={activeSubscriptions > 0 ? "up" : "down"}
        icon={<Users className="h-5 w-5" />}
      />
      <StatCard 
        title="Overdue Payments" 
        value={overduePayments.toString()} 
        change={overduePayments > 0 ? "-2.1%" : "0%"} 
        trend={overduePayments > 0 ? "down" : "up"}
        icon={<Wallet className="h-5 w-5" />}
      />
    </div>
  );
};

const StatCard = ({ title, value, change, trend, icon }: { 
  title: string; 
  value: string; 
  change: string; 
  trend: "up" | "down";
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="bg-muted p-2 rounded-full">
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold">{value}</p>
          <div className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingStats;
