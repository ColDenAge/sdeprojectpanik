
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";

interface SubscriptionTableRowProps {
  subscription: {
    id: number;
    gymName: string;
    membershipType: string;
    startDate: string;
    nextPayment: string;
    status: string;
    location: string;
    availablePlans: {
      id: number;
      name: string;
      price: string;
      current: boolean;
    }[];
  };
  onViewDetails: (subscription: any) => void;
  onManage: (subscription: any) => void;
  isPending?: boolean;
}

const SubscriptionTableRow: React.FC<SubscriptionTableRowProps> = ({
  subscription,
  onViewDetails,
  onManage,
  isPending = false
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{subscription.gymName}</TableCell>
      <TableCell>{subscription.membershipType}</TableCell>
      {isPending ? (
        <TableCell colSpan={3} className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Pending Approval
          </span>
        </TableCell>
      ) : (
        <>
          <TableCell>{subscription.startDate}</TableCell>
          <TableCell>{subscription.nextPayment}</TableCell>
          <TableCell>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {subscription.status}
            </span>
          </TableCell>
        </>
      )}
      <TableCell>{subscription.location}</TableCell>
      <TableCell>
        {!isPending && (
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
              onClick={() => onViewDetails(subscription)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
              onClick={() => onManage(subscription)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Manage
            </Button>
          </div>
        )}
        {isPending && (
          <span>-</span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SubscriptionTableRow;
