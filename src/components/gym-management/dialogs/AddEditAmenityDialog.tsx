import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const amenityFormSchema = z.object({
  name: z.string().min(2, { message: "Amenity name must be at least 2 characters." }),
  description: z.string().min(5, { message: "Please enter a description." }),
  gymId: z.string().min(1, { message: "Please select a gym." }),
});

type AmenityFormValues = z.infer<typeof amenityFormSchema>;

interface Gym {
  id: string;
  name: string;
}

interface AddEditAmenityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amenity?: {
    id?: string;
    name: string;
    description: string;
    gymId: string;
  };
  onSave: (values: AmenityFormValues) => void;
}

export function AddEditAmenityDialog({ open, onOpenChange, amenity, onSave }: AddEditAmenityDialogProps) {
  const isEditing = !!amenity?.id;
  const { user } = useAuth();
  const [gyms, setGyms] = useState<Gym[]>([]);

  const defaultValues: Partial<AmenityFormValues> = {
    name: amenity?.name || "",
    description: amenity?.description || "",
    gymId: amenity?.gymId || "",
  };

  const form = useForm<AmenityFormValues>({
    resolver: zodResolver(amenityFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!user) return;
    const fetchGyms = async () => {
      try {
        const gymsRef = collection(db, "gyms");
        const q = query(gymsRef, where("ownerId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const gymsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Gym));
        setGyms(gymsList);
      } catch (error) {
        console.error("Error fetching gyms:", error);
      }
    };
    fetchGyms();
  }, [user]);

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
              name="gymId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gym</FormLabel>
                  <Select
                    disabled={isEditing}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gym" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gyms.map((gym) => (
                        <SelectItem key={gym.id} value={gym.id}>
                          {gym.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
