
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
import { CreditCard, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleCancelSubscription = (subscriptionId: number, gymName: string) => {
    // This would connect to a backend API in a real application
    toast({
      title: "Cancellation request received",
      description: `Your request to cancel the ${gymName} subscription has been received. It will be processed shortly.`,
    });
  };

  const handlePauseSubscription = (subscriptionId: number, gymName: string) => {
    // This would connect to a backend API in a real application
    toast({
      title: "Subscription paused",
      description: `Your ${gymName} subscription has been paused. You can resume it anytime.`,
    });
  };

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
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-[#0B294B] font-medium hover:underline">
                          Manage
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Manage Subscription</DialogTitle>
                          <DialogDescription>
                            {subscription.gym} - {subscription.plan} Plan
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-1 gap-2">
                            <h3 className="font-medium">Subscription Details</h3>
                            <p className="text-sm text-muted-foreground">Plan: {subscription.plan}</p>
                            <p className="text-sm text-muted-foreground">Price: {subscription.price}</p>
                            <p className="text-sm text-muted-foreground">Next Billing Date: {subscription.nextBilling}</p>
                            <p className="text-sm text-muted-foreground">Payment Method: {subscription.paymentMethod}</p>
                          </div>
                          <div className="flex flex-col gap-3 mt-4">
                            <button 
                              onClick={() => handlePauseSubscription(subscription.id, subscription.gym)}
                              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                              <Settings className="h-4 w-4" />
                              Pause Subscription
                            </button>
                            <button 
                              onClick={() => handleCancelSubscription(subscription.id, subscription.gym)}
                              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                              Cancel Subscription
                            </button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
