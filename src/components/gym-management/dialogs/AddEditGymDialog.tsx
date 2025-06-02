import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const gymFormSchema = z.object({
  name: z.string().min(2, { message: "Gym name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  contactNumber: z.string().min(10, { message: "Please enter a valid contact number." }),
  gcashNumber: z.string()
    .min(11, "GCash number must be 11 digits")
    .max(11, "GCash number must be 11 digits")
    .regex(/^09\d{9}$/, "Please enter a valid GCash number starting with 09")
    .optional(),
});

type GymFormValues = z.infer<typeof gymFormSchema>;

interface AddEditGymDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gym?: {
    id?: string;
    name: string;
    location: string;
    address?: string;
    contactNumber?: string;
    gcashNumber?: string;
  };
  onSave: (values: GymFormValues) => void;
}

export function AddEditGymDialog({ open, onOpenChange, gym, onSave }: AddEditGymDialogProps) {
  const isEditing = !!gym?.id;
  
  const defaultValues: Partial<GymFormValues> = {
    name: gym?.name || "",
    location: gym?.location || "",
    address: gym?.address || "",
    contactNumber: gym?.contactNumber || "",
    gcashNumber: gym?.gcashNumber || "",
  };

  const form = useForm<GymFormValues>({
    resolver: zodResolver(gymFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: GymFormValues) => {
    onSave(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Gym Information" : "Add New Gym"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gym Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Downtown Fitness" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Downtown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gcashNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GCash Number (for payments)</FormLabel>
                  <FormControl>
                    <Input placeholder="09XXXXXXXXX" {...field} className="font-mono" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                {isEditing ? "Save Changes" : "Add Gym"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
