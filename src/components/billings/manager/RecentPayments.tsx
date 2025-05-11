import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Download, FileText, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const RecentPayments = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [payments, setPayments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;
    const fetchPayments = async () => {
      setLoading(true);
      // 1. Fetch gyms for owner
      const gymsRef = collection(db, "gyms");
      const gymsQuery = query(gymsRef, where("ownerId", "==", user.uid));
      const gymsSnapshot = await getDocs(gymsQuery);
      const gymIds = gymsSnapshot.docs.map(doc => doc.id);
      if (gymIds.length === 0) {
        setPayments([]);
        setLoading(false);
        return;
      }
      // 2. Fetch payments for these gyms
      const paymentsRef = collection(db, "payments");
      const allPayments = [];
      for (let i = 0; i < gymIds.length; i += 10) {
        const batch = gymIds.slice(i, i + 10);
        const paymentsQuery = query(paymentsRef, where("gymId", "in", batch));
        const paymentsSnapshot = await getDocs(paymentsQuery);
        allPayments.push(...paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
      // Sort by date descending
      allPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPayments(allPayments);
      setLoading(false);
    };
    fetchPayments();
  }, [user]);

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

  return (
    <Card className="mb-6">
      <CardHeader className="bg-muted/50">
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
                <TableHead>Member</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
              ) : payments.length === 0 ? (
                <TableRow><TableCell colSpan={6}>No recent payments</TableCell></TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {payment.memberName || payment.memberId || "-"}
                      {payment.new && (
                        <Badge className="ml-2 bg-blue-500">New</Badge>
                      )}
                    </TableCell>
                    <TableCell>{payment.date ? new Date(payment.date).toLocaleDateString() : "-"}</TableCell>
                    <TableCell>{payment.plan || "-"}</TableCell>
                    <TableCell>{typeof payment.amount === "number" ? `$${payment.amount.toFixed(2)}` : payment.amount || "-"}</TableCell>
                    <TableCell>
                      <Badge className={payment.status === "Paid" ? "bg-green-500" : "bg-red-500"}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {payment.status === "Paid" && (
                        <button 
                          onClick={() => handleGenerateReceipt(payment.id)}
                          className="inline-flex items-center text-[#0B294B] hover:text-[#0a2544] transition-colors"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Receipt
                        </button>
                      )}
                      {payment.status === "Failed" && (
                        <button 
                          onClick={() => handleSendReminder(payment.memberName || payment.memberId || "")}
                          className="text-[#0B294B] font-medium hover:underline"
                        >
                          Send reminder
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
