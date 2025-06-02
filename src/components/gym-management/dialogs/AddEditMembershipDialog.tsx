
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const membershipFormSchema = z.object({
  name: z.string().min(2, { message: "Plan name must be at least 2 characters." }),
  price: z.string().min(1, { message: "Please enter a price." }),
  duration: z.string().min(1, { message: "Please enter a duration." }),
  benefits: z.string().min(5, { message: "Please enter the benefits." }),
});

type MembershipFormValues = z.infer<typeof membershipFormSchema>;

interface AddEditMembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  membership?: {
    id?: string;
    name: string;
    price: string;
    duration: string;
    benefits: string;
  };
  onSave: (values: MembershipFormValues) => void;
}

export function AddEditMembershipDialog({ open, onOpenChange, membership, onSave }: AddEditMembershipDialogProps) {
  const isEditing = !!membership?.id;
  
  const defaultValues: Partial<MembershipFormValues> = {
    name: membership?.name || "",
    price: membership?.price || "",
    duration: membership?.duration || "",
    benefits: membership?.benefits || "",
  };

  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: MembershipFormValues) => {
    onSave(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Membership Plan" : "Add New Membership Plan"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Premium" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="$59.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="Monthly" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <Input placeholder="Unlimited access, free classes, guest passes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                {isEditing ? "Save Changes" : "Add Membership Plan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
