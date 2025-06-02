import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gym, MembershipOption } from "./types/gymTypes";

interface MembershipApplicationDialogProps {
  open: boolean;
  selectedGym: Gym | null;
  selectedMembership: MembershipOption | null;
  setSelectedMembership: (membership: MembershipOption | null) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const MembershipApplicationDialog: React.FC<MembershipApplicationDialogProps> = ({
  open,
  selectedGym,
  selectedMembership,
  setSelectedMembership,
  onClose,
  onConfirm
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for Membership</DialogTitle>
        </DialogHeader>

        {selectedGym && selectedMembership ? (
          <div className="py-4">
            <h3 className="font-medium text-lg">{selectedGym.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{selectedGym.location}</p>

            <div className="my-4 p-4 border rounded-md">
              <h4 className="font-medium">{selectedMembership.name} Plan</h4>
              <p className="text-sm text-muted-foreground">{selectedMembership.price}</p>
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-md">
              <p className="text-sm">
                By applying for this membership, you agree to the terms and conditions of the gym.
                After approval, membership fees will be automatically charged to your payment method on file.
              </p>
            </div>
          </div>
        ) : selectedGym ? (
          <div className="py-4">
            <h3 className="font-medium text-lg">{selectedGym.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{selectedGym.location}</p>

            <div className="my-4">
              <h4 className="font-medium mb-2">Select a Membership Plan:</h4>
              <div className="space-y-3">
                {(selectedGym.membershipOptions ?? []).map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedMembership?.id === plan.id ? 'border-[#0B294B] bg-[#0B294B]/5' : ''
                    }`}
                    onClick={() => setSelectedMembership(plan)}
                  >
                    <div className="flex justify-between">
                      <h5 className="font-medium">{plan.name}</h5>
                      <p className="text-sm text-muted-foreground">{plan.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-4 bg-muted/30 rounded-md">
              <p className="text-sm">
                Please select a membership plan to continue with your application.
              </p>
            </div>
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => {
            onClose();
            setSelectedMembership(null);
          }}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
            disabled={!selectedMembership}
          >
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipApplicationDialog;
