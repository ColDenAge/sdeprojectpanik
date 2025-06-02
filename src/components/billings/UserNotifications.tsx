import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "@/context/AuthProvider";

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchNotifications = async () => {
      const q = query(collection(db, "notifications"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchNotifications();
  }, [user]);

  const markAsRead = async (id) => {
    await updateDoc(doc(db, "notifications", id), { read: true });
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold mb-2">Notifications</h3>
      {notifications.length === 0 && <div>No notifications.</div>}
      <ul>
        {notifications.map(n => (
          <li key={n.id} className={`mb-2 p-2 rounded ${n.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
            <span>{n.message}</span>
            {!n.read && (
              <button onClick={() => markAsRead(n.id)} className="ml-2 text-xs text-blue-700 underline">Mark as read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNotifications; 