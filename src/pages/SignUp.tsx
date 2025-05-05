
import React from "react";
import Navbar from "@/components/homepage/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = (): JSX.Element => {
  const form = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    // In a real app, you would register the user here
    // For now, we'll just navigate to the choice page
    navigate("/choice");
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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B294B]">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B294B]">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
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
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
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
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-[#0B294B] hover:bg-[#0a2544]">
                  Sign Up
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
