
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock data for the user's gym memberships
const activeSubscriptions = [
  {
    id: 1,
    gymName: "FitLife Downtown",
    membershipType: "Premium",
    startDate: "Jan 15, 2023",
    nextPayment: "Jun 15, 2023",
    status: "Active",
    location: "Downtown"
  },
  {
    id: 2,
    gymName: "Elite Fitness Center",
    membershipType: "Standard",
    startDate: "Mar 10, 2023",
    nextPayment: "Jun 10, 2023",
    status: "Active",
    location: "Westside"
  }
];

const ActiveSubscriptions = () => {
  return (
    <Card className="mb-8">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Active Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.gymName}</TableCell>
                  <TableCell>{subscription.membershipType}</TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.nextPayment}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell>{subscription.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveSubscriptions;
