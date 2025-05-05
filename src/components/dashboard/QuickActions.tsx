
import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "../../App";

const QuickActions: React.FC = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-[#0B294B]">
          {userRole === "member" ? "Quick Links" : "Quick Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {userRole === "member" ? (
            <>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Book a Class
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                View Schedule
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Update Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Track Progress
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Contact Support
              </button>
            </>
          ) : (
            <>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Add New Class
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Manage Members
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Schedule Trainers
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                View Reports
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Billing & Payments
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
