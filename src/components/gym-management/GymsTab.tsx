
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, Plus } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditGymDialog } from "./dialogs/AddEditGymDialog";

const initialGymsData = [
  {
    id: "1",
    name: "Downtown Fitness",
    location: "Downtown",
    address: "123 Main St, City, State",
    contactNumber: "(555) 123-4567",
    members: 87,
    status: "Active",
  },
  {
    id: "2",
    name: "Westside Gym",
    location: "Westside",
    address: "456 West Ave, City, State",
    contactNumber: "(555) 234-5678",
    members: 65,
    status: "Active",
  },
  {
    id: "3",
    name: "Eastside Fitness Center",
    location: "Eastside",
    address: "789 East Blvd, City, State",
    contactNumber: "(555) 345-6789",
    members: 52,
    status: "Active",
  },
];

const GymsTab = ({ userRole }: { userRole?: string }) => {
  const { searchTerm } = useSearch();
  const [gyms, setGyms] = useState(initialGymsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGym, setCurrentGym] = useState<undefined | typeof initialGymsData[0]>(undefined);

  const filteredGyms = gyms.filter((gym) => {
    const search = searchTerm.toLowerCase();
    return (
      gym.name.toLowerCase().includes(search) ||
      gym.location.toLowerCase().includes(search) ||
      gym.members.toString().includes(search) ||
      gym.status.toLowerCase().includes(search)
    );
  });

  const handleEditGym = (gym: typeof initialGymsData[0]) => {
    setCurrentGym(gym);
    setDialogOpen(true);
  };

  const handleAddGym = () => {
    setCurrentGym(undefined);
    setDialogOpen(true);
  };

  const handleSaveGym = (values: { name: string; location: string; address: string; contactNumber: string }) => {
    if (currentGym) {
      // Edit existing gym
      setGyms(
        gyms.map((item) =>
          item.id === currentGym.id
            ? { ...item, ...values }
            : item
        )
      );
    } else {
      // Add new gym
      const newGym = {
        id: (gyms.length + 1).toString(),
        ...values,
        members: 0,
        status: "Active",
      };
      setGyms([...gyms, newGym]);
    }
  };

  const isManager = userRole === "manager";

  return (
    <div className="overflow-x-auto">
      {isManager && (
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAddGym}
            className="bg-[#0B294B] text-white rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Gym</span>
          </Button>
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/30">
            <th className="px-4 py-3 text-left text-sm font-medium">Gym Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Members</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGyms.length > 0 ? (
            filteredGyms.map((gym, i) => (
              <tr key={i} className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm">{gym.name}</td>
                <td className="px-4 py-3 text-sm">{gym.location}</td>
                <td className="px-4 py-3 text-sm">{gym.members}</td>
                <td className="px-4 py-3 text-sm">
                  <Badge variant="success">
                    {gym.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                      onClick={() => handleEditGym(gym)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Edit Info
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                No gyms match your search
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddEditGymDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        gym={currentGym}
        onSave={handleSaveGym}
      />
    </div>
  );
};

export default GymsTab;
