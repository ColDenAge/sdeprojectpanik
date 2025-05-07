import React, { useContext } from "react";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { RoleContext } from "../router/App";

const FAQs = () => {
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  const faqs = [
    {
      question: "What is ByteMinds Systems?",
      answer: "ByteMinds Systems is a comprehensive gym management platform that helps gym owners manage their facilities and members track their fitness journey. Our platform offers features for membership management, class scheduling, payment processing, and more."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply sign up for an account, choose your role (gym owner or member), and follow the setup wizard. Our intuitive interface will guide you through the process of setting up your profile and accessing the features you need."
    },
    {
      question: "What features are available for gym owners?",
      answer: "Gym owners have access to a wide range of features including member management, class scheduling, equipment tracking, payment processing, attendance monitoring, and detailed analytics to help grow their business."
    },
    {
      question: "What features are available for members?",
      answer: "Members can book classes, track their attendance, view their membership details, make payments, monitor their fitness progress, and communicate with gym staff through our platform."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. Our platform uses industry-standard encryption and security measures to protect your personal and financial information. We regularly update our security protocols to ensure the highest level of protection."
    },
    {
      question: "How can I get support?",
      answer: "We offer multiple support channels including email support, live chat, and a comprehensive knowledge base. Our support team is available 24/7 to help you with any questions or issues you may have."
    }
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Heading Shape */}
        <div className="w-[756px] h-[127px] bg-[url('/blue-shape.svg')] bg-cover relative mb-12">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] text-black font-bold text-5xl font-cairo">
            FAQs
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-xl font-semibold text-[#0B294B] mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
