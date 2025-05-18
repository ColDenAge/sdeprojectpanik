import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import GymCard from "./GymCard";
import GymDetailsContent from "./GymDetailsContent";
import MembershipApplicationDialog from "./MembershipApplicationDialog";
import { Gym, GymClass, MembershipOption } from "./types/gymTypes";
import { useGyms } from "./hooks/useGyms";
import { useMembershipApplications } from "./hooks/useMembershipApplications";
import { useAuth } from '@/context/AuthProvider';

const AvailableGyms = () => {
  const { gyms, isLoading } = useGyms();
  const { user } = useAuth();
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<MembershipOption | null>(null);
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock user data
  const currentUser = {
    name: user?.displayName || '',
    id: user?.uid || '',
    email: user?.email || '',
  };

  const { hasApplied, submitApplication } = useMembershipApplications({ currentUser });

  const handleViewDetails = (gym: Gym) => {
    setSelectedGym(gym);
    setIsDialogOpen(true);
  };

  const handleSelectMembership = (membership: MembershipOption) => {
    setSelectedMembership(membership);
    setMembershipDialogOpen(true);
  };

  const handleApplyMembership = (gym: Gym) => {
    setSelectedGym(gym);
    setMembershipDialogOpen(true);
  };

  const confirmMembership = () => {
    if (selectedGym && selectedMembership) {
      submitApplication(selectedGym, selectedMembership);
      setMembershipDialogOpen(false);
      setIsDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Explore Available Gyms
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center">Loading gyms...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Explore Available Gyms
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <GymCard
              key={gym.id}
              gym={gym}
              hasApplied={hasApplied(gym.id)}
              onViewDetails={handleViewDetails}
              onApplyMembership={handleApplyMembership}
            />
          ))}
        </div>
      </CardContent>

      {/* Gym Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedGym?.name}</DialogTitle>
          </DialogHeader>
          {selectedGym && (
            <GymDetailsContent
              gym={selectedGym}
              hasApplied={hasApplied(selectedGym.id)}
              onSelectMembership={handleSelectMembership}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Class Enrollment Dialog */}
      <EnrollClassDialog
        open={enrollDialogOpen}
        selectedClass={selectedClass}
        onClose={() => setEnrollDialogOpen(false)}
        onConfirm={confirmEnrollment}
      />

      {/* Membership Selection Dialog */}
      <MembershipApplicationDialog
        open={membershipDialogOpen}
        selectedGym={selectedGym}
        selectedMembership={selectedMembership}
        setSelectedMembership={setSelectedMembership}
        onClose={() => {
          setMembershipDialogOpen(false);
          setSelectedMembership(null);
        }}
        onConfirm={confirmMembership}
      />
    </Card>
  );
};

export default AvailableGyms;
