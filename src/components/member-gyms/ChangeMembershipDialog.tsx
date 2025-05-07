
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ChangeMembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: {
    id: number;
    gymName: string;
    membershipType: string;
    availablePlans: {
      id: number;
      name: string;
      price: string;
      current: boolean;
    }[];
  } | null;
  selectedPlan: string;
  onPlanChange: (value: string) => void;
  onSubmit: () => void;
}

const ChangeMembershipDialog: React.FC<ChangeMembershipDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  selectedPlan,
  onPlanChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Membership Plan</DialogTitle>
        </DialogHeader>
        
        {subscription && (
          <div className="py-4">
            <h3 className="font-medium">{subscription.gymName}</h3>
            <p className="text-sm text-muted-foreground mb-4">Current Plan: {subscription.membershipType}</p>
            
            <div className="space-y-4">
              <div className="font-medium">Available Plans:</div>
              <RadioGroup value={selectedPlan} onValueChange={onPlanChange}>
                {subscription.availablePlans.map((plan) => (
                  <div key={plan.id} className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value={plan.id.toString()} id={`plan-${plan.id}`} />
                    <Label htmlFor={`plan-${plan.id}`} className="flex-1">
                      <div className="flex justify-between items-center">
                        <span>{plan.name}</span>
                        <span className="text-sm text-muted-foreground">{plan.price}</span>
                      </div>
                      {plan.current && (
                        <span className="text-xs text-green-600">Current plan</span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="mt-4 p-3 bg-muted/30 rounded-md">
                <p className="text-sm">
                  Your billing cycle will be updated to reflect your new plan. Changes will take effect at your next billing date.
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={onSubmit} 
            className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
            disabled={!selectedPlan || selectedPlan === subscription?.availablePlans.find(plan => plan.current)?.id.toString()}
          >
            Change Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeMembershipDialog;
