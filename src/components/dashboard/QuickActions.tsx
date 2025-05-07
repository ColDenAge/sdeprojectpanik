import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../router/App";

const QuickActions = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  const actions = [
    {
      title: "View Members",
      description: "Manage your gym members and their details",
      onClick: () => navigate("/members"),
      icon: "👥",
    },
    {
      title: "Programs",
      description: "View and manage fitness programs",
      onClick: () => navigate("/programs"),
      icon: "🏋️",
    },
    {
      title: "Settings",
      description: "Configure your gym settings",
      onClick: () => navigate("/settings"),
      icon: "⚙️",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-4xl mb-4">{action.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
