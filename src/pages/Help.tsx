import React, { useContext } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RoleContext } from "../router/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Activity, Calendar, HelpCircle, Mail, Phone, MessageSquare } from "lucide-react";

const Help = () => {
  const { userRole } = useContext(RoleContext);

  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn the basics of using ByteMinds Systems",
      icon: <HelpCircle className="h-8 w-8" />
    },
    {
      title: "Account Management",
      description: "Manage your account settings and preferences",
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "Membership",
      description: "Information about membership plans and benefits",
      icon: <Building2 className="h-8 w-8" />
    },
    {
      title: "Class Booking",
      description: "How to book and manage your classes",
      icon: <Calendar className="h-8 w-8" />
    },
    {
      title: "Payment & Billing",
      description: "Manage your payments and billing information",
      icon: <Activity className="h-8 w-8" />
    },
    {
      title: "Technical Support",
      description: "Get help with technical issues",
      icon: <HelpCircle className="h-8 w-8" />
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Help Center</h1>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center mb-4">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#0B294B] mb-2">{topic.title}</h3>
                <p className="text-gray-700">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Our support team is available 24/7 to assist you with any questions or issues you may have.
              Contact us through any of the following channels:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-[#0B294B]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B294B]">Email Support</h3>
                  <p className="text-gray-700">support@byteminds.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#0B294B]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B294B]">Phone Support</h3>
                  <p className="text-gray-700">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-[#0B294B]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B294B]">Live Chat</h3>
                  <p className="text-gray-700">Available 24/7</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Help;
