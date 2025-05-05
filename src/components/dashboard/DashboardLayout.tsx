
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
        {/* Heading Shape */}
        <div className="w-[756px] h-[127px] bg-[url('/blue-shape.svg')] bg-cover relative mb-12">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] text-black font-bold text-5xl font-cairo">
            Dashboard
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
