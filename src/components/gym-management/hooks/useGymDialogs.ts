
import { useState } from "react";
import { Gym, MembershipApplication } from "../types/gymTypes";

export const useGymDialogs = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGym, setCurrentGym] = useState<undefined | Gym>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gymToDelete, setGymToDelete] = useState<undefined | Gym>(undefined);
  const [applicationsDialogOpen, setApplicationsDialogOpen] = useState(false);
  const [currentGymApplications, setCurrentGymApplications] = useState<MembershipApplication[]>([]);
  const [currentGymName, setCurrentGymName] = useState("");

  const handleEditGym = (gym: Gym) => {
    setCurrentGym(gym);
    setDialogOpen(true);
  };

  const handleAddGym = () => {
    setCurrentGym(undefined);
    setDialogOpen(true);
  };

  const handleDeleteGymClick = (gym: Gym) => {
    setGymToDelete(gym);
    setDeleteDialogOpen(true);
  };

  const handleViewApplications = (gym: Gym, pendingApplications: Record<string, MembershipApplication[]>) => {
    setCurrentGymName(gym.name);
    setCurrentGymApplications(pendingApplications[gym.id] || []);
    setApplicationsDialogOpen(true);
  };

  return {
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
  };
};
