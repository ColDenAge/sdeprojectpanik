import React, { useContext } from "react";
import { RoleContext } from "../../router/App";

const DashboardHeader: React.FC = () => {
  const { userRole } = useContext(RoleContext);
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[#0B294B]">
        {userRole === "member" ? "Welcome Back!" : "Gym Management Dashboard"}
      </h1>
      <p className="text-gray-600 mt-2">
        {userRole === "member" 
          ? "Track your fitness journey and manage your gym activities"
          : "Manage your gym, members, and classes"}
      </p>
    </div>
  );
};

export default DashboardHeader;
