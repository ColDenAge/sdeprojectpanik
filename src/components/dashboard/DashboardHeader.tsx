
import React, { useContext } from "react";
import { AuthContext } from "../../App";

const DashboardHeader: React.FC = () => {
  const { userRole } = useContext(AuthContext);
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[#0B294B]">
        Welcome, {userRole === "member" ? "Gym Member" : "Gym Manager"}
      </h1>
      <p className="text-gray-600 mt-2">
        Here's what's happening with your {userRole === "member" ? "fitness journey" : "gym"} today.
      </p>
    </div>
  );
};

export default DashboardHeader;
