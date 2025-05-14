import React, { useState } from "react";
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

const GymsTab = ({ userRole }: { userRole?: string }) => {
  const { searchTerm } = useSearch();
  const { user } = useAuth();
  const [gyms, setGyms] = useState(initialGymsData);
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
        gcashNumber: values.gcashNumber || '',
        members: 0,
        status: "Active",
        pendingApplications: 0,
        ownerId: user?.uid || '', // TODO: Use current user's UID
      };
      setGyms([...gyms, newGym]);
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
    // Find the application
    const app = currentGymApplications.find(app => app.id === applicationId);
    if (!app) return;
    // Update status in Firestore
    const appRef = doc(db, 'gyms', app.gymId, 'applications', applicationId);
    await updateDoc(appRef, { status: 'approved' });
    // Add member to gym's members subcollection
    if (app.memberId && app.memberName) {
      const memberRef = doc(collection(db, 'gyms', app.gymId, 'members'), app.memberId);
      await setDoc(memberRef, {
        memberId: app.memberId,
        memberName: app.memberName,
        membershipType: app.membershipType,
        joinedAt: new Date().toISOString(),
        status: 'active'
      });
    }
    setCurrentGymApplications(currentGymApplications.filter(app => app.id !== applicationId));
  };

  const handleRejectApplication = async (applicationId: string) => {
    // Find the application
    const app = currentGymApplications.find(app => app.id === applicationId);
    if (!app) return;
    // Update status in Firestore
    const appRef = doc(db, 'gyms', app.gymId, 'applications', applicationId);
    await updateDoc(appRef, { status: 'rejected' });
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
