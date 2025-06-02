import React from "react";
import { User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as FirebaseUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  user: FirebaseUser | null;
  roleLabel: string;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, roleLabel, onLogout }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/settings");
  };

  return (
    <div className="flex items-center gap-4 md:w-1/4 justify-end">
      <div
        className="flex items-center gap-2 min-w-[110px] cursor-pointer hover:bg-[#0a2544] p-2 rounded-lg transition-colors"
        onClick={handleProfileClick}
      >
        <Avatar className="hover:bg-[#0a2544] bg-transparent">
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="text-sm hidden md:inline-block min-w-[90px] text-left">
          <div className="font-medium">{user?.displayName || `User_${user?.uid?.slice(0, 6)}`}</div>
          <div className="text-xs text-gray-300">{roleLabel}</div>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="hover:bg-[#0a2544] rounded-full p-2 flex items-center gap-2"
      >
        <LogOut className="h-6 w-6" />
        <span className="text-sm hidden md:inline-block">Log Out</span>
      </button>
    </div>
  );
};

export default UserProfile;