import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoleContext } from "../../router/App";
import { useAuth } from "@/context/AuthProvider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavLinks from "../navigation/NavLinks";
import UserProfile from "../navigation/UserProfile";

const AuthNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { userRole } = useContext(RoleContext);
  const currentPath = location.pathname;
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Determine initial active tab based on current path
    const dashboardPaths = ['/dashboard', '/gyms', '/billings', '/settings', '/help', '/members'];
    return dashboardPaths.includes(currentPath) ? "dashboard" : "main";
  });

  const handleLogout = async () => {
    try {
      await signOut();
      // Remove user role from localStorage
      localStorage.removeItem("userRole");
      // Force a full page refresh to clear all state
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Navigate to the first item in the selected tab
    if (value === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  // Get the appropriate label for the Gyms link based on user role
  const getGymsLabel = () => {
    return userRole === "member" ? "My Gyms" : "Gym Management";
  };

  // Get the appropriate label for the role
  const getRoleLabel = () => {
    return userRole === "member" ? "Gym Member" : "Gym Manager";
  };

  // Function to check if a link is active
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <nav className="flex flex-col items-center gap-4 font-normal text-center flex-wrap justify-between w-full bg-[#0B294B] text-white p-4 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 flex-shrink-0 md:w-1/4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
            alt="ByteMinds Systems Logo"
            className="aspect-[1] object-contain w-[60px] max-w-full"
          />
          <div className="text-sm font-bold">ByteMinds Systems</div>
        </div>

        {/* Center space - for visual balance */}
        <div className="hidden md:block md:flex-1"></div>

        <UserProfile
          user={user}
          roleLabel={getRoleLabel()}
          onLogout={handleLogout}
        />
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#0a2544]">
          <TabsTrigger
            value="main"
            className={activeTab === "main" ? "bg-blue-500 text-white" : ""}
          >
            Main
          </TabsTrigger>
          <TabsTrigger
            value="dashboard"
            className={activeTab === "dashboard" ? "bg-blue-500 text-white" : ""}
          >
            Dashboard
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <NavLinks
        activeTab={activeTab}
        isActive={isActive}
        getGymsLabel={getGymsLabel}
      />
    </nav>
  );
};

export default AuthNavbar;