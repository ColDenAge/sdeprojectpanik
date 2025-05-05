
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
import { AuthContext } from "../../App";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAuthenticated, userRole } = useContext(AuthContext);
  const currentPath = location.pathname;
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Determine initial active tab based on current path
    const dashboardPaths = ['/dashboard', '/gyms', '/billings', '/settings', '/help'];
    return dashboardPaths.includes(currentPath) ? "dashboard" : "main";
  });

  const handleLogout = () => {
    // Clear authentication state
    setIsAuthenticated(false);
    // Remove user role from localStorage
    localStorage.removeItem("userRole");
    // Navigate to home page
    navigate("/");
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

  return (
    <nav className="flex flex-col items-center gap-4 text-2xl font-normal text-center flex-wrap justify-between max-md:max-w-full bg-[#0B294B] text-white p-4 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <div className="self-stretch flex flex-col items-stretch font-bold">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
            alt="ByteMinds Systems Logo"
            className="aspect-[1] object-contain w-[104px] self-center z-10 max-w-full"
          />
          <div className="mt-[-9px]">ByteMinds Systems</div>
        </div>

        {/* User Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="hover:bg-[#0a2544] bg-transparent cursor-pointer">
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm hidden md:inline-block">
              {userRole === "member" ? "Gym Member" : "Gym Manager"}
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
            <TabsTrigger value="main">Main</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Navigation Links */}
      <div className="w-full flex items-center justify-between flex-wrap gap-4">
        {activeTab === "main" ? (
          <>
            <Link to="/" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/' ? 'text-gray-300' : ''}`}>
              <Home className="h-5 w-5" />
              <span className="hidden md:inline">Home</span>
            </Link>
            
            <Link to="/features" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/features' ? 'text-gray-300' : ''}`}>
              <Layers className="h-5 w-5" />
              <span className="hidden md:inline">Features</span>
            </Link>
            
            <Link to="/faqs" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/faqs' ? 'text-gray-300' : ''}`}>
              <FAQIcon className="h-5 w-5" />
              <span className="hidden md:inline">FAQs</span>
            </Link>
            
            <Link to="/about-us" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/about-us' ? 'text-gray-300' : ''}`}>
              <Users className="h-5 w-5" />
              <span className="hidden md:inline">About Us</span>
            </Link>
            
            <Link to="/contact" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/contact' ? 'text-gray-300' : ''}`}>
              <Mail className="h-5 w-5" />
              <span className="hidden md:inline">Contact</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/dashboard' ? 'text-gray-300' : ''}`}>
              <LayoutDashboard className="h-5 w-5" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            
            <Link to="/gyms" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/gyms' ? 'text-gray-300' : ''}`}>
              <Dumbbell className="h-5 w-5" />
              <span className="hidden md:inline">Gyms</span>
            </Link>
            
            <Link to="/billings" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/billings' ? 'text-gray-300' : ''}`}>
              <Wallet className="h-5 w-5" />
              <span className="hidden md:inline">Billings</span>
            </Link>
            
            <Link to="/settings" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/settings' ? 'text-gray-300' : ''}`}>
              <Settings className="h-5 w-5" />
              <span className="hidden md:inline">Account Settings</span>
            </Link>
            
            <Link to="/help" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/help' ? 'text-gray-300' : ''}`}>
              <HelpCircle className="h-5 w-5" />
              <span className="hidden md:inline">Help</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default AuthNavbar;

