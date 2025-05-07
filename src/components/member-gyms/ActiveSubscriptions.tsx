
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { UserCheck, Edit } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data for the user's gym memberships
const activeSubscriptions = [
  {
    id: 1,
    gymName: "FitLife Downtown",
    membershipType: "Premium",
    startDate: "Jan 15, 2023",
    nextPayment: "Jun 15, 2023",
    status: "Active",
    location: "Downtown",
    availablePlans: [
      { id: 1, name: "Standard", price: "$29.99/mo", current: false },
      { id: 2, name: "Premium", price: "$49.99/mo", current: true },
      { id: 3, name: "Premium Plus", price: "$69.99/mo", current: false }
    ]
  },
  {
    id: 2,
    gymName: "Elite Fitness Center",
    membershipType: "Standard",
    startDate: "Mar 10, 2023",
    nextPayment: "Jun 10, 2023",
    status: "Active",
    location: "Westside",
    availablePlans: [
      { id: 1, name: "Basic", price: "$19.99/mo", current: false },
      { id: 2, name: "Standard", price: "$39.99/mo", current: true },
      { id: 3, name: "Premium", price: "$59.99/mo", current: false }
    ]
  }
];

const ActiveSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(activeSubscriptions);
  const [selectedSubscription, setSelectedSubscription] = useState<null | typeof activeSubscriptions[0]>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [pendingSubscriptions, setPendingSubscriptions] = useState<any[]>([]);
  const { toast } = useToast();

  // This is where we would normally fetch approved memberships from an API
  // For demo purposes, we'll simulate this with a mock approval
  useEffect(() => {
    // Simulate a newly approved membership after 5 seconds for demo purposes
    const timer = setTimeout(() => {
      const newApproval = {
        id: subscriptions.length + 1,
        gymName: "PowerLift Gym",
        membershipType: "Monthly",
        startDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        status: "Active",
        location: "Eastside",
        availablePlans: [
          { id: 1, name: "Monthly", price: "$34.99/mo", current: true },
          { id: 2, name: "Quarterly", price: "$29.99/mo (billed quarterly)", current: false },
          { id: 3, name: "Annual", price: "$24.99/mo (billed annually)", current: false }
        ]
      };
      
      setSubscriptions(prev => [...prev, newApproval]);
      
      toast({
        title: "Membership Approved!",
        description: "Your PowerLift Gym membership application has been approved.",
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleManageSubscription = (subscription: typeof activeSubscriptions[0]) => {
    setSelectedSubscription(subscription);
    setSelectedPlan(subscription.availablePlans.find(plan => plan.current)?.id.toString() || "");
    setIsDialogOpen(true);
  };

  const handlePlanChange = () => {
    if (!selectedSubscription || !selectedPlan) return;
    
    const planName = selectedSubscription.availablePlans.find(
      plan => plan.id.toString() === selectedPlan
    )?.name;

    toast({
      title: "Membership Changed",
      description: `Your membership has been updated to ${planName} plan.`,
    });
    
    setIsDialogOpen(false);
    
    // Update the subscription in state
    setSubscriptions(subscriptions.map(sub => 
      sub.id === selectedSubscription.id 
        ? {
            ...sub,
            membershipType: planName || sub.membershipType,
            availablePlans: sub.availablePlans.map(plan => ({
              ...plan,
              current: plan.id.toString() === selectedPlan
            }))
          }
        : sub
    ));
  };

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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
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
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                        onClick={() => handleManageSubscription(subscription)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    You don't have any active subscriptions yet
                  </TableCell>
                </TableRow>
              )}
              {pendingSubscriptions.length > 0 && pendingSubscriptions.map((pending, idx) => (
                <TableRow key={`pending-${idx}`}>
                  <TableCell className="font-medium">{pending.gymName}</TableCell>
                  <TableCell>{pending.membershipType}</TableCell>
                  <TableCell colSpan={3} className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Pending Approval
                    </span>
                  </TableCell>
                  <TableCell>{pending.location}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Change Membership Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Membership Plan</DialogTitle>
          </DialogHeader>
          
          {selectedSubscription && (
            <div className="py-4">
              <h3 className="font-medium">{selectedSubscription.gymName}</h3>
              <p className="text-sm text-muted-foreground mb-4">Current Plan: {selectedSubscription.membershipType}</p>
              
              <div className="space-y-4">
                <div className="font-medium">Available Plans:</div>
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                  {selectedSubscription.availablePlans.map((plan) => (
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handlePlanChange} 
              className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
              disabled={!selectedPlan || selectedPlan === selectedSubscription?.availablePlans.find(plan => plan.current)?.id.toString()}
            >
              Change Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ActiveSubscriptions;
