import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Building2, Clock, Calendar, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const MemberGymStats = () => {
  const { user } = useAuth();
  const [activeMembershipsCount, setActiveMembershipsCount] = useState(0);
  const [uniqueGymsCount, setUniqueGymsCount] = useState(0);
  const [recentActivitiesCount, setRecentActivitiesCount] = useState(0);
  const [nextClass, setNextClass] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        // Fetch all gyms
        const gymsRef = collection(db, 'gyms');
        const gymsSnapshot = await getDocs(gymsRef);
        const gyms = gymsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Count active memberships
        let activeCount = 0;
        for (const gym of gyms) {
          const membersRef = collection(db, 'gyms', gym.id, 'members');
          const memberQuery = query(membersRef, where('memberId', '==', user.uid));
          const memberSnapshot = await getDocs(memberQuery);
          if (!memberSnapshot.empty) {
            activeCount++;
          }
        }

        setActiveMembershipsCount(activeCount);
        setUniqueGymsCount(activeCount); // Since we're counting unique gyms where user is a member

        // Fetch recent activities (you can implement this based on your activity tracking system)
        setRecentActivitiesCount(0);

        // Fetch next class (you can implement this based on your class scheduling system)
        setNextClass(null);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [user]);

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
