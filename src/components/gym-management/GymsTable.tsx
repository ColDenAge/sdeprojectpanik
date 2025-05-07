
import React from "react";
import GymTableRow from "./GymTableRow";
import { Gym } from "./types/gymTypes";

interface GymsTableProps {
  gyms: Gym[];
  isManager: boolean;
  onEditGym: (gym: Gym) => void;
  onDeleteGym: (gym: Gym) => void;
  onViewApplications: (gym: Gym) => void;
}

const GymsTable: React.FC<GymsTableProps> = ({
  gyms,
  isManager,
  onEditGym,
  onDeleteGym,
  onViewApplications,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b bg-muted/30">
          <th className="px-4 py-3 text-left text-sm font-medium">Gym Name</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Members</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Applications</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {gyms.length > 0 ? (
          gyms.map((gym, i) => (
            <GymTableRow
              key={i}
              gym={gym}
              isManager={isManager}
              onEditGym={onEditGym}
              onDeleteGym={onDeleteGym}
              onViewApplications={onViewApplications}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
              No gyms match your search
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default GymsTable;
