import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Building2, Clock, Calendar, Activity } from "lucide-react";
import { activeSubscriptions } from "./data/subscriptionData";
// If you have a hook or data for activities, import it here
// import { recentActivities } from "./data/recentActivities";

// Placeholder for recent activities and next class
const recentActivities = [];
const nextClass = null; // or { date: 'May 6', name: 'Yoga at FitLife Downtown' }

const MemberGymStats = () => {
  const activeMembershipsCount = activeSubscriptions.length;
  const uniqueGyms = new Set(activeSubscriptions.map(sub => sub.gymName));
  const uniqueGymsCount = uniqueGyms.size;
  const recentActivitiesCount = recentActivities.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeMembershipsCount}</div>
          <p className="text-xs text-muted-foreground">
            Across {activeMembershipsCount === 0 ? 0 : uniqueGymsCount} different gyms
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentActivitiesCount}</div>
          <p className="text-xs text-muted-foreground">In the last 7 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Class</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {nextClass ? (
            <>
              <div className="text-2xl font-bold">{nextClass.date}</div>
              <p className="text-xs text-muted-foreground">{nextClass.name}</p>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">No upcoming classes</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberGymStats;
