
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/homepage/Navbar";

const FAQs: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen bg-[#D9D9D9]">
      <div className="px-5 md:px-20 pt-[9px]">
        <Navbar />
      </div>

      <div className="flex flex-col items-center px-5 max-w-[1152px] mx-auto w-full pt-12 pb-24">
        <h1 className="text-slate-800 text-5xl font-bold tracking-wide mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-500 text-base font-medium leading-6 mb-16 text-center max-w-[810px]">
          Have questions about ByteMinds Systems or our gym management software? Find answers to common queries below.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-gray-300">
            <AccordionTrigger className="text-slate-800 text-xl font-bold py-6 hover:no-underline">
              What is ByteMinds Systems?
            </AccordionTrigger>
            <AccordionContent className="text-stone-500 text-base font-medium leading-6 pb-6">
              ByteMinds Systems is a comprehensive gym management software solution that helps fitness centers streamline operations, manage memberships, process payments, and enhance member experiences through an integrated digital platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-gray-300">
            <AccordionTrigger className="text-slate-800 text-xl font-bold py-6 hover:no-underline">
              How does the membership management work?
            </AccordionTrigger>
            <AccordionContent className="text-stone-500 text-base font-medium leading-6 pb-6">
              Our membership management system allows gym owners to easily enroll new members, track membership status, manage renewals, and customize membership packages. Members can sign up online or through in-person kiosks, using any device including laptops, tablets, or mobile phones.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-gray-300">
            <AccordionTrigger className="text-slate-800 text-xl font-bold py-6 hover:no-underline">
              Is there a mobile app for members?
            </AccordionTrigger>
            <AccordionContent className="text-stone-500 text-base font-medium leading-6 pb-6">
              Yes, we offer a mobile app for both iOS and Android platforms. Members can use the app to book classes, track their workouts, manage their account, make payments, and communicate with trainers or gym staff.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-gray-300">
            <AccordionTrigger className="text-slate-800 text-xl font-bold py-6 hover:no-underline">
              How secure is the payment processing?
            </AccordionTrigger>
            <AccordionContent className="text-stone-500 text-base font-medium leading-6 pb-6">
              We employ industry-standard security protocols including SSL encryption, PCI DSS compliance, and secure payment gateways to ensure that all financial transactions are protected. We never store sensitive credit card details on our servers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b border-gray-300">
            <AccordionTrigger className="text-slate-800 text-xl font-bold py-6 hover:no-underline">
              Can I integrate ByteMinds with my existing systems?
            </AccordionTrigger>
            <AccordionContent className="text-stone-500 text-base font-medium leading-6 pb-6">
              Yes, ByteMinds Systems offers API integration capabilities that allow you to connect with your existing business tools including accounting software, marketing platforms, and access control systems. Our team can provide assistance with custom integrations as needed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-b border-gray-300">
            <AccordionTrigger className="text-slate-800 text-xl font-bold py-6 hover:no-underline">
              What kind of support do you offer?
            </AccordionTrigger>
            <AccordionContent className="text-stone-500 text-base font-medium leading-6 pb-6">
              We provide comprehensive support including 24/7 technical assistance, regular software updates, training resources, and a dedicated account manager for enterprise clients. Our knowledge base and video tutorials are also available to help you make the most of our platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-b border-gray-300">
            <AccordionTrigger className="text-slate-800 text-xl font-bold py-6 hover:no-underline">
              How do automatic notifications work?
            </AccordionTrigger>
            <AccordionContent className="text-stone-500 text-base font-medium leading-6 pb-6">
              Our system sends automatic notifications to members regarding payment deadlines, membership renewals, class bookings, and special promotions. Gym owners can customize these notifications and choose delivery methods including email, SMS, push notifications, or in-app alerts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
};

export default FAQs;
