
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQSectionProps {
  userRole: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ userRole }) => {
  // Different FAQs for different user roles
  const faqs = userRole === "member" ? memberFAQs : managerFAQs;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

// FAQs for gym members
const memberFAQs = [
  {
    question: "How do I update my membership plan?",
    answer: "You can update your membership plan by navigating to the 'Billings' page and selecting 'Change Plan' under your current subscription."
  },
  {
    question: "Can I freeze my membership temporarily?",
    answer: "Yes, you can freeze your membership for up to 30 days per year. Go to 'Account Settings' and select 'Freeze Membership' option."
  },
  {
    question: "How do I book a fitness class?",
    answer: "To book a class, go to the 'Dashboard' page and scroll down to the 'Upcoming Classes' section. Click on any class and select 'Book Now'."
  },
  {
    question: "How can I track my fitness progress?",
    answer: "Your fitness progress is tracked automatically when you check in to the gym. You can view detailed statistics on the 'Dashboard' page."
  },
  {
    question: "How do I update my payment method?",
    answer: "You can update your payment method by going to the 'Billings' page and selecting 'Payment Methods'. Click 'Add New' to add a new payment method."
  }
];

// FAQs for gym managers
const managerFAQs = [
  {
    question: "How do I add a new membership plan?",
    answer: "To add a new membership plan, go to 'Settings', then 'Membership Plans', and click on 'Add New Plan'. Fill out the required information and click 'Save'."
  },
  {
    question: "How can I generate reports on gym usage?",
    answer: "You can generate usage reports by going to the 'Dashboard' page and clicking on 'Reports'. Select the time period and metrics you want to include."
  },
  {
    question: "How do I manage staff access?",
    answer: "To manage staff access, go to 'Settings', then 'Staff Management'. From there, you can add new staff members, edit permissions, or deactivate accounts."
  },
  {
    question: "How do I set up automated member communications?",
    answer: "To set up automated communications, go to 'Settings', then 'Communications'. You can create email templates and set up triggers for automated messages."
  },
  {
    question: "How do I process a refund for a member?",
    answer: "To process a refund, go to 'Members', find the member's profile, click on 'Billing History', and select the transaction you want to refund. Click 'Issue Refund' and confirm."
  }
];

export default FAQSection;
