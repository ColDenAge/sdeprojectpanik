
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/homepage/Navbar";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would normally send the form data to your backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#D9D9D9]">
      <div className="px-5 md:px-20 pt-[9px]">
        <Navbar />
      </div>

      <div className="flex flex-col items-center px-5 max-w-[1152px] mx-auto w-full pt-12 pb-24">
        <h1 className="text-slate-800 text-5xl font-bold tracking-wide mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-black text-base font-medium leading-6 mb-16 text-center max-w-[810px]">
          Have questions about our gym management software? Want to schedule a demo? Reach out to our team and we'll get back to you shortly.
        </p>

        <div className="w-full max-w-[800px] bg-white rounded-lg shadow-md p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-slate-700">
                Company (Optional)
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Your company name"
                value={formData.company}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[150px]"
              />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreeToTerms}
                  onCheckedChange={handleCheckboxChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-slate-700">
                  I agree to the privacy policy and terms of service
                </label>
              </div>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-[#0B294B] hover:bg-[#0B294B]/90 text-white py-3 rounded-md"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[800px]">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-slate-800 text-xl font-bold mb-3">Email</h3>
            <p className="text-black text-base">
              info@byteminds.com
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-slate-800 text-xl font-bold mb-3">Phone</h3>
            <p className="text-black text-base">
              +1 (123) 456-7890
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-slate-800 text-xl font-bold mb-3">Office</h3>
            <p className="text-black text-base">
              123 Main Street<br />
              New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
