
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import SubscriptionsTable from "./SubscriptionsTable";
import ChangeMembershipDialog from "./ChangeMembershipDialog";
import GymDetailsDialog from "./GymDetailsDialog";
import { useSubscriptions } from "./hooks/useSubscriptions";

const ActiveSubscriptions = () => {
  const {
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
  } = useSubscriptions();

  return (
    <Card className="mb-8">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Active Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <SubscriptionsTable 
          subscriptions={subscriptions}
          pendingSubscriptions={pendingSubscriptions}
          onViewDetails={handleViewGymDetails}
          onManage={handleManageSubscription}
        />
      </CardContent>

      {/* Change Membership Dialog */}
      <ChangeMembershipDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        subscription={selectedSubscription}
        selectedPlan={selectedPlan}
        onPlanChange={handlePlanChange}
        onSubmit={handlePlanSubmit}
      />

      {/* Gym Details Dialog */}
      <GymDetailsDialog 
        isOpen={isDetailsDialogOpen} 
        onClose={() => setIsDetailsDialogOpen(false)}
        gym={selectedGym}
        onEnrollClass={handleEnrollClass}
      />
    </Card>
  );
};

export default ActiveSubscriptions;
