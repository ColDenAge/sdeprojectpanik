
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubscriptionTableRow from "./SubscriptionTableRow";

interface SubscriptionsTableProps {
  subscriptions: Array<{
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
  }>;
  pendingSubscriptions: any[];
  onViewDetails: (subscription: any) => void;
  onManage: (subscription: any) => void;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  subscriptions,
  pendingSubscriptions,
  onViewDetails,
  onManage
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gym</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Next Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <SubscriptionTableRow
                key={subscription.id}
                subscription={subscription}
                onViewDetails={onViewDetails}
                onManage={onManage}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                You don't have any active subscriptions yet
              </TableCell>
            </TableRow>
          )}
          {pendingSubscriptions.length > 0 && pendingSubscriptions.map((pending, idx) => (
            <SubscriptionTableRow
              key={`pending-${idx}`}
              subscription={pending}
              onViewDetails={onViewDetails}
              onManage={onManage}
              isPending={true}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubscriptionsTable;
