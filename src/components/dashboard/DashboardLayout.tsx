
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../App";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Navigation Bar */}
      <div className="w-full px-6 py-4">
        <AuthNavbar />
      </div>

      <div className="mx-auto max-w-[1524px] py-8 px-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
