
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const classFormSchema = z.object({
  name: z.string().min(2, { message: "Class name must be at least 2 characters." }),
  instructor: z.string().min(2, { message: "Instructor name must be at least 2 characters." }),
  schedule: z.string().min(5, { message: "Please enter a valid schedule." }),
  capacity: z.string().min(1, { message: "Please enter a capacity." }),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

interface AddEditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  class?: {
    id?: string;
    name: string;
    instructor: string;
    schedule: string;
    capacity: string;
    enrolled?: string;
  };
  onSave: (values: ClassFormValues) => void;
}

export function AddEditClassDialog({ open, onOpenChange, class: gymClass, onSave }: AddEditClassDialogProps) {
  const isEditing = !!gymClass?.id;
  
  const defaultValues: Partial<ClassFormValues> = {
    name: gymClass?.name || "",
    instructor: gymClass?.instructor || "",
    schedule: gymClass?.schedule || "",
    capacity: gymClass?.capacity || "",
  };

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: ClassFormValues) => {
    onSave(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Class" : "Add New Class"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Yoga Basics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule</FormLabel>
                  <FormControl>
                    <Input placeholder="Mon, Wed, Fri 6:00 PM - 7:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input placeholder="20" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                {isEditing ? "Save Changes" : "Add Class"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
