
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const amenityFormSchema = z.object({
  name: z.string().min(2, { message: "Amenity name must be at least 2 characters." }),
  description: z.string().min(5, { message: "Please enter a description." }),
});

type AmenityFormValues = z.infer<typeof amenityFormSchema>;

interface AddEditAmenityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amenity?: {
    id?: string;
    name: string;
    description: string;
  };
  onSave: (values: AmenityFormValues) => void;
}

export function AddEditAmenityDialog({ open, onOpenChange, amenity, onSave }: AddEditAmenityDialogProps) {
  const isEditing = !!amenity?.id;
  
  const defaultValues: Partial<AmenityFormValues> = {
    name: amenity?.name || "",
    description: amenity?.description || "",
  };

  const form = useForm<AmenityFormValues>({
    resolver: zodResolver(amenityFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: AmenityFormValues) => {
    onSave(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Amenity" : "Add New Amenity"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenity Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Swimming Pool" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Olympic-sized swimming pool with lap lanes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                {isEditing ? "Save Changes" : "Add Amenity"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
