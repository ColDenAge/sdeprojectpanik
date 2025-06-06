
import React from "react";
import Navbar from "@/components/homepage/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const ForgotPassword = (): JSX.Element => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    console.log(data);
    
    // Show toast that reset link has been sent
    toast({
      title: "Reset link sent!",
      description: "Check your email for the password reset link.",
    });
    
    // For demo purposes, navigate to change password page
    // In a real app, this would typically happen after clicking a link in the email
    setTimeout(() => {
      navigate("/change-password");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Navigation Bar */}
      <div className="w-full px-6 py-4">
        <Navbar />
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Heading Shape */}
        <div className="w-[756px] h-[127px] bg-[url('/blue-shape.svg')] bg-cover relative mb-12">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] text-black font-bold text-5xl font-cairo">
            Reset
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#0B294B] mb-6 text-center">Reset Your Password</h2>
            <p className="text-center text-[#0B294B] mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B294B]">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-[#0B294B] hover:bg-[#0a2544]">
                  Send Reset Link
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-6">
              <p className="text-[#0B294B]">
                Remember your password?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
