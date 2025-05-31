import React, { useContext, useEffect, useState } from "react";
import { RoleContext } from "../../router/App";
import MemberStatCards from "./MemberStatCards";
import ManagerStatCards from "./ManagerStatCards";
import ClassesList from "./ClassesList";
import QuickActions from "./QuickActions";
import { useAuth } from "@/context/AuthProvider";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const DashboardContent: React.FC = () => {
  const { userRole } = useContext(RoleContext);
  const { user } = useAuth();

  const [upcomingClassesCount, setUpcomingClassesCount] = useState(0);
  const [workoutStreakDays, setWorkoutStreakDays] = useState(0);

  useEffect(() => {
    if (!user || userRole !== "member") return;

    const fetchMemberData = async () => {
      try {
        const userDocRef = doc(db, "gym_members", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          // Fetch and count upcoming classes
          const enrolledGymIds = userData.enrolledGyms || [];
          let count = 0;
          const now = new Date();

          for (const gymId of enrolledGymIds) {
            const classesRef = collection(db, "gyms", gymId, "classes");
            const classesSnapshot = await getDocs(classesRef);
            classesSnapshot.docs.forEach(doc => {
              const classData = doc.data();
              // Assuming classData.schedule contains a parsable date/time string
              // You might need to adjust this based on your actual schedule data structure
              const classDateTime = new Date(classData.schedule); // **Needs adjustment based on schedule format**
              if (classDateTime > now) {
                count++;
              }
            });
          }
          setUpcomingClassesCount(count);

          // Calculate and set workout streak
          const attendanceHistory = userData.attendanceHistory || []; // Assuming attendanceHistory is stored in user data
          const streak = calculateWorkoutStreak(attendanceHistory);
          setWorkoutStreakDays(streak);
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [user, userRole]);

  // TODO: Refine calculateWorkoutStreak to handle potential timezones and inconsistent date formats
  const calculateWorkoutStreak = (attendanceHistory: string[]): number => {
    if (!attendanceHistory || attendanceHistory.length === 0) {
      return 0;
    }

    // Sort attendance dates in ascending order and remove duplicates (by day)
    const uniqueSortedDates = Array.from(new Set(attendanceHistory.map(dateString => new Date(dateString).toDateString())))
                               .map(dateString => new Date(dateString))
                               .sort((a, b) => a.getTime() - b.getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let lastDate: Date | null = null;

    for (const currentDate of uniqueSortedDates) {
      if (lastDate === null) {
        currentStreak = 1;
      } else {
        const timeDiff = currentDate.getTime() - lastDate.getTime();
        const diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive day
          currentStreak++;
        } else if (diffDays > 1) {
          // Gap in streak
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 1;
        }
        // If diffDays is 0, it's the same day, no change to streak
      }
      lastDate = currentDate;
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    return longestStreak;
  };


  return (
    <>
      {/* Stats Cards - Conditionally rendered based on role */}
      {userRole === "member" ? <MemberStatCards upcomingClassesCount={upcomingClassesCount} workoutStreakDays={workoutStreakDays} /> : <ManagerStatCards />}

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClassesList />
        <QuickActions />
      </div>
    </>
  );
};

export default DashboardContent;
