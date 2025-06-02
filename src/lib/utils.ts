import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Fetches revenue data for the current year for all gyms owned by the user.
 * @param {string} userId - The gym owner's user ID.
 * @returns {Promise<Array<{ month: string, revenue: number }>>}
 */
export async function fetchRevenueDataForOwner(userId) {
  // 1. Fetch gyms for owner
  const gymsRef = collection(db, "gyms");
  const gymsQuery = query(gymsRef, where("ownerId", "==", userId));
  const gymsSnapshot = await getDocs(gymsQuery);
  const gymIds = gymsSnapshot.docs.map(doc => doc.id);
  if (gymIds.length === 0) {
    return months.map((month) => ({ month, revenue: 0 }));
  }
  // 2. Fetch payments for these gyms
  const paymentsRef = collection(db, "payments");
  const payments = [];
  for (let i = 0; i < gymIds.length; i += 10) {
    const batch = gymIds.slice(i, i + 10);
    const paymentsQuery = query(paymentsRef, where("gymId", "in", batch));
    const paymentsSnapshot = await getDocs(paymentsQuery);
    payments.push(...paymentsSnapshot.docs.map(doc => doc.data()));
  }
  // 3. Aggregate revenue by month
  const now = new Date();
  const thisYear = now.getFullYear();
  const monthlyRevenue = Array(12).fill(0);
  payments.forEach(p => {
    if (p.status === "Paid") {
      const date = new Date(p.date);
      if (date.getFullYear() === thisYear) {
        monthlyRevenue[date.getMonth()] += p.amount;
      }
    }
  });
  return months.map((month, idx) => ({ month, revenue: monthlyRevenue[idx] }));
}
