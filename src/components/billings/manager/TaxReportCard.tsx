import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchRevenueDataForOwner } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from "date-fns";
import * as XLSX from "xlsx";

const presets = [
  {
    label: "Last Month",
    getRange: () => {
      const now = new Date();
      const start = startOfMonth(subMonths(now, 1));
      const end = endOfMonth(subMonths(now, 1));
      return { start, end };
    },
  },
  {
    label: "This Year",
    getRange: () => {
      const now = new Date();
      return { start: startOfYear(now), end: endOfYear(now) };
    },
  },
  {
    label: "Last Year",
    getRange: () => {
      const now = new Date();
      const lastYear = new Date(now.getFullYear() - 1, 0, 1);
      return { start: startOfYear(lastYear), end: endOfYear(lastYear) };
    },
  },
];

function TaxReportModal({ open, onClose, onGenerate }) {
  const [preset, setPreset] = useState(null);
  const [custom, setCustom] = useState({ start: "", end: "" });

  const handlePreset = (presetIdx) => {
    setPreset(presetIdx);
    setCustom({ start: "", end: "" });
  };

  const handleCustomChange = (e) => {
    setPreset(null);
    setCustom({ ...custom, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    let start, end;
    if (preset !== null) {
      ({ start, end } = presets[preset].getRange());
    } else {
      start = new Date(custom.start);
      end = new Date(custom.end);
    }
    onGenerate(start, end);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Select Time Period</h2>
        <div className="mb-4">
          <div className="mb-2 font-medium">Presets:</div>
          {presets.map((p, idx) => (
            <button
              key={p.label}
              className={`mr-2 mb-2 px-3 py-1 rounded ${preset === idx ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => handlePreset(idx)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <div className="mb-2 font-medium">Or Custom Range:</div>
          <input
            type="date"
            name="start"
            value={custom.start}
            onChange={handleCustomChange}
            className="border rounded px-2 py-1 mr-2"
          />
          <input
            type="date"
            name="end"
            value={custom.end}
            onChange={handleCustomChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={
              (preset === null && (!custom.start || !custom.end))
            }
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TaxReportCard() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleGenerateTaxReport = async (start, end) => {
    if (!user) {
      toast({ title: "Not logged in", description: "Please log in to generate a report." });
      return;
    }
    // Fetch revenue data for the owner
    const allData = await fetchRevenueDataForOwner(user.uid);
    // Filter by date range
    const filtered = allData.filter(row => {
      const date = new Date(`${row.month} 1, ${new Date().getFullYear()}`);
      return date >= start && date <= end;
    });
    const totalRevenue = filtered.reduce((sum, row) => sum + row.revenue, 0);

    // Prepare data for Excel
    const reportData = [
      { "Period Start": format(start, "PPP"), "Period End": format(end, "PPP"), "Total Revenue": totalRevenue }
    ];

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tax Report");

    // Download Excel file
    XLSX.writeFile(wb, `tax-report-${format(start, "yyyyMMdd")}-${format(end, "yyyyMMdd")}.xlsx`);
    toast({ title: "Tax Report Generated", description: "Your tax report Excel file has been downloaded." });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Reports</CardTitle>
        <p className="text-muted-foreground">Generate tax reports for specified time periods</p>
      </CardHeader>
      <CardContent>
        <button
          className="w-full py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors flex items-center justify-center gap-2"
          onClick={() => setModalOpen(true)}
        >
          <FileText className="h-4 w-4" />
          <span>Generate Tax Report</span>
        </button>
        <TaxReportModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onGenerate={handleGenerateTaxReport}
        />
      </CardContent>
    </Card>
  );
} 