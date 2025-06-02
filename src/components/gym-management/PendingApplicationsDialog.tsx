
import React from "react";
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
import { MembershipApplication } from "./types/gymTypes";
import ApplicationCard from "./ApplicationCard";
import { useApplicationActions } from "./hooks/useApplicationActions";

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
  const { handleApprove, handleReject } = useApplicationActions({
    onApprove,
    onReject
  });

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
                <ApplicationCard 
                  key={application.id}
                  application={application}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
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
