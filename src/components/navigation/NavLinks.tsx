import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Dumbbell,
  Wallet,
  Settings,
  HelpCircle,
  Layers,
  HelpCircle as FAQIcon,
  Users,
  Mail
} from "lucide-react";

interface NavLinksProps {
  activeTab: string;
  isActive: (path: string) => boolean;
  getGymsLabel: () => string;
}

const NavLinks: React.FC<NavLinksProps> = ({ activeTab, isActive, getGymsLabel }) => {
  const mainLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/features", icon: Layers, label: "Features" },
    { to: "/faqs", icon: FAQIcon, label: "FAQs" },
    { to: "/about-us", icon: Users, label: "About Us" },
    { to: "/contact", icon: Mail, label: "Contact" }
  ];

  const dashboardLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/gyms", icon: Dumbbell, label: getGymsLabel() },
    { to: "/billings", icon: Wallet, label: "Billings" },
    { to: "/settings", icon: Settings, label: "Account Settings" },
    { to: "/help", icon: HelpCircle, label: "Help" }
  ];

  const renderLink = (link: { to: string; icon: any; label: string }) => {
    const Icon = link.icon;
    return (
      <Link
        key={link.to}
        to={link.to}
        className={`hover:text-gray-300 transition-colors flex items-center gap-2 ${
          isActive(link.to) ? 'text-white font-medium border-b-2 border-white pb-1' : 'text-gray-300'
        }`}
      >
        <Icon className="h-5 w-10" />
        <span className="hidden md:inline">{link.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 text-lg">
      <div className="flex gap-6 items-center">
        {activeTab === "main"
          ? mainLinks.map(renderLink)
          : dashboardLinks.map(renderLink)
        }
      </div>
    </div>
  );
};

export default NavLinks;