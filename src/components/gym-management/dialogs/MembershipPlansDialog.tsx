import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Gym, MembershipPlan } from "../types/gymTypes";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const membershipPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  benefits: z.string().min(1, "Benefits are required"),
});

const membershipPlansFormSchema = z.object({
  membershipPlans: z.array(membershipPlanSchema).min(1, "At least one membership plan is required"),
});

type MembershipPlansFormValues = z.infer<typeof membershipPlansFormSchema>;

interface MembershipPlansDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gym: Gym;
  onSave: () => void;
}

const MembershipPlansDialog: React.FC<MembershipPlansDialogProps> = ({
  open,
  onOpenChange,
  gym,
  onSave,
}) => {
  const { toast } = useToast();

  const form = useForm<MembershipPlansFormValues>({
    resolver: zodResolver(membershipPlansFormSchema),
    defaultValues: {
      membershipPlans: gym.membershipPlans?.map(plan => ({
        name: plan.name,
        price: plan.price.toString(),
        duration: plan.duration,
        benefits: Array.isArray(plan.benefits) ? plan.benefits.join(', ') : plan.benefits
      })) || [
        { name: "", price: "", duration: "", benefits: "" }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "membershipPlans",
    control: form.control,
  });

  const onSubmit = async (values: MembershipPlansFormValues) => {
    try {
      const processedMembershipPlans = values.membershipPlans.map(plan => ({
        id: crypto.randomUUID(),
        name: plan.name,
        price: parseFloat(plan.price),
        duration: plan.duration,
        benefits: plan.benefits.split(',').map(b => b.trim())
      }));

      await updateDoc(doc(db, "gyms", gym.id), {
        membershipPlans: processedMembershipPlans,
        updatedAt: serverTimestamp()
      });

      toast({
        title: "Success",
        description: "Membership plans updated successfully.",
      });

      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating membership plans:", error);
      toast({
        title: "Error",
        description: "Failed to update membership plans. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Membership Plans - {gym.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Membership Plans</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", price: "", duration: "", benefits: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plan
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Plan {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`membershipPlans.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Basic, Premium, VIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`membershipPlans.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="e.g., 29.99"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`membershipPlans.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Monthly, Quarterly, Yearly" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`membershipPlans.${index}.benefits`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benefits</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Access to all equipment, Free classes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#0B294B] text-white hover:bg-[#0a2544]">
                Save Plans
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipPlansDialog;