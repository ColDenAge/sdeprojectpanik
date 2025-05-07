
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditGymDialog } from "./dialogs/AddEditGymDialog";
import PendingApplicationsDialog from "./PendingApplicationsDialog";
import DeleteGymDialog from "./dialogs/DeleteGymDialog";
import GymsTable from "./GymsTable";
import { useToast } from "@/hooks/use-toast";
import { initialGymsData, mockApplicationsData } from "./data/mockData";
import { Gym, MembershipApplication, ApplicationsRecord } from "./types/gymTypes";

const GymsTab = ({ userRole }: { userRole?: string }) => {
  const { searchTerm } = useSearch();
  const [gyms, setGyms] = useState(initialGymsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGym, setCurrentGym] = useState<undefined | Gym>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gymToDelete, setGymToDelete] = useState<undefined | Gym>(undefined);
  const [applicationsDialogOpen, setApplicationsDialogOpen] = useState(false);
  const [currentGymApplications, setCurrentGymApplications] = useState<MembershipApplication[]>([]);
  const [currentGymName, setCurrentGymName] = useState("");
  const { toast } = useToast();

  const [pendingApplications, setPendingApplications] = useState<ApplicationsRecord>(mockApplicationsData);

  const filteredGyms = gyms.filter((gym) => {
    const search = searchTerm.toLowerCase();
    return (
      gym.name.toLowerCase().includes(search) ||
      gym.location.toLowerCase().includes(search) ||
      gym.members.toString().includes(search) ||
      gym.status.toLowerCase().includes(search)
    );
  });

  const handleEditGym = (gym: Gym) => {
    setCurrentGym(gym);
    setDialogOpen(true);
  };

  const handleAddGym = () => {
    setCurrentGym(undefined);
    setDialogOpen(true);
  };

  const handleDeleteGym = (gym: Gym) => {
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

  const handleViewApplications = (gym: Gym) => {
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
      
      <GymsTable
        gyms={filteredGyms}
        isManager={isManager}
        onEditGym={handleEditGym}
        onDeleteGym={handleDeleteGym}
        onViewApplications={handleViewApplications}
      />

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
      
      <DeleteGymDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        gymToDelete={gymToDelete}
        onConfirmDelete={confirmDeleteGym}
      />
    </div>
  );
};

export default GymsTab;
