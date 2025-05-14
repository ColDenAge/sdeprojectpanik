import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";

export function useTotalPendingApplications() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const q = query(
      collectionGroup(db, "applications"),
      where("status", "==", "pending")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  return count;
} 