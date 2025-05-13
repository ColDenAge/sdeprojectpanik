import { useState } from "react";
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
      const classIndex = (updatedGym.classes ?? []).findIndex(c => c.id === classItem.id);

      if (
        classIndex !== -1 &&
        (updatedGym.classes?.[classIndex]?.enrolled ?? 0) < (updatedGym.classes?.[classIndex]?.capacity ?? 0)
      ) {
        if (updatedGym.classes) {
          updatedGym.classes[classIndex].enrolled += 1;
        }

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
