
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Navbar from "@/components/homepage/Navbar";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long.",
  }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real application, you would handle form submission here
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="px-5 md:px-20 pt-[9px]">
        <Navbar />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B294B] mb-4">Get In Touch</h1>
          <p className="text-[#333] text-lg max-w-2xl mx-auto">
            Have questions about our gym management software? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-[#0B294B] mb-6">Send us a message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Type your message here..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0B294B] hover:bg-[#0B294B]/90 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-[#0B294B] mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#0B294B]/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-[#0B294B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#0B294B]">Phone</h3>
                    <p className="text-[#333]">+1 (123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0B294B]/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-[#0B294B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#0B294B]">Email</h3>
                    <p className="text-[#333]">info@byteminds.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0B294B]/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-[#0B294B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#0B294B]">Location</h3>
                    <p className="text-[#333]">
                      123 Main Street<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0B294B]/10 p-3 rounded-full mr-4">
                    <MessageSquare className="h-6 w-6 text-[#0B294B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#0B294B]">Office Hours</h3>
                    <p className="text-[#333]">
                      Monday - Friday<br />
                      9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
