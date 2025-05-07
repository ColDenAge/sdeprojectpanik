
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
import { Receipt, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for billing history
const billingHistory = [
  {
    id: 1,
    date: "May 1, 2023",
    description: "Monthly Membership - FitLife Downtown",
    amount: "$49.99",
    status: "Paid"
  },
  {
    id: 2,
    date: "Apr 1, 2023",
    description: "Monthly Membership - FitLife Downtown",
    amount: "$49.99",
    status: "Paid"
  },
  {
    id: 3,
    date: "Mar 1, 2023",
    description: "Monthly Membership - FitLife Downtown",
    amount: "$49.99",
    status: "Paid"
  },
  {
    id: 4,
    date: "Feb 1, 2023",
    description: "Monthly Membership - FitLife Downtown",
    amount: "$49.99",
    status: "Paid"
  }
];

const BillingHistory = () => {
  const { toast } = useToast();

  const handleDownloadPDF = (invoiceId: number, date: string) => {
    // In a real application, this would generate and download a PDF
    toast({
      title: "Downloading Invoice PDF",
      description: `Your invoice from ${date} is being downloaded.`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your invoice PDF has been downloaded successfully.",
      });
    }, 1500);
  };

  const handleDownloadAllReceipts = () => {
    toast({
      title: "Downloading All Receipts",
      description: "Your receipts are being prepared for download as a ZIP file.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "All your receipts have been downloaded successfully.",
      });
    }, 2000);
  };

  return (
    <Card className="mb-8">
      <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Billing History
        </CardTitle>
        <button
          onClick={handleDownloadAllReceipts}
          className="flex items-center gap-1 text-sm text-[#0B294B] hover:text-[#0a2544] transition-colors"
        >
          <FileText className="h-4 w-4" />
          Download All Receipts
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="font-medium">{invoice.description}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleDownloadPDF(invoice.id, invoice.date)}
                        className="inline-flex items-center text-[#0B294B] hover:text-[#0a2544] transition-colors"
                        aria-label="Download receipt"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </button>
                    </div>
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

export default BillingHistory;
