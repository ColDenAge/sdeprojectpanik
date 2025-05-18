import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, Trash2, UserPlus } from "lucide-react";
import { Gym } from "./types/gymTypes";
import { usePendingApplicationsCountForGym } from "./hooks/usePendingApplicationsCountForGym";

interface GymTableRowProps {
  gym: Gym;
  isManager: boolean;
  onEditGym: (gym: Gym) => void;
  onDeleteGym: (gym: Gym) => void;
  onViewApplications: (gym: Gym) => void;
}

const GymTableRow: React.FC<GymTableRowProps> = ({
  gym,
  isManager,
  onEditGym,
  onDeleteGym,
  onViewApplications,
}) => {
  const pendingCount = usePendingApplicationsCountForGym(gym.id);
  return (
    <tr className="border-b hover:bg-muted/30">
      <td className="px-4 py-3 text-sm">{gym.name}</td>
      <td className="px-4 py-3 text-sm">{gym.location}</td>
      <td className="px-4 py-3 text-sm">{gym.members}</td>
      <td className="px-4 py-3 text-sm">
        <Badge variant="success">{gym.status}</Badge>
      </td>
      <td className="px-4 py-3 text-sm">
        {pendingCount > 0 ? (
          <span className="text-amber-700 font-semibold">{pendingCount} Pending</span>
        ) : (
          <span className="text-sm text-muted-foreground">No pending</span>
        )}
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
              onClick={() => onEditGym(gym)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Edit Info
            </Button>
            {isManager && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                onClick={() => onDeleteGym(gym)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800 px-3 mt-1"
            onClick={() => onViewApplications(gym)}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Pending Applications
            {pendingCount > 0 && (
              <span className="ml-2 font-bold">({pendingCount})</span>
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default GymTableRow;
