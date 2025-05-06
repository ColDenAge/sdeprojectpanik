
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Index from "./pages/Index";
import Features from "./pages/Features";
import FAQs from "./pages/FAQs";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Choice from "./pages/Choice";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberGyms from "./pages/MemberGyms";
import Billings from "./pages/Billings";
import AccountSettings from "./pages/AccountSettings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create an authentication context with user role
export const AuthContext = createContext({ 
  isAuthenticated: false,
  userRole: "",
  setIsAuthenticated: (value: boolean) => {},
  setUserRole: (role: string) => {}
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  
  // Check localStorage on initial load
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  // Role-based redirect component
  const RoleBasedRoute = ({ path, memberComponent, managerComponent }: { 
    path: string, 
    memberComponent: React.ReactNode, 
    managerComponent: React.ReactNode 
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return userRole === "member" ? memberComponent : managerComponent;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/choice" element={<Choice />} />
              
              {/* Dashboard routes with role-based rendering */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Gyms page - different for each role */}
              <Route path="/gyms" element={
                <RoleBasedRoute 
                  path="/gyms"
                  memberComponent={<MemberGyms />} 
                  managerComponent={<Members />}
                />
              } />
              
              {/* Redirecting the /members route to /gyms for manager users */}
              <Route path="/members" element={
                isAuthenticated && userRole === "manager" ? <Navigate to="/gyms" /> : <Navigate to="/" />
              } />
              
              {/* Billings page */}
              <Route path="/billings" element={<Billings />} />
              
              {/* Account Settings page */}
              <Route path="/settings" element={<AccountSettings />} />
              
              {/* Help page */}
              <Route path="/help" element={<Help />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
