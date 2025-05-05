
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BarChart } from "lucide-react";

const ManagerStatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            Active Members
          </CardTitle>
          <Users className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">245</div>
          <p className="text-xs text-gray-600">7% increase from last month</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            Class Attendance
          </CardTitle>
          <Calendar className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">89%</div>
          <p className="text-xs text-gray-600">Average attendance rate</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            Revenue
          </CardTitle>
          <BarChart className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">$24.5k</div>
          <p className="text-xs text-gray-600">Month to date</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            New Sign-ups
          </CardTitle>
          <Users className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">12</div>
          <p className="text-xs text-gray-600">In the last 7 days</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerStatCards;
