import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { useAuth } from "@/context/AuthProvider";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RevenueChart = () => {
  const { user } = useAuth();
  const [revenueData, setRevenueData] = React.useState(
    months.map((month) => ({ month, revenue: 0, projections: 0 }))
  );

  React.useEffect(() => {
    if (!user) return;
    let unsubscribe = null;
    const fetchRevenue = async () => {
      // 1. Fetch gyms for owner
      const gymsRef = collection(db, "gyms");
      const gymsQuery = query(gymsRef, where("ownerId", "==", user.uid));
      const gymsSnapshot = await getDocs(gymsQuery);
      const gymIds = gymsSnapshot.docs.map(doc => doc.id);
      if (gymIds.length === 0) {
        setRevenueData(months.map((month) => ({ month, revenue: 0, projections: 0 })));
        return;
      }
      // 2. Listen to payments for these gyms
      const paymentsRef = collection(db, "payments");
      const allPayments = [];
      const unsubscribes = [];
      for (let i = 0; i < gymIds.length; i += 10) {
        const batch = gymIds.slice(i, i + 10);
        const paymentsQuery = query(paymentsRef, where("gymId", "in", batch));
        const unsubscribeBatch = onSnapshot(paymentsQuery, (paymentsSnapshot) => {
          allPayments.length = 0;
          paymentsSnapshot.docs.forEach(doc => allPayments.push(doc.data()));
          // 3. Aggregate revenue by month
          const now = new Date();
          const thisYear = now.getFullYear();
          const monthlyRevenue = Array(12).fill(0);
          allPayments.forEach(p => {
            if (p.status === "Paid") {
              // Use the month field if available, otherwise fallback to date
              const month = p.month !== undefined ? p.month : new Date(p.date).getMonth();
              const year = p.year !== undefined ? p.year : new Date(p.date).getFullYear();
              if (year === thisYear) {
                monthlyRevenue[month] += p.amount;
              }
            }
          });
          setRevenueData(
            months.map((month, idx) => ({
              month,
              revenue: monthlyRevenue[idx],
              projections: 0 // You can add projections logic if needed
            }))
          );
        });
        unsubscribes.push(unsubscribeBatch);
      }
      unsubscribe = () => unsubscribes.forEach(unsub => unsub());
    };
    fetchRevenue();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, undefined]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0B294B"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Actual Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="projections" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Projected Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
