
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

// Mock data for recent payments
const recentPayments = [
  {
    id: 1,
    memberName: "Alex Johnson",
    date: "May 5, 2023",
    amount: "$49.99",
    status: "Paid",
    plan: "Premium",
    new: true
  },
  {
    id: 2,
    memberName: "Sarah Williams",
    date: "May 5, 2023",
    amount: "$29.99",
    status: "Paid",
    plan: "Basic",
    new: true
  },
  {
    id: 3,
    memberName: "Michael Brown",
    date: "May 4, 2023",
    amount: "$49.99",
    status: "Paid",
    plan: "Premium",
    new: true
  },
  {
    id: 4,
    memberName: "Jessica Davis",
    date: "May 3, 2023",
    amount: "$29.99",
    status: "Failed",
    plan: "Basic",
    new: false
  },
  {
    id: 5,
    memberName: "Robert Wilson",
    date: "May 2, 2023",
    amount: "$79.99",
    status: "Paid",
    plan: "Elite",
    new: false
  }
];

const RecentPayments = () => {
  const { toast } = useToast();

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
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {payment.memberName}
                    {payment.new && (
                      <Badge className="ml-2 bg-blue-500">New</Badge>
                    )}
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.plan}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Badge className={payment.status === "Paid" ? "bg-green-500" : "bg-red-500"}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {payment.new && (
                      <button 
                        onClick={() => handleMarkAsViewed(payment.id)}
                        className="text-[#0B294B] font-medium hover:underline"
                      >
                        Mark as viewed
                      </button>
                    )}
                    {payment.status === "Failed" && (
                      <button 
                        onClick={() => handleSendReminder(payment.memberName)}
                        className="text-[#0B294B] font-medium hover:underline"
                      >
                        Send reminder
                      </button>
                    )}
                    <button 
                      onClick={() => handleGenerateReceipt(payment.id)}
                      className="inline-flex items-center text-[#0B294B] hover:text-[#0a2544] transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Receipt
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
