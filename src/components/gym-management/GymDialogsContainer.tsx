
import React from "react";
import { AddEditGymDialog } from "./dialogs/AddEditGymDialog";
import PendingApplicationsDialog from "./PendingApplicationsDialog";
import DeleteGymDialog from "./dialogs/DeleteGymDialog";
import { Gym, MembershipApplication } from "./types/gymTypes";

interface GymDialogsContainerProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  currentGym: Gym | undefined;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  gymToDelete: Gym | undefined;
  applicationsDialogOpen: boolean;
  setApplicationsDialogOpen: (open: boolean) => void;
  currentGymName: string;
  currentGymApplications: MembershipApplication[];
  onSaveGym: (values: { name: string; location: string; address: string; contactNumber: string }) => void;
  onConfirmDelete: () => void;
  onApproveApplication: (applicationId: string) => void;
  onRejectApplication: (applicationId: string) => void;
}

const GymDialogsContainer: React.FC<GymDialogsContainerProps> = ({
  dialogOpen,
  setDialogOpen,
  currentGym,
  deleteDialogOpen,
  setDeleteDialogOpen,
  gymToDelete,
  applicationsDialogOpen,
  setApplicationsDialogOpen,
  currentGymName,
  currentGymApplications,
  onSaveGym,
  onConfirmDelete,
  onApproveApplication,
  onRejectApplication
}) => {
  return (
    <>
      <AddEditGymDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        gym={currentGym}
        onSave={onSaveGym}
      />
      
      <PendingApplicationsDialog
        open={applicationsDialogOpen}
        onOpenChange={setApplicationsDialogOpen}
        gymName={currentGymName}
        applications={currentGymApplications}
        onApprove={onApproveApplication}
        onReject={onRejectApplication}
      />
      
      <DeleteGymDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        gymToDelete={gymToDelete}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
};

export default GymDialogsContainer;
