
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, Dumbbell, Wallet, Settings, HelpCircle, LogOut, User } from "lucide-react";
import { AuthContext } from "../../App";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AuthNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAuthenticated, userRole } = useContext(AuthContext);
  const currentPath = location.pathname;

  const handleLogout = () => {
    // Clear authentication state
    setIsAuthenticated(false);
    // Remove user role from localStorage
    localStorage.removeItem("userRole");
    // Navigate to home page
    navigate("/");
  };

  return (
    <nav className="flex items-center gap-5 text-2xl font-normal text-center flex-wrap justify-between max-md:max-w-full bg-[#0B294B] text-white p-4 rounded-lg">
      <div className="self-stretch flex flex-col items-stretch font-bold">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
          alt="ByteMinds Systems Logo"
          className="aspect-[1] object-contain w-[104px] self-center z-10 max-w-full"
        />
        <div className="mt-[-9px]">ByteMinds Systems</div>
      </div>

      {/* Main Navigation Links */}
      <Link to="/" className={`text-white self-stretch my-auto hover:text-gray-300 transition-colors flex items-center gap-2 ${currentPath === '/' ? 'text-gray-300' : ''}`}>
        <Home className="h-5 w-5" />
        <span className="hidden md:inline">Home</span>
      </Link>
      
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
    </nav>
  );
};

export default AuthNavbar;
