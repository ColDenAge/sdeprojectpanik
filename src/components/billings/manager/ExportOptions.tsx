
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Download, FileText, Export } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExportOptions = () => {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format}`,
      description: `Your data is being exported as ${format}. It will be ready for download shortly.`,
    });
  };

  const handleGenerateTaxReport = () => {
    toast({
      title: "Tax Report Generated",
      description: "Your tax report has been generated and is ready for download.",
    });
  };

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <Export className="h-5 w-5" />
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

          <div className="bg-white p-4 border rounded-md hover:bg-muted/10 transition-colors">
            <h3 className="font-medium mb-2">Tax Reports</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Generate tax reports for specified time periods
            </p>
            <button 
              onClick={handleGenerateTaxReport}
              className="w-full py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Generate Tax Report</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
