import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Download, FileText, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchRevenueDataForOwner } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import TaxReportCard from "./TaxReportCard";

function convertToCSV(data) {
  if (!data.length) return '';
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(','));
  return [header, ...rows].join('\r\n');
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const ExportOptions = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleExport = async (format) => {
    if (!user) {
      toast({ title: 'Not logged in', description: 'Please log in to export data.' });
      return;
    }
    toast({
      title: `Exporting as ${format}`,
      description: `Your data is being exported as ${format}. It will be ready for download shortly.`,
    });
    const data = await fetchRevenueDataForOwner(user.uid);
    if (format === 'CSV') {
      const csv = convertToCSV(data);
      downloadFile('revenue-data.csv', csv, 'text/csv');
    } else if (format === 'JSON') {
      downloadFile('revenue-data.json', JSON.stringify(data, null, 2), 'application/json');
    } else if (format === 'Excel') {
      // TODO: Install and use xlsx library for Excel export
      toast({ title: 'Excel export not implemented', description: 'Please install xlsx library.' });
    } else if (format === 'PDF') {
      // TODO: Install and use jspdf library for PDF export
      toast({ title: 'PDF export not implemented', description: 'Please install jspdf library.' });
    }
  };

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Export & Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="bg-white p-4 border rounded-md hover:bg-muted/10 transition-colors">
            <h3 className="font-medium mb-2">Export Revenue Data</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Export revenue data for your records or accounting purposes
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleExport("CSV")}
                className="flex items-center justify-center gap-1 p-2 border rounded bg-white hover:bg-muted/20 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">CSV</span>
              </button>
              <button 
                onClick={() => handleExport("Excel")}
                className="flex items-center justify-center gap-1 p-2 border rounded bg-white hover:bg-muted/20 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">Excel</span>
              </button>
              <button 
                onClick={() => handleExport("PDF")}
                className="flex items-center justify-center gap-1 p-2 border rounded bg-white hover:bg-muted/20 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">PDF</span>
              </button>
              <button 
                onClick={() => handleExport("JSON")}
                className="flex items-center justify-center gap-1 p-2 border rounded bg-white hover:bg-muted/20 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">JSON</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 border rounded-md hover:bg-muted/10 transition-colors">
            <h3 className="font-medium mb-2">Bulk Receipt Management</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Generate and send receipts in bulk
            </p>
            <button className="w-full py-2 text-white bg-[#0B294B] hover:bg-[#0a2544] rounded-md transition-colors flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Manage Receipts</span>
            </button>
          </div>

          <TaxReportCard />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
