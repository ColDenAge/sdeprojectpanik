
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, Plus, Trash2, UserPlus } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditGymDialog } from "./dialogs/AddEditGymDialog";
import PendingApplicationsDialog, { MembershipApplication } from "./PendingApplicationsDialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const initialGymsData = [
  {
    id: "1",
    name: "Downtown Fitness",
    location: "Downtown",
    address: "123 Main St, City, State",
    contactNumber: "(555) 123-4567",
    members: 87,
    status: "Active",
    pendingApplications: 2,
  },
  {
    id: "2",
    name: "Westside Gym",
    location: "Westside",
    address: "456 West Ave, City, State",
    contactNumber: "(555) 234-5678",
    members: 65,
    status: "Active",
    pendingApplications: 0,
  },
  {
    id: "3",
    name: "Eastside Fitness Center",
    location: "Eastside",
    address: "789 East Blvd, City, State",
    contactNumber: "(555) 345-6789",
    members: 52,
    status: "Active",
    pendingApplications: 1,
  },
];

// Example mock data for pending applications
const mockApplicationsData = {
  "1": [
    {
      id: "a1",
      gymId: "1",
      memberName: "John Smith",
      membershipType: "Premium",
      requestDate: "May 6, 2025",
      status: "pending",
    },
    {
      id: "a2",
      gymId: "1",
      memberName: "Alice Johnson",
      membershipType: "Standard",
      requestDate: "May 7, 2025",
      status: "pending",
    },
  ],
  "3": [
    {
      id: "a3",
      gymId: "3",
      memberName: "Bob Williams",
      membershipType: "Standard",
      requestDate: "May 5, 2025",
      status: "pending",
    },
  ],
};

const GymsTab = ({ userRole }: { userRole?: string }) => {
  const { searchTerm } = useSearch();
  const [gyms, setGyms] = useState(initialGymsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGym, setCurrentGym] = useState<undefined | typeof initialGymsData[0]>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gymToDelete, setGymToDelete] = useState<undefined | typeof initialGymsData[0]>(undefined);
  const [applicationsDialogOpen, setApplicationsDialogOpen] = useState(false);
  const [currentGymApplications, setCurrentGymApplications] = useState<MembershipApplication[]>([]);
  const [currentGymName, setCurrentGymName] = useState("");
  const { toast } = useToast();

  const [pendingApplications, setPendingApplications] = useState<Record<string, MembershipApplication[]>>(mockApplicationsData);

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

  const handleDeleteGym = (gym: typeof initialGymsData[0]) => {
    setGymToDelete(gym);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteGym = () => {
    if (gymToDelete) {
      setGyms(gyms.filter(gym => gym.id !== gymToDelete.id));
      // Also remove any pending applications
      if (pendingApplications[gymToDelete.id]) {
        const newPendingApplications = { ...pendingApplications };
        delete newPendingApplications[gymToDelete.id];
        setPendingApplications(newPendingApplications);
      }
      toast({
        title: "Gym Deleted",
        description: `${gymToDelete.name} has been removed.`,
      });
    }
    setDeleteDialogOpen(false);
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
        pendingApplications: 0,
      };
      setGyms([...gyms, newGym]);
    }
  };

  const handleViewApplications = (gym: typeof initialGymsData[0]) => {
    setCurrentGymName(gym.name);
    setCurrentGymApplications(pendingApplications[gym.id] || []);
    setApplicationsDialogOpen(true);
  };

  const handleApproveApplication = (applicationId: string) => {
    // Update pending applications
    const updatedApplications = { ...pendingApplications };
    
    // Find which gym this application belongs to
    let gymId = "";
    for (const [key, apps] of Object.entries(updatedApplications)) {
      const appIndex = apps.findIndex(app => app.id === applicationId);
      if (appIndex >= 0) {
        gymId = key;
        // Remove application from pending list
        updatedApplications[key] = apps.filter(app => app.id !== applicationId);
        if (updatedApplications[key].length === 0) {
          delete updatedApplications[key];
        }
        break;
      }
    }
    
    setPendingApplications(updatedApplications);
    
    // Update gym's pending applications count and member count
    if (gymId) {
      setGyms(gyms.map(gym => {
        if (gym.id === gymId) {
          return {
            ...gym,
            pendingApplications: gym.pendingApplications - 1,
            members: gym.members + 1
          };
        }
        return gym;
      }));
    }
    
    // Update current displayed applications
    setCurrentGymApplications(currentGymApplications.filter(app => app.id !== applicationId));
  };

  const handleRejectApplication = (applicationId: string) => {
    // Update pending applications
    const updatedApplications = { ...pendingApplications };
    
    // Find which gym this application belongs to
    let gymId = "";
    for (const [key, apps] of Object.entries(updatedApplications)) {
      const appIndex = apps.findIndex(app => app.id === applicationId);
      if (appIndex >= 0) {
        gymId = key;
        // Remove application from pending list
        updatedApplications[key] = apps.filter(app => app.id !== applicationId);
        if (updatedApplications[key].length === 0) {
          delete updatedApplications[key];
        }
        break;
      }
    }
    
    setPendingApplications(updatedApplications);
    
    // Update gym's pending applications count
    if (gymId) {
      setGyms(gyms.map(gym => {
        if (gym.id === gymId) {
          return {
            ...gym,
            pendingApplications: gym.pendingApplications - 1
          };
        }
        return gym;
      }));
    }
    
    // Update current displayed applications
    setCurrentGymApplications(currentGymApplications.filter(app => app.id !== applicationId));
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
            <th className="px-4 py-3 text-left text-sm font-medium">Applications</th>
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
                  {gym.pendingApplications > 0 ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800 px-3"
                      onClick={() => handleViewApplications(gym)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      {gym.pendingApplications} Pending
                    </Button>
                  ) : (
                    <span className="text-sm text-muted-foreground">No pending</span>
                  )}
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
                    {isManager && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                        onClick={() => handleDeleteGym(gym)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
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

      <AddEditGymDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        gym={currentGym}
        onSave={handleSaveGym}
      />
      
      <PendingApplicationsDialog
        open={applicationsDialogOpen}
        onOpenChange={setApplicationsDialogOpen}
        gymName={currentGymName}
        applications={currentGymApplications}
        onApprove={handleApproveApplication}
        onReject={handleRejectApplication}
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this gym?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the gym
              {gymToDelete && ` "${gymToDelete.name}"`} and remove its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteGym}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GymsTab;
