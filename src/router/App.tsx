import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "../pages/Index";
import Features from "../pages/Features";
import FAQs from "../pages/FAQs";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import Choice from "../pages/Choice";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import MemberGyms from "../pages/MemberGyms";
import Billings from "../pages/Billings";
import ManagerBillings from "../pages/ManagerBillings";
import AccountSettings from "../pages/AccountSettings";
import Help from "../pages/Help";
import NotFound from "../pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Create a role context
export const RoleContext = createContext({ 
  userRole: "",
  setUserRole: (role: string) => {}
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Role-based redirect component
const RoleBasedRoute = ({ path, memberComponent, managerComponent }: { 
  path: string, 
  memberComponent: React.ReactNode, 
  managerComponent: React.ReactNode 
}) => {
  const { user } = useAuth();
  const { userRole } = useContext(RoleContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userRole) {
    return <Navigate to="/choice" state={{ from: location }} replace />;
  }
  
  return userRole === "member" ? memberComponent : managerComponent;
};

const App = () => {
  const [userRole, setUserRole] = useState("");
  
  // Check localStorage on initial load
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RoleContext.Provider value={{ userRole, setUserRole }}>
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
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
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
                    userRole === "manager" ? <Navigate to="/gyms" /> : <Navigate to="/" />
                  } />
                  
                  {/* Billings page - different for each role */}
                  <Route path="/billings" element={
                    <RoleBasedRoute 
                      path="/billings"
                      memberComponent={<Billings />} 
                      managerComponent={<ManagerBillings />}
                    />
                  } />
                  
                  {/* Account Settings page */}
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <AccountSettings />
                    </ProtectedRoute>
                  } />
                  
                  {/* Help page */}
                  <Route path="/help" element={
                    <ProtectedRoute>
                      <Help />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </RoleContext.Provider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
