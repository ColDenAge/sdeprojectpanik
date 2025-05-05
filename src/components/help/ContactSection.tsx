
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex flex-col items-center p-6 text-center">
            <Phone className="h-10 w-10 text-[#0B294B] mb-4" />
            <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              Available Monday-Friday, 9AM-5PM
            </p>
            <p className="font-medium">+1 (555) 123-4567</p>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center">
            <Mail className="h-10 w-10 text-[#0B294B] mb-4" />
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              We usually respond within 24 hours
            </p>
            <p className="font-medium">support@byteminds.com</p>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center">
            <MessageCircle className="h-10 w-10 text-[#0B294B] mb-4" />
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">
              Available 24/7 for urgent issues
            </p>
            <button className="bg-[#0B294B] text-white px-4 py-2 rounded-lg hover:bg-[#0a2544] transition-colors">
              Start Chat
            </button>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
