
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export type MembershipApplication = {
  id: string;
  gymId: string;
  memberName: string;
  membershipType: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
};

interface PendingApplicationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gymName: string;
  applications: MembershipApplication[];
  onApprove: (applicationId: string) => void;
  onReject: (applicationId: string) => void;
}

const PendingApplicationsDialog: React.FC<PendingApplicationsDialogProps> = ({
  open,
  onOpenChange,
  gymName,
  applications,
  onApprove,
  onReject,
}) => {
  const { toast } = useToast();
  
  const handleApprove = (application: MembershipApplication) => {
    onApprove(application.id);
    toast({
      title: "Application Approved",
      description: `${application.memberName} has been approved for ${application.membershipType} membership.`,
    });
  };
  
  const handleReject = (application: MembershipApplication) => {
    onReject(application.id);
    toast({
      title: "Application Rejected",
      description: `${application.memberName}'s application has been rejected.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Pending Membership Applications</DialogTitle>
          <DialogDescription>
            Review and manage membership applications for {gymName}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[300px] pr-4">
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((application) => (
                <div 
                  key={application.id} 
                  className="p-4 border rounded-lg flex flex-col space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{application.memberName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {application.membershipType} Membership
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Requested on {application.requestDate}
                      </p>
                    </div>
                    <Badge className="bg-amber-500">Pending</Badge>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReject(application)}
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleApprove(application)}
                      className="text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No pending applications for this gym.
            </div>
          )}
        </ScrollArea>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PendingApplicationsDialog;
