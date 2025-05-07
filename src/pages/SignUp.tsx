import React, { useEffect } from "react";
import Navbar from "@/components/homepage/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

// Define form schema with validation rules
const signUpFormSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
    .min(1, "Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const SignUp = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();

  // Redirect to /choice if no role is selected
  useEffect(() => {
    if (!role) {
      navigate("/choice", { replace: true });
    }
  }, [role, navigate]);

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      if (!role) return; // Just in case
      await signUp(data.email, data.password, role);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Sign up error:", error); // Log the error for debugging
      let errorMessage = "Failed to create account. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please use a different email or try logging in.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message && error.message.includes("PERMISSION_DENIED")) {
        errorMessage = "Permission denied. Please contact support.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
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
            Sign Up
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#0B294B] mb-6 text-center">Create Your Account</h2>
            
            {role && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800">
                  Signing up as: <span className="font-semibold capitalize">{role.replace("_", " ")}</span>
                </p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B294B]">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email" 
                          {...field} 
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B294B]">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B294B]">Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm your password" 
                          {...field} 
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#0B294B] hover:bg-[#0a2544]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Creating Account..." : "Sign Up"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-6">
              <p className="text-[#0B294B]">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
