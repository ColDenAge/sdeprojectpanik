
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CreditCard, Trash2 } from "lucide-react";

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
          {paymentMethods.map((method) => (
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
              <button 
                className="text-destructive hover:bg-destructive/10 p-1 rounded-full transition-colors"
                aria-label="Remove payment method"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 border border-dashed rounded-md flex items-center justify-center gap-2 text-muted-foreground hover:bg-muted/20 transition-colors">
          <CreditCard className="h-4 w-4" />
          <span>Add New Card</span>
        </button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
