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
      // Only get gyms where ownerId matches the current user
      const gymsSnapshot = await getDocs(query(collection(db, "gyms"), where("ownerId", "==", user.uid)));
      const gymIds = gymsSnapshot.docs.map(doc => doc.id);
      if (gymIds.length === 0) {
        if (isMounted) setCount(0);
        return;
      }
      unsubscribes = gymIds.map(gymId => {
        const appsQuery = query(collection(db, "gyms", gymId, "applications"), where("status", "==", "pending"));
        return onSnapshot(appsQuery, (snapshot) => {
          // Only count documents that actually exist and have status 'pending'
          const pendingDocs = snapshot.docs.filter(doc => doc.exists() && doc.data().status === 'pending');
          gymCounts[gymId] = pendingDocs.length;
          // Sum all gyms' pending counts for this user only
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