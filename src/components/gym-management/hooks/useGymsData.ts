
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Gym, MembershipApplication, ApplicationsRecord } from "../types/gymTypes";
import { initialGymsData, mockApplicationsData } from "../data/mockData";

export const useGymsData = (searchTerm: string) => {
  const [gyms, setGyms] = useState(initialGymsData);
  const [pendingApplications, setPendingApplications] = useState<ApplicationsRecord>(mockApplicationsData);
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

  const handleSaveGym = (values: { name: string; location: string; address: string; contactNumber: string }, currentGym?: Gym) => {
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

  const handleDeleteGym = (gymToDelete: Gym) => {
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
  };

  const handleApproveApplication = (applicationId: string, currentGymApplications: MembershipApplication[], setCurrentGymApplications: React.Dispatch<React.SetStateAction<MembershipApplication[]>>) => {
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

  const handleRejectApplication = (applicationId: string, currentGymApplications: MembershipApplication[], setCurrentGymApplications: React.Dispatch<React.SetStateAction<MembershipApplication[]>>) => {
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

  return {
    gyms,
    filteredGyms,
    pendingApplications,
    handleSaveGym,
    handleDeleteGym,
    handleApproveApplication,
    handleRejectApplication
  };
};
