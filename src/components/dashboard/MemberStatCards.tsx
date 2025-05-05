
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Dumbbell, BarChart, Users } from "lucide-react";

const MemberStatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            Upcoming Classes
          </CardTitle>
          <Calendar className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">3</div>
          <p className="text-xs text-gray-600">Classes scheduled this week</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            Workout Streak
          </CardTitle>
          <Dumbbell className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">8 days</div>
          <p className="text-xs text-gray-600">Keep it up!</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            Fitness Goals
          </CardTitle>
          <BarChart className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">2/5</div>
          <p className="text-xs text-gray-600">Goals completed this month</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0B294B]">
            Personal Trainers
          </CardTitle>
          <Users className="h-4 w-4 text-[#0B294B]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0B294B]">5</div>
          <p className="text-xs text-gray-600">Available for booking</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberStatCards;
