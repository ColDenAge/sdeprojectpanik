
import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "../../App";

const ClassesList: React.FC = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <Card className="md:col-span-2 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-[#0B294B]">
          {userRole === "member" ? "Your Upcoming Classes" : "Scheduled Classes Today"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {userRole === "member" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <h3 className="font-semibold text-[#0B294B]">Yoga Basics</h3>
                <p className="text-sm text-gray-600">10:00 AM - 11:00 AM</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-[#0B294B] rounded text-xs">Booked</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <h3 className="font-semibold text-[#0B294B]">HIIT Workout</h3>
                <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-[#0B294B] rounded text-xs">Booked</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <h3 className="font-semibold text-[#0B294B]">Strength Training</h3>
                <p className="text-sm text-gray-600">4:00 PM - 5:00 PM</p>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Available</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <h3 className="font-semibold text-[#0B294B]">Morning Yoga</h3>
                <p className="text-sm text-gray-600">7:00 AM - 8:00 AM</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">15 attendees</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <h3 className="font-semibold text-[#0B294B]">Spin Class</h3>
                <p className="text-sm text-gray-600">12:00 PM - 1:00 PM</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">20 attendees</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <h3 className="font-semibold text-[#0B294B]">Evening HIIT</h3>
                <p className="text-sm text-gray-600">6:00 PM - 7:00 PM</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">8 attendees</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassesList;
