
import React from "react";
import { useSearch } from "./SearchContext";
import GymsTable from "./GymsTable";
import AddGymButton from "./AddGymButton";
import GymDialogsContainer from "./GymDialogsContainer";
import { useGymsData } from "./hooks/useGymsData";
import { useGymDialogs } from "./hooks/useGymDialogs";

const GymsTab = ({ userRole }: { userRole?: string }) => {
  const { searchTerm } = useSearch();
  const {
    filteredGyms,
    pendingApplications,
    handleSaveGym,
    handleDeleteGym,
    handleApproveApplication,
    handleRejectApplication
  } = useGymsData(searchTerm);

  const {
    dialogOpen,
    setDialogOpen,
    currentGym,
    deleteDialogOpen,
    setDeleteDialogOpen,
    gymToDelete,
    applicationsDialogOpen,
    setApplicationsDialogOpen,
    currentGymApplications,
    setCurrentGymApplications,
    currentGymName,
    handleEditGym,
    handleAddGym,
    handleDeleteGymClick,
    handleViewApplications
  } = useGymDialogs();

  const onSaveGym = (values: { name: string; location: string; address: string; contactNumber: string }) => {
    handleSaveGym(values, currentGym);
  };

  const confirmDeleteGym = () => {
    if (gymToDelete) {
      handleDeleteGym(gymToDelete);
    }
    setDeleteDialogOpen(false);
  };

  const onApproveApplication = (applicationId: string) => {
    handleApproveApplication(applicationId, currentGymApplications, setCurrentGymApplications);
  };

  const onRejectApplication = (applicationId: string) => {
    handleRejectApplication(applicationId, currentGymApplications, setCurrentGymApplications);
  };

  const onViewApplications = (gym: Gym) => {
    handleViewApplications(gym, pendingApplications);
  };

  const isManager = userRole === "manager";

  return (
    <div className="overflow-x-auto">
      {isManager && <AddGymButton onAddGym={handleAddGym} />}
      
      <GymsTable
        gyms={filteredGyms}
        isManager={isManager}
        onEditGym={handleEditGym}
        onDeleteGym={handleDeleteGymClick}
        onViewApplications={onViewApplications}
      />

      <GymDialogsContainer
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        currentGym={currentGym}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        gymToDelete={gymToDelete}
        applicationsDialogOpen={applicationsDialogOpen}
        setApplicationsDialogOpen={setApplicationsDialogOpen}
        currentGymName={currentGymName}
        currentGymApplications={currentGymApplications}
        onSaveGym={onSaveGym}
        onConfirmDelete={confirmDeleteGym}
        onApproveApplication={onApproveApplication}
        onRejectApplication={onRejectApplication}
      />
    </div>
  );
};

export default GymsTab;
