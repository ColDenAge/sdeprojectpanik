
import { useToast } from "@/hooks/use-toast";
import { MembershipApplication } from "../types/gymTypes";

interface UseApplicationActionsProps {
  onApprove: (applicationId: string) => void;
  onReject: (applicationId: string) => void;
}

export const useApplicationActions = ({
  onApprove,
  onReject,
}: UseApplicationActionsProps) => {
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

  return {
    handleApprove,
    handleReject
  };
};
