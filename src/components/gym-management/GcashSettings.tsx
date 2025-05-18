import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const gcashFormSchema = z.object({
  gcashNumber: z
    .string()
    .min(11, "GCash number must be 11 digits")
    .max(11, "GCash number must be 11 digits")
    .regex(/^09\d{9}$/, "Please enter a valid GCash number starting with 09"),
});

type GcashFormValues = z.infer<typeof gcashFormSchema>;

interface GcashSettingsProps {
  currentGcashNumber?: string;
  onSave: (gcashNumber: string) => void;
}

export const GcashSettings: React.FC<GcashSettingsProps> = ({
  currentGcashNumber = "",
  onSave,
}) => {
  const { toast } = useToast();
  const form = useForm<GcashFormValues>({
    resolver: zodResolver(gcashFormSchema),
    defaultValues: {
      gcashNumber: currentGcashNumber,
    },
  });

  const onSubmit = (data: GcashFormValues) => {
    onSave(data.gcashNumber);
    toast({
      title: "Success",
      description: "GCash number has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">GCash Payment Settings</h3>
        <p className="text-sm text-muted-foreground">
          Set up your GCash number to receive membership payments from your gym members.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="gcashNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GCash Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="09XXXXXXXXX"
                    {...field}
                    className="font-mono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save GCash Number</Button>
        </form>
      </Form>
    </div>
  );
}; 