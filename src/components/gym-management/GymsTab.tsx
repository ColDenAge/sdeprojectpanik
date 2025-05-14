import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditGymDialog } from "./dialogs/AddEditGymDialog";
import PendingApplicationsDialog from "./PendingApplicationsDialog";
import DeleteGymDialog from "./dialogs/DeleteGymDialog";
import GymsTable from "./GymsTable";
import { useToast } from "@/hooks/use-toast";
import { initialGymsData } from "./data/mockData";
import { Gym, MembershipApplication, ApplicationsRecord } from "./types/gymTypes";
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthProvider';
import { approveApplication, rejectApplication } from './hooks/useApproveRejectApplication';
import MembersTab from "./MembersTab";

interface GymsTabProps {
  userRole?: string;
  gyms: Gym[];
}

const GymsTab: React.FC<GymsTabProps> = ({ userRole, gyms }) => {
  const { searchTerm } = useSearch();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGym, setCurrentGym] = useState<undefined | Gym>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gymToDelete, setGymToDelete] = useState<undefined | Gym>(undefined);
  const [applicationsDialogOpen, setApplicationsDialogOpen] = useState(false);
  const [currentGymApplications, setCurrentGymApplications] = useState<MembershipApplication[]>([]);
  const [currentGymName, setCurrentGymName] = useState("");
  const { toast } = useToast();

  const filteredGyms = gyms.filter((gym) => {
    const search = searchTerm.toLowerCase();
    return (
      gym.name.toLowerCase().includes(search) ||
      gym.location.toLowerCase().includes(search) ||
      gym.members?.toString().includes(search) ||
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
      toast({
        title: "Gym Deleted",
        description: `${gymToDelete.name} has been removed.`,
      });
    }
    setDeleteDialogOpen(false);
  };

  const handleSaveGym = (values: { name: string; location: string; address: string; contactNumber: string; gcashNumber?: string }) => {
    if (currentGym) {
      // Edit existing gym
      // This logic is now handled by the parent component
    } else {
      // Add new gym
      // This logic is now handled by the parent component
    }
  };

  const handleViewApplications = async (gym: Gym) => {
    setCurrentGymName(gym.name);
    // Fetch applications from Firestore
    const applicationsRef = collection(db, 'gyms', gym.id.toString(), 'applications');
    const snapshot = await getDocs(applicationsRef);
    const applications = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        gymId: data.gymId || gym.id,
        memberName: data.memberName || '',
        membershipType: data.membershipType || '',
        requestDate: data.requestDate || '',
        status: data.status || 'pending',
        memberId: data.memberId || '',
      };
    });
    setCurrentGymApplications(applications.filter(app => app.status === 'pending'));
    setApplicationsDialogOpen(true);
  };

  const handleApproveApplication = async (applicationId: string) => {
    const app = currentGymApplications.find(app => app.id === applicationId);
    if (!app) return;
    await approveApplication(app);
    setCurrentGymApplications(currentGymApplications.filter(app => app.id !== applicationId));
  };

  const handleRejectApplication = async (applicationId: string) => {
    const app = currentGymApplications.find(app => app.id === applicationId);
    if (!app) return;
    await rejectApplication(app);
    setCurrentGymApplications(currentGymApplications.filter(app => app.id !== applicationId));
  };

  const handleMemberAccepted = (gymId: string) => {
    // This logic is now handled by the parent component
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

      <MembersTab
        gymId={currentGym?.id}
        onMemberAccepted={() => currentGym && handleMemberAccepted(currentGym.id)}
      />
    </div>
  );
};

export default GymsTab;
