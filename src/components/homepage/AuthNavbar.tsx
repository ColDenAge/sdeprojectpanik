import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Dumbbell,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Layers,
  HelpCircle as FAQIcon,
  Users,
  Mail
} from "lucide-react";
import { RoleContext } from "../../router/App";
import { useAuth } from "@/context/AuthProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
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
      // Navigate to home page
      navigate("/");
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

        {/* User Controls */}
        <div className="flex items-center gap-4 md:w-1/4 justify-end">
          <div className="flex items-center gap-2 min-w-[110px]">
            <Avatar className="hover:bg-[#0a2544] bg-transparent cursor-pointer">
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm hidden md:inline-block min-w-[90px] text-left">
              {getRoleLabel()}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="hover:bg-[#0a2544] rounded-full p-2 flex items-center gap-2"
          >
            <LogOut className="h-6 w-6" />
            <span className="text-sm hidden md:inline-block">Log Out</span>
          </button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="w-full">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={handleTabChange}>
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
      </div>
      {/* Navigation Links - Centered */}
      <div className="w-full flex items-center justify-center gap-4 text-lg">
        {activeTab === "main" ? (
          <div className="flex gap-6 items-center">
            <Link
              to="/"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <Home className="h-5 w-10" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link
              to="/features"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/features') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <Layers className="h-5 w-10" />
              <span className="hidden md:inline">Features</span>
            </Link>
            <Link
              to="/faqs"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/faqs') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <FAQIcon className="h-5 w-10" />
              <span className="hidden md:inline">FAQs</span>
            </Link>
            <Link
              to="/about-us"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/about-us') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <Users className="h-5 w-10" />
              <span className="hidden md:inline">About Us</span>
            </Link>
            <Link
              to="/contact"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/contact') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <Mail className="h-5 w-10" />
              <span className="hidden md:inline">Contact</span>
            </Link>
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <Link
              to="/dashboard"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/dashboard') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <LayoutDashboard className="h-5 w-10" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link
              to="/gyms"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/gyms') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <Dumbbell className="h-5 w-10" />
              <span className="hidden md:inline">{getGymsLabel()}</span>
            </Link>
            <Link
              to="/billings"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/billings') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <Wallet className="h-5 w-10" />
              <span className="hidden md:inline">Billings</span>
            </Link>
            <Link
              to="/settings"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/settings') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <Settings className="h-5 w-10" />
              <span className="hidden md:inline">Account Settings</span>
            </Link>
            <Link
              to="/help"
              className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
                isActive('/help') ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
              }`}
            >
              <HelpCircle className="h-5 w-10" />
              <span className="hidden md:inline">Help</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AuthNavbar;