
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CreditCard, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Mock data for payment methods
const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    lastFour: "4242",
    expiry: "05/25",
    isDefault: true
  },
  {
    id: 2,
    type: "Mastercard",
    lastFour: "5555",
    expiry: "08/24",
    isDefault: false
  }
];

const PaymentMethods = () => {
  const [methods, setMethods] = useState(paymentMethods);
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const handleDeleteCard = (id: number) => {
    // Filter out the deleted card
    setMethods(methods.filter(method => method.id !== id));
    
    toast({
      title: "Payment method removed",
      description: "The payment method has been successfully removed.",
    });
  };

  const handleSetDefault = (id: number) => {
    setMethods(methods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    });
  };

  const onSubmit = (data: any) => {
    // In a real application, this would send data to a payment processor
    
    // Extract last 4 digits from card number
    const lastFour = data.cardNumber.slice(-4);
    
    // Determine card type based on first digit
    let cardType = "Credit Card";
    const firstDigit = data.cardNumber.charAt(0);
    if (firstDigit === "4") cardType = "Visa";
    else if (firstDigit === "5") cardType = "Mastercard";
    else if (firstDigit === "3") cardType = "Amex";
    else if (firstDigit === "6") cardType = "Discover";
    
    // Create a new payment method object
    const newMethod = {
      id: Date.now(),
      type: cardType,
      lastFour,
      expiry: data.expiryDate,
      isDefault: methods.length === 0 // Make default if it's the first card
    };
    
    // Add the new method to the list
    setMethods([...methods, newMethod]);
    
    // Reset form
    form.reset();
    
    // Show success message
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {methods.map((method) => (
            <div 
              key={method.id} 
              className="flex justify-between items-center p-4 border rounded-md bg-white hover:bg-muted/20 transition-colors"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{method.type} •••• {method.lastFour}</span>
                  {method.isDefault && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">Expires {method.expiry}</span>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-[#0B294B] text-sm hover:underline"
                  >
                    Set Default
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteCard(method.id)}
                  className="text-destructive hover:bg-destructive/10 p-1 rounded-full transition-colors"
                  aria-label="Remove payment method"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full mt-4 py-2 border border-dashed rounded-md flex items-center justify-center gap-2 text-muted-foreground hover:bg-muted/20 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add New Card</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Enter your card details to add a new payment method.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="4242 4242 4242 4242" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">Add Card</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
