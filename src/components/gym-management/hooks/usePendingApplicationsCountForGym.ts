import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function usePendingApplicationsCountForGym(gymId: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!gymId) return;
    const q = query(
      collection(db, "gyms", gymId, "applications"),
      where("status", "==", "pending")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [gymId]);

  return count;
} 