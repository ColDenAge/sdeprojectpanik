import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "./SearchContext";
import { AddEditMembershipDialog } from "./dialogs/AddEditMembershipDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// TODO: Replace this with actual selected gym ID from context/prop
const selectedGymId = "REPLACE_WITH_SELECTED_GYM_ID";

const MembershipPlansTab = () => {
  const { searchTerm } = useSearch();
  const [membershipPlans, setMembershipPlans] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<any | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedGymId) return;
    const fetchPlans = async () => {
      try {
        const plansRef = collection(db, "gyms", selectedGymId, "membershipPlans");
        const plansSnapshot = await getDocs(plansRef);
        const plansList = plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMembershipPlans(plansList);
      } catch (error) {
        console.error("Error fetching membership plans:", error);
        toast({
          title: "Error",
          description: "Failed to fetch membership plans.",
          variant: "destructive",
        });
      }
    };
    fetchPlans();
  }, [selectedGymId, toast]);

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

  const handleEditPlan = (plan: any) => {
    setCurrentPlan(plan);
    setDialogOpen(true);
  };

  const handleDeletePlan = (plan: any) => {
    setPlanToDelete(plan);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePlan = async () => {
    if (planToDelete && selectedGymId) {
      try {
        await deleteDoc(doc(db, "gyms", selectedGymId, "membershipPlans", planToDelete.id));
        setMembershipPlans(membershipPlans.filter(plan => plan.id !== planToDelete.id));
        toast({
          title: "Membership Plan Deleted",
          description: `${planToDelete.name} plan has been removed.`,
        });
      } catch (error) {
        console.error("Error deleting plan:", error);
        toast({
          title: "Error",
          description: "Failed to delete membership plan.",
          variant: "destructive",
        });
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleSavePlan = async (values: { name: string; price: string; duration: string; benefits: string }) => {
    if (!selectedGymId) return;
    try {
      if (currentPlan) {
        // Edit existing plan
        await updateDoc(doc(db, "gyms", selectedGymId, "membershipPlans", currentPlan.id), values);
        setMembershipPlans(
          membershipPlans.map((item) =>
            item.id === currentPlan.id
              ? { ...item, ...values }
              : item
          )
        );
        toast({
          title: "Membership Plan Updated",
          description: `${values.name} plan has been updated.`,
        });
      } else {
        // Add new plan
        const docRef = await addDoc(collection(db, "gyms", selectedGymId, "membershipPlans"), values);
        const newPlan = {
          id: docRef.id,
          ...values,
          members: "0",
        };
        setMembershipPlans([...membershipPlans, newPlan]);
        toast({
          title: "Membership Plan Added",
          description: `${values.name} plan has been added.`,
        });
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      toast({
        title: "Error",
        description: "Failed to save membership plan.",
        variant: "destructive",
      });
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
                      {plan.members || "0"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                        onClick={() => handleEditPlan(plan)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                        onClick={() => handleDeletePlan(plan)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
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
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this membership plan?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              {planToDelete && ` "${planToDelete.name}"`} plan and remove its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletePlan}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MembershipPlansTab;
