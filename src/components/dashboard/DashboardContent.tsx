import React, { useContext } from "react";
import { RoleContext } from "../../router/App";
import MemberStatCards from "./MemberStatCards";
import ManagerStatCards from "./ManagerStatCards";
import ClassesList from "./ClassesList";
import QuickActions from "./QuickActions";

const DashboardContent: React.FC = () => {
  const { userRole } = useContext(RoleContext);

  return (
    <>
      {/* Stats Cards - Conditionally rendered based on role */}
      {userRole === "member" ? <MemberStatCards /> : <ManagerStatCards />}

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClassesList />
        <QuickActions />
      </div>
    </>
  );
};

export default DashboardContent;
