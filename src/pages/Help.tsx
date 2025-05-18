import React, { useContext, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RoleContext } from "../router/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Activity, Calendar, HelpCircle, Mail, Phone, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  const { userRole } = useContext(RoleContext);
  const [activeTab, setActiveTab] = useState("getting-started");

  const helpTopics = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of using ByteMinds Systems",
      icon: <HelpCircle className="h-8 w-8" />,
      content: {
        faqs: [
          {
            question: "How do I get started with ByteMinds?",
            answer: "To get started, simply sign up for an account and choose your role (Gym Member or Gym Manager). Follow the onboarding process to set up your profile and preferences."
          },
          {
            question: "What are the main features available?",
            answer: "ByteMinds offers features like gym management, class booking, membership management, payment processing, and detailed analytics for gym managers."
          }
        ]
      }
    },
    {
      id: "account-management",
      title: "Account Management",
      description: "Manage your account settings and preferences",
      icon: <Users className="h-8 w-8" />,
      content: {
        faqs: [
          {
            question: "How do I update my profile information?",
            answer: "Go to Account Settings > Profile to update your personal information, profile picture, and preferences."
          },
          {
            question: "How can I change my password?",
            answer: "Navigate to Account Settings > Security to change your password. Make sure to use a strong password and enable two-factor authentication for better security."
          }
        ]
      }
    },
    {
      id: "membership",
      title: "Membership",
      description: "Information about membership plans and benefits",
      icon: <Building2 className="h-8 w-8" />,
      content: {
        faqs: [
          {
            question: "What membership plans are available?",
            answer: "We offer various membership plans including Basic, Premium, and Elite. Each plan comes with different benefits and access levels."
          },
          {
            question: "How do I upgrade my membership?",
            answer: "You can upgrade your membership at any time through the Membership section. Select your desired plan and follow the upgrade process."
          }
        ]
      }
    },
    {
      id: "class-booking",
      title: "Class Booking",
      description: "How to book and manage your classes",
      icon: <Calendar className="h-8 w-8" />,
      content: {
        faqs: [
          {
            question: "How do I book a class?",
            answer: "Browse available classes in the Classes section, select your preferred class, and click 'Book Now'. You'll receive a confirmation email."
          },
          {
            question: "Can I cancel a booked class?",
            answer: "Yes, you can cancel a class up to 24 hours before the scheduled time through the My Bookings section."
          }
        ]
      }
    },
    {
      id: "payment-billing",
      title: "Payment & Billing",
      description: "Manage your payments and billing information",
      icon: <Activity className="h-8 w-8" />,
      content: {
        faqs: [
          {
            question: "What payment methods are accepted?",
            answer: "We accept major credit cards, debit cards, and PayPal. All payments are processed securely."
          },
          {
            question: "How do I update my billing information?",
            answer: "Go to Account Settings > Billing to update your payment methods and billing address."
          }
        ]
      }
    },
    {
      id: "technical-support",
      title: "Technical Support",
      description: "Get help with technical issues",
      icon: <HelpCircle className="h-8 w-8" />,
      content: {
        faqs: [
          {
            question: "What should I do if I encounter technical issues?",
            answer: "First, try clearing your browser cache and refreshing the page. If the issue persists, contact our technical support team."
          },
          {
            question: "How do I report a bug?",
            answer: "Use the 'Report Issue' button in the Help section or contact our support team directly."
          }
        ]
      }
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Help Center</h1>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic) => (
            <Card
              key={topic.id}
              className={`hover:shadow-lg transition-shadow cursor-pointer ${activeTab === topic.id ? 'border-[#0B294B]' : ''}`}
              onClick={() => handleTabChange(topic.id)}
            >
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

        {/* Content Section */}
        <Card>
          <CardContent className="p-6">
            {helpTopics.map((topic) => (
              <div key={topic.id} className={activeTab === topic.id ? 'block' : 'hidden'}>
                <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {topic.content.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </CardContent>
        </Card>

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
