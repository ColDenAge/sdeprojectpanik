import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthProvider";

export function useMyGymsPendingApplications() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    let unsubscribes: (() => void)[] = [];
    let isMounted = true;
    let gymCounts: Record<string, number> = {};

    const fetchGymsAndListen = async () => {
      const gymsSnapshot = await getDocs(query(collection(db, "gyms"), where("ownerId", "==", user.uid)));
      const gymIds = gymsSnapshot.docs.map(doc => doc.id);
      if (gymIds.length === 0) {
        if (isMounted) setCount(0);
        return;
      }
      unsubscribes = gymIds.map(gymId => {
        const appsQuery = query(collection(db, "gyms", gymId, "applications"), where("status", "==", "pending"));
        return onSnapshot(appsQuery, (snapshot) => {
          gymCounts[gymId] = snapshot.size;
          // Sum all gyms' pending counts
          const total = Object.values(gymCounts).reduce((sum, val) => sum + val, 0);
          if (isMounted) setCount(total);
        });
      });
    };
    fetchGymsAndListen();
    return () => {
      isMounted = false;
      unsubscribes.forEach(unsub => unsub());
    };
  }, [user]);

  return count;
} 