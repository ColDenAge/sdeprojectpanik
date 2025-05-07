
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
    const dashboardPaths = ['/dashboard', '/gyms', '/billings', '/settings', '/help', '/members'];
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

  // Get the appropriate label for the Gyms link based on user role
  const getGymsLabel = () => {
    return userRole === "member" ? "My Gyms" : "Gym Management";
  };

  return (
    <nav className="flex flex-col items-center gap-4 font-normal text-center flex-wrap justify-between w-full bg-[#0B294B] text-white p-4 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <div className="flex-shrink-0 md:w-1/4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
            alt="ByteMinds Systems Logo"
            className="aspect-[1] object-contain w-[90px] self-center z-10 max-w-full"
          />
          <div className="mt-[-9px] text-sm font-bold">ByteMinds Systems</div>
        </div>

        {/* Center space - for visual balance */}
        <div className="hidden md:block md:flex-1"></div>

        {/* User Controls */}
        <div className="flex items-center gap-4 md:w-1/4 justify-end">
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

      {/* Navigation Links - Centered */}
      <div className="flex justify-between gap-6 items-center flex-wrap w-full max-w-6xl mx-auto">
          <Link
              to="/"
              className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/' ? 'text-gray-300' : ''}`}
            >
              <Home className="h-5 w-5" />
              <span className="hidden md:inline">Home</span>
            </Link>

            <Link
              to="/features"
              className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/features' ? 'text-gray-300' : ''}`}
            >
              <Layers className="h-5 w-5" />
              <span className="hidden md:inline">Features</span>
            </Link>

            <Link
              to="/faqs"
              className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/faqs' ? 'text-gray-300' : ''}`}
             >
              <FAQIcon className="h-5 w-5" />
              <span className="hidden md:inline">FAQs</span>
            </Link>

            <Link
              to="/about-us"
              className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/about-us' ? 'text-gray-300' : ''}`}
            >
              <Users className="h-5 w-5" />
              <span className="hidden md:inline">About Us</span>
            </Link>

            <Link
              to="/contact"
              className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/contact' ? 'text-gray-300' : ''}`}
            >
              <Mail className="h-5 w-5" />
              <span className="hidden md:inline">Contact</span>
            </Link>
          <div>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-6 items-center flex-wrap w-full max-w-6xl mx-auto">
  <Link
    to="/"
    className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/' ? 'text-gray-300' : ''}`}
  >
    <Home className="h-5 w-5" />
    <span className="hidden md:inline">Home</span>
  </Link>

  <Link
    to="/features"
    className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/features' ? 'text-gray-300' : ''}`}
  >
    <Layers className="h-5 w-5" />
    <span className="hidden md:inline">Features</span>
  </Link>

  <Link
    to="/faqs"
    className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/faqs' ? 'text-gray-300' : ''}`}
  >
    <FAQIcon className="h-5 w-5" />
    <span className="hidden md:inline">FAQs</span>
  </Link>

  <Link
    to="/about-us"
    className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/about-us' ? 'text-gray-300' : ''}`}
  >
    <Users className="h-5 w-5" />
    <span className="hidden md:inline">About Us</span>
  </Link>

  <Link
    to="/contact"
    className={`text-white hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/contact' ? 'text-gray-300' : ''}`}
  >
    <Mail className="h-5 w-5" />
    <span className="hidden md:inline">Contact</span>
  </Link>
</div>

          </>
        )}
      </div>
    </nav>
  );
};

export default AuthNavbar;
