
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { MembershipApplication } from "./types/gymTypes";

interface ApplicationCardProps {
  application: MembershipApplication;
  onApprove: (application: MembershipApplication) => void;
  onReject: (application: MembershipApplication) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onApprove,
  onReject
}) => {
  return (
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
          onClick={() => onReject(application)}
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <X className="h-4 w-4 mr-1" />
          Reject
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onApprove(application)}
          className="text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
        >
          <Check className="h-4 w-4 mr-1" />
          Approve
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCard;
