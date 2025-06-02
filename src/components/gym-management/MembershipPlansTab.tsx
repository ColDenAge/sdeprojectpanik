import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthProvider";
import { Gym, MembershipPlan } from "./types/gymTypes";
import MembershipPlansDialog from "./dialogs/MembershipPlansDialog";
import { GcashPayment } from "../member-gyms/GcashPayment";

interface MembershipPlansTabProps {
  gymId?: string;
}

const MembershipPlansTab: React.FC<MembershipPlansTabProps> = ({ gymId }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchGyms = async () => {
      try {
        const gymsRef = collection(db, "gyms");
        const q = query(gymsRef, where("ownerId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const gymsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Gym));
        setGyms(gymsList);

        if (gymId) {
          const selected = gymsList.find(gym => gym.id === gymId);
          if (selected) setSelectedGym(selected);
        }
      } catch (error) {
        console.error("Error fetching gyms:", error);
        toast({
          title: "Error",
          description: "Failed to fetch gyms. Please try again.",
          variant: "destructive"
        });
      }
    };
    fetchGyms();
  }, [user, gymId]);

  const handleManagePlans = (gym: Gym) => {
    setSelectedGym(gym);
    setDialogOpen(true);
  };

  const handlePaymentComplete = () => {
    // Refetch gyms to update the UI after payment
    const gymsRef = collection(db, "gyms");
    const q = query(gymsRef, where("ownerId", "==", user.uid));
    getDocs(q).then(querySnapshot => {
      const updatedGyms = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Gym));
      setGyms(updatedGyms);
      const updatedSelectedGym = updatedGyms.find(gym => gym.id === selectedGym?.id);
      if (updatedSelectedGym) setSelectedGym(updatedSelectedGym);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Membership Plans</h3>
        {selectedGym && (
          <Button
            onClick={() => handleManagePlans(selectedGym)}
            className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Manage Plans
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Benefits</TableHead>
              <TableHead>Active Members</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedGym?.membershipPlans?.length ? (
              selectedGym.membershipPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>₱{plan.price.toFixed(2)}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {Array.isArray(plan.benefits)
                        ? plan.benefits.join(", ")
                        : plan.benefits}
                    </div>
                  </TableCell>
                  <TableCell>
                    {selectedGym.activeMembers?.filter(
                      member => member.membershipPlanId === plan.id
                    ).length || 0}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManagePlans(selectedGym)}
                      >
                        Edit
                      </Button>
                      {selectedGym.gcashNumber && (
                        <GcashPayment
                          gymName={selectedGym.name}
                          gcashNumber={selectedGym.gcashNumber}
                          membershipPlan={plan}
                          onPaymentComplete={handlePaymentComplete}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                  {selectedGym
                    ? "No membership plans available. Click 'Manage Plans' to add some."
                    : "Select a gym to view its membership plans"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedGym && (
        <MembershipPlansDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          gym={selectedGym}
          onSave={() => {
            // Refetch gyms to update the UI
            const gymsRef = collection(db, "gyms");
            const q = query(gymsRef, where("ownerId", "==", user.uid));
            getDocs(q).then(querySnapshot => {
              const updatedGyms = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              } as Gym));
              setGyms(updatedGyms);
              const updatedSelectedGym = updatedGyms.find(gym => gym.id === selectedGym.id);
              if (updatedSelectedGym) setSelectedGym(updatedSelectedGym);
            });
          }}
        />
      )}
    </div>
  );
};

export default MembershipPlansTab;
