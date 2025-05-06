
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "./SearchContext";
import { AddEditMembershipDialog } from "./dialogs/AddEditMembershipDialog";

const membershipPlansData = [
  {
    id: "1",
    name: "Basic",
    price: "$29.99",
    duration: "Monthly",
    benefits: "Access to gym equipment, locker rooms",
    members: "45",
  },
  {
    id: "2",
    name: "Premium",
    price: "$59.99",
    duration: "Monthly",
    benefits: "Basic benefits plus all classes, sauna access, 1 guest pass",
    members: "32",
  },
  {
    id: "3",
    name: "Family",
    price: "$99.99",
    duration: "Monthly",
    benefits: "Premium benefits for up to 4 family members",
    members: "15",
  },
];

const MembershipPlansTab = () => {
  const { searchTerm } = useSearch();
  const [membershipPlans, setMembershipPlans] = useState(membershipPlansData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<undefined | typeof membershipPlansData[0]>(undefined);

  const filteredPlans = membershipPlans.filter((plan) => {
    const search = searchTerm.toLowerCase();
    return (
      plan.name.toLowerCase().includes(search) ||
      plan.price.toLowerCase().includes(search) ||
      plan.duration.toLowerCase().includes(search) ||
      plan.benefits.toLowerCase().includes(search)
    );
  });

  const handleAddPlan = () => {
    setCurrentPlan(undefined);
    setDialogOpen(true);
  };

  const handleEditPlan = (plan: typeof membershipPlansData[0]) => {
    setCurrentPlan(plan);
    setDialogOpen(true);
  };

  const handleSavePlan = (values: { name: string; price: string; duration: string; benefits: string }) => {
    if (currentPlan) {
      // Edit existing plan
      setMembershipPlans(
        membershipPlans.map((item) =>
          item.id === currentPlan.id
            ? { ...item, ...values }
            : item
        )
      );
    } else {
      // Add new plan
      const newPlan = {
        id: `${membershipPlans.length + 1}`,
        ...values,
        members: "0",
      };
      setMembershipPlans([...membershipPlans, newPlan]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Membership Plans</h3>
        <Button 
          onClick={handleAddPlan}
          className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left text-sm font-medium">Plan Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Benefits</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Members</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm">{plan.name}</td>
                  <td className="px-4 py-3 text-sm">{plan.price}</td>
                  <td className="px-4 py-3 text-sm">{plan.duration}</td>
                  <td className="px-4 py-3 text-sm max-w-xs truncate">{plan.benefits}</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="success">
                      {plan.members}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                  No membership plans match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddEditMembershipDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        membership={currentPlan}
        onSave={handleSavePlan}
      />
    </div>
  );
};

export default MembershipPlansTab;
