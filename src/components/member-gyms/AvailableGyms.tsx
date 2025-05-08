
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Import components
import GymCard from "./GymCard";
import GymDetailsContent from "./GymDetailsContent";
import MembershipApplicationDialog from "./MembershipApplicationDialog";

// Import data and types
import { availableGyms, gymIdMapping } from "./data/gymData";
import { Gym, MembershipOption } from "./types/gymTypes";

const AvailableGyms = () => {
  const [selectedGym, setSelectedGym] = useState<null | Gym>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<null | MembershipOption>(null);
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState<number[]>([]);
  const [applications, setApplications] = useState<Record<string, any[]>>({});
  const { toast } = useToast();

  // Mock user data
  const currentUser = {
    name: "Alex Johnson",
    id: "user123"
  };

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
    if (selectedGym) {
      // Create a new application
      const newApplication = {
        id: `app-${Date.now()}`,
        gymId: gymIdMapping[selectedGym.id], // Convert to manager gym ID
        memberName: currentUser.name,
        membershipType: selectedMembership?.name,
        requestDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        status: "pending",
        memberId: currentUser.id
      };
      
      // Update applications state
      setApplications(prev => {
        const gymId = gymIdMapping[selectedGym.id];
        return {
          ...prev,
          [gymId]: [...(prev[gymId] || []), newApplication]
        };
      });
      
      toast({
        title: "Membership Application Submitted",
        description: `Your application for ${selectedMembership?.name} membership at ${selectedGym.name} has been submitted successfully.`,
      });
      
      // Update local application success tracking
      setApplicationSuccess([...applicationSuccess, selectedGym.id]);
    }
    setMembershipDialogOpen(false);
    setIsDialogOpen(false);
  };

  const hasApplied = (gymId: number) => {
    return applicationSuccess.includes(gymId);
  };

  // Effects to simulate updating the gym manager's pending applications
  useEffect(() => {
    // This would normally be handled by a backend or context/redux
    // Here we simulate the data connection between member and manager views
    console.log("Applications submitted:", applications);
  }, [applications]);

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
          {availableGyms.map((gym) => (
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
