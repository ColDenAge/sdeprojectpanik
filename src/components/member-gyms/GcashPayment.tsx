import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const paymentFormSchema = z.object({
  referenceNumber: z
    .string()
    .min(1, "Reference number is required")
    .max(50, "Reference number is too long"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface GcashPaymentProps {
  gymName: string;
  gcashNumber: string;
  membershipPlan: {
    name: string;
    price: number;
    duration: string;
  };
  onPaymentComplete: () => void;
}

export const GcashPayment: React.FC<GcashPaymentProps> = ({
  gymName,
  gcashNumber,
  membershipPlan,
  onPaymentComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      referenceNumber: "",
      amount: membershipPlan.price.toString(),
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    // Here you would typically send this to your backend
    console.log("Payment details:", {
      ...data,
      gymName,
      gcashNumber,
      membershipPlan,
    });
    
    toast({
      title: "Payment Submitted",
      description: "Your payment has been submitted for verification.",
    });
    
    setIsOpen(false);
    onPaymentComplete();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Pay with GCash</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>GCash Payment</DialogTitle>
            <DialogDescription>
              Please send your payment to the following GCash number and enter the reference number below.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Gym: {gymName}</p>
              <p className="text-sm font-medium">GCash Number: {gcashNumber}</p>
              <p className="text-sm font-medium">
                Plan: {membershipPlan.name} ({membershipPlan.duration})
              </p>
              <p className="text-sm font-medium">
                Amount: ₱{membershipPlan.price.toFixed(2)}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="referenceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GCash Reference Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the reference number from your GCash payment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Payment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}; 