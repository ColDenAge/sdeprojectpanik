
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

// Mock data for revenue chart
const revenueData = [
  { month: "Jan", revenue: 4200, projections: 4000 },
  { month: "Feb", revenue: 4500, projections: 4200 },
  { month: "Mar", revenue: 5800, projections: 5000 },
  { month: "Apr", revenue: 5200, projections: 5400 },
  { month: "May", revenue: 6000, projections: 5600 },
  { month: "Jun", revenue: 7200, projections: 6000 },
  { month: "Jul", revenue: 7800, projections: 7000 },
  { month: "Aug", revenue: 8400, projections: 7500 },
  { month: "Sep", revenue: 9000, projections: 8000 },
  { month: "Oct", revenue: 9200, projections: 8500 },
  { month: "Nov", revenue: 9800, projections: 9000 },
  { month: "Dec", revenue: 11200, projections: 10000 },
];

const RevenueChart = () => {
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
