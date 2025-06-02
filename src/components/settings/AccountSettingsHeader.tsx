import React, { useContext } from "react";
import { Settings, Repeat } from "lucide-react";
import { RoleContext } from "../../router/App";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AccountSettingsHeader = () => {
  const { userRole, setUserRole } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleSwitchRole = () => {
    const newRole = userRole === "manager" ? "member" : "manager";
    setUserRole(newRole);
    localStorage.setItem("userRole", newRole);
    navigate("/dashboard");
    window.location.reload(); // Ensures all context/UI updates
  };

  return (
    <div className="w-full flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleSwitchRole}
      >
        <Repeat className="h-5 w-5" />
        Switch to {userRole === "manager" ? "Member" : "Manager"} Role
      </Button>
    </div>
  );
};

export default AccountSettingsHeader;
