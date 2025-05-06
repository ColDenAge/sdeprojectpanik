
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Users } from "lucide-react";

const BillingStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Monthly Revenue" 
        value="$12,458" 
        change="+8.2%" 
        trend="up"
        icon={<Wallet className="h-5 w-5" />}
      />
      <StatCard 
        title="Yearly Revenue" 
        value="$145,932" 
        change="+12.5%" 
        trend="up"
        icon={<Wallet className="h-5 w-5" />}
      />
      <StatCard 
        title="Active Subscriptions" 
        value="348" 
        change="+5.3%" 
        trend="up"
        icon={<Users className="h-5 w-5" />}
      />
      <StatCard 
        title="Overdue Payments" 
        value="12" 
        change="-2.1%" 
        trend="down"
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
