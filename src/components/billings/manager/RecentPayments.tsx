import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Bell, CreditCard, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const PAYMENT_METHODS = [
  { value: "GCash", label: "GCash" },
  { value: "GoTyme", label: "GoTyme" },
];

const RecentPayments = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [payments, setPayments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [gymOptions, setGymOptions] = useState<any[]>([]);
  const [selectedGymId, setSelectedGymId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [selectedGym, setSelectedGym] = useState(null);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  React.useEffect(() => {
    if (!user) return;
    const fetchPayments = async () => {
      setLoading(true);
      // 1. Fetch gyms for owner
      const gymsRef = collection(db, "gyms");
      const gymsQuery = query(gymsRef, where("ownerId", "==", user.uid));
      const gymsSnapshot = await getDocs(gymsQuery);
      const gymIds = gymsSnapshot.docs.map(doc => doc.id);
      setGymOptions(gymsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
      if (gymIds.length === 0) {
        setPayments([]);
        setLoading(false);
        return;
      }
      // 2. Fetch regular payments
      const paymentsRef = collection(db, "payments");
      const allPayments: any[] = [];
      for (let i = 0; i < gymIds.length; i += 10) {
        const batch = gymIds.slice(i, i + 10);
        const paymentsQuery = query(paymentsRef, where("gymId", "in", batch));
        const paymentsSnapshot = await getDocs(paymentsQuery);
        allPayments.push(...paymentsSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          type: "regular"
        })));
      }
      // 3. Fetch manual payments
      const manualPaymentsRef = collection(db, "manualPayments");
      for (let i = 0; i < gymIds.length; i += 10) {
        const batch = gymIds.slice(i, i + 10);
        const manualPaymentsQuery = query(manualPaymentsRef, where("gymId", "in", batch));
        const manualPaymentsSnapshot = await getDocs(manualPaymentsQuery);
        allPayments.push(...manualPaymentsSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          type: "manual"
        })));
      }
      // 4. Sort all payments by date (descending)
      allPayments.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : a.uploadedAt?.toDate?.() || 0;
        const dateB = b.date ? new Date(b.date) : b.uploadedAt?.toDate?.() || 0;
        return dateB - dateA;
      });
      setPayments(allPayments);
      setLoading(false);
    };
    fetchPayments();
  }, [user]);

  const notifyUser = async (userId, message) => {
    await addDoc(collection(db, "notifications"), {
      userId,
      message,
      read: false,
      createdAt: serverTimestamp(),
    });
  };

  const handleStatusChange = async (id, status, userId, gymId, amount, paymentMethod) => {
    try {
      // First update the manual payment status
      await updateDoc(doc(db, "manualPayments", id), { 
        status, 
        gymId, 
        amount: Number(amount), 
        paymentMethod,
        updatedAt: serverTimestamp()
      });

      // Update local state
      setPayments(payments.map(p => p.id === id ? { 
        ...p, 
        status, 
        gymId, 
        amount: Number(amount), 
        paymentMethod 
      } : p));

      const payment = payments.find(p => p.id === id);
      
      if (status === "Paid") {
        // Notify the user
        await notifyUser(userId, "Your gym subscription is now active!");
        
        if (gymId && userId) {
          // Update member's gym enrollment
          const memberRef = doc(db, "gym_members", userId);
          await updateDoc(memberRef, {
            enrolledGyms: arrayUnion(gymId),
            membershipStatus: "active",
            updatedAt: serverTimestamp()
          });
          
          // Add to payments collection with all necessary fields for revenue tracking
          const paymentData = {
            gymId,
            userId: userId,
            userEmail: payment.userEmail,
            amount: Number(amount) || 0,
            status: "Paid",
            date: new Date().toISOString(),
            type: "manual",
            paymentMethod,
            sourceManualPaymentId: payment.id,
            createdAt: serverTimestamp(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            receiptUrl: payment.receiptUrl
          };
          
          await addDoc(collection(db, "payments"), paymentData);
          
          toast({ 
            title: "Payment Approved", 
            description: "The payment has been recorded and the user's subscription is now active." 
          });
        }
      } else if (status === "Rejected") {
        await notifyUser(userId, "Your payment was rejected. Please contact support.");
        toast({ 
          title: "Payment Rejected", 
          description: "The user has been notified of the rejection." 
        });
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast({
        title: "Error",
        description: "Failed to update payment status. Please try again.",
        variant: "destructive"
      });
      throw error; // Re-throw to be caught by the modal's try-catch
    }
  };

  const handleMarkAsViewed = (paymentId: number) => {
    toast({
      title: "Payment marked as viewed",
      description: `Payment #${paymentId} has been marked as viewed.`,
    });
  };

  const handleSendReminder = (memberName: string) => {
    toast({
      title: "Payment reminder sent",
      description: `A payment reminder has been sent to ${memberName}.`,
    });
  };

  const handleGenerateReceipt = (paymentId: number) => {
    toast({
      title: "Receipt generated",
      description: `Receipt for payment #${paymentId} has been generated.`,
    });
  };

  // Function to open the modal from the gym table
  const openApprovalModal = async (gym) => {
    setSelectedGym(gym);
    setShowModal(true);
    // Fetch pending manual payments for this gym
    const q = query(
      collection(db, "manualPayments"),
      where("gymId", "==", gym.id),
      where("status", "==", "Pending")
    );
    const snapshot = await getDocs(q);
    setPendingPayments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setSelectedPayment(null);
    setAmount("");
    setPaymentMethod("");
  };

  return (
    <Card className="mb-8">
      <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Recent Payments
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <Badge variant={payment.type === "manual" ? "secondary" : "default"}>
                      {payment.type === "manual" ? "Manual" : "Regular"}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.userEmail || payment.memberEmail || "-"}</TableCell>
                  <TableCell>{payment.amount ? `₱${payment.amount}` : "-"}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.status === "Paid" ? "bg-green-100 text-green-800" : payment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {payment.status || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {payment.date ? new Date(payment.date).toLocaleDateString() : payment.uploadedAt?.toDate?.()?.toLocaleDateString?.()}
                  </TableCell>
                  <TableCell>
                    {payment.type === "manual" && payment.receiptUrl ? (
                      <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {payment.type === "manual" && payment.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => {
                            setSelectedPayment(payment);
                            // Try to find the gym from gymOptions
                            let gym = gymOptions.find(g => g.id === payment.gymId);
                            // If not found and only one gym, auto-select it
                            if (!gym && gymOptions.length === 1) {
                              gym = gymOptions[0];
                            }
                            setSelectedGym(gym || null);
                            setSelectedGymId(gym ? gym.id : "");
                            setShowModal(true);
                          }}
                          className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button onClick={() => handleStatusChange(payment.id, "Rejected", payment.userId, "", "", "")} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Modal for gym and amount selection */}
        {showModal && selectedPayment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Approve Payment</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">User: {selectedPayment.userEmail}</p>
                {!selectedGym && (
                  <>
                    <label className="block mb-2">Select Gym</label>
                    <select
                      className="w-full mb-4 p-2 border rounded"
                      value={selectedGymId}
                      onChange={e => {
                        setSelectedGymId(e.target.value);
                        const gym = gymOptions.find(g => g.id === e.target.value);
                        setSelectedGym(gym || null);
                      }}
                    >
                      <option value="">Select a gym</option>
                      {gymOptions.map(gym => (
                        <option key={gym.id} value={gym.id}>{gym.name}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <label className="block mb-2">Payment Method</label>
              <select
                className="w-full mb-4 p-2 border rounded"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="">Select a payment method</option>
                {PAYMENT_METHODS.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
              <label className="block mb-2">Amount</label>
              <input
                type="number"
                className="w-full mb-4 p-2 border rounded"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min="0"
                placeholder="Enter amount"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedPayment(null);
                    setAmount("");
                    setPaymentMethod("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                  onClick={async () => {
                    if (!selectedPayment || !selectedGym || !amount || !paymentMethod) {
                      toast({
                        title: "Missing Information",
                        description: "Please fill in all required fields.",
                        variant: "destructive"
                      });
                      return;
                    }
                    try {
                      await handleStatusChange(
                        selectedPayment.id,
                        "Paid",
                        selectedPayment.userId,
                        selectedGym.id,
                        amount,
                        paymentMethod
                      );
                      setShowModal(false);
                      setSelectedPayment(null);
                      setAmount("");
                      setPaymentMethod("");
                    } catch (error) {
                      toast({
                        title: "Error",
                        description: "Failed to approve payment. Please try again.",
                        variant: "destructive"
                      });
                    }
                  }}
                  disabled={!amount || !paymentMethod || !selectedGym}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
