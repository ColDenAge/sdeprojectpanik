import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";

const ManagerManualPayments = ({ gymIds }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!gymIds || gymIds.length === 0) return;
      const q = query(collection(db, "manualPayments"), where("gymId", "in", gymIds));
      const snapshot = await getDocs(q);
      setPayments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPayments();
  }, [gymIds]);

  const notifyUser = async (userId, message) => {
    await addDoc(collection(db, "notifications"), {
      userId,
      message,
      read: false,
      createdAt: serverTimestamp(),
    });
  };

  const handleStatusChange = async (id, status, userId) => {
    await updateDoc(doc(db, "manualPayments", id), { status });
    setPayments(payments.map(p => p.id === id ? { ...p, status } : p));
    if (status === "Paid") {
      await notifyUser(userId, "Your gym subscription is now active!");
    } else if (status === "Rejected") {
      await notifyUser(userId, "Your payment was rejected. Please contact support.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Manual Payments</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>User</th>
            <th>Receipt</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.userEmail}</td>
              <td>
                <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td>{payment.status}</td>
              <td>
                {payment.status === "Pending" && (
                  <>
                    <button onClick={() => handleStatusChange(payment.id, "Paid", payment.userId)} className="mr-2 bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                    <button onClick={() => handleStatusChange(payment.id, "Rejected", payment.userId)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerManualPayments; 