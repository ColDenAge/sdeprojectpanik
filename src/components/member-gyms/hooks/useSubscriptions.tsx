
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Gym, GymClass } from "../types/gymTypes";
import { activeSubscriptions, subscriptionGyms } from "../data/subscriptionData";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState(activeSubscriptions);
  const [selectedSubscription, setSelectedSubscription] = useState<null | typeof activeSubscriptions[0]>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [pendingSubscriptions, setPendingSubscriptions] = useState<any[]>([]);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState<null | Gym>(null);
  const { toast } = useToast();

  // Simulate a newly approved membership after 5 seconds for demo purposes
  useEffect(() => {
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
      
      // Also add the gym data
      subscriptionGyms.push({
        id: 3,
        name: "PowerLift Gym",
        location: "Eastside",
        amenities: ["Powerlifting Equipment", "Olympic Lifting Area", "Strongman Equipment", "24/7 Access"],
        membershipOptions: [
          { id: 1, name: "Monthly", price: "$34.99/month" },
          { id: 2, name: "Quarterly", price: "$29.99/month (billed quarterly)" },
          { id: 3, name: "Annual", price: "$24.99/month (billed annually)" }
        ],
        classes: [
          { id: 1, name: "Beginner Strength", instructor: "David Strong", schedule: "Mon, Wed 10:00 AM", capacity: 8, enrolled: 4 },
          { id: 2, name: "Advanced Lifting", instructor: "Maria Power", schedule: "Tue, Thu 5:00 PM", capacity: 6, enrolled: 5 }
        ]
      });
      
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

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value);
  };

  const handlePlanSubmit = () => {
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

  const handleViewGymDetails = (subscription: typeof activeSubscriptions[0]) => {
    const gym = subscriptionGyms.find(gym => gym.name === subscription.gymName);
    if (gym) {
      setSelectedGym(gym);
      setIsDetailsDialogOpen(true);
    }
  };

  const handleEnrollClass = (classItem: GymClass) => {
    if (selectedGym) {
      // Find the gym and update the class
      const updatedGym = {...selectedGym};
      const classIndex = updatedGym.classes.findIndex(c => c.id === classItem.id);
      
      if (classIndex !== -1 && updatedGym.classes[classIndex].enrolled < updatedGym.classes[classIndex].capacity) {
        updatedGym.classes[classIndex].enrolled += 1;
        setSelectedGym(updatedGym);
        
        // Update in the subscriptionGyms array as well
        const gymIndex = subscriptionGyms.findIndex(g => g.id === updatedGym.id);
        if (gymIndex !== -1) {
          subscriptionGyms[gymIndex] = updatedGym;
        }
        
        toast({
          title: "Enrolled Successfully",
          description: `You have enrolled in ${classItem.name}.`,
        });
      } else {
        toast({
          title: "Enrollment Failed",
          description: "This class is already at capacity.",
          variant: "destructive"
        });
      }
    }
  };

  return {
    subscriptions,
    pendingSubscriptions,
    selectedSubscription,
    isDialogOpen,
    selectedPlan,
    isDetailsDialogOpen,
    selectedGym,
    handleManageSubscription,
    handleViewGymDetails,
    handlePlanChange,
    handlePlanSubmit,
    setIsDialogOpen,
    setIsDetailsDialogOpen,
    handleEnrollClass,
  };
}
