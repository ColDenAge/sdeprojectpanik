
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CreditCard } from "lucide-react";

// Mock data for current subscriptions
const currentSubscriptions = [
  {
    id: 1,
    gym: "FitLife Downtown",
    plan: "Premium",
    price: "$49.99/month",
    nextBilling: "Jun 1, 2023",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: 2,
    gym: "Elite Fitness Center",
    plan: "Standard",
    price: "$29.99/month",
    nextBilling: "Jun 10, 2023",
    paymentMethod: "Mastercard •••• 5555"
  }
];

const CurrentSubscriptions = () => {
  return (
    <Card className="mb-8">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Current Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gym</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.gym}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>{subscription.price}</TableCell>
                  <TableCell>{subscription.nextBilling}</TableCell>
                  <TableCell>{subscription.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <button className="text-[#0B294B] font-medium hover:underline">
                      Manage
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentSubscriptions;
