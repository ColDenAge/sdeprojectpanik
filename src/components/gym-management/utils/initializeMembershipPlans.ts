import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthProvider";

export const initializeMembershipPlans = async (userId: string) => {
  try {
    const gymsRef = collection(db, "gyms");
    const q = query(gymsRef, where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);

    const defaultPlans = [
      {
        id: crypto.randomUUID(),
        name: "Basic Plan",
        price: 29.99,
        duration: "Monthly",
        benefits: ["Access to gym", "Basic equipment usage"]
      },
      {
        id: crypto.randomUUID(),
        name: "Premium Plan",
        price: 49.99,
        duration: "Monthly",
        benefits: ["Access to gym", "All equipment", "Group classes", "Personal trainer"]
      }
    ];

    for (const doc of querySnapshot.docs) {
      const gymData = doc.data();
      if (!gymData.membershipPlans) {
        await updateDoc(doc.ref, {
          membershipPlans: defaultPlans,
          activeMembers: []
        });
      }
    }
  } catch (error) {
    console.error("Error initializing membership plans:", error);
  }
};