
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Play, FileText } from "lucide-react";

interface GuidesSectionProps {
  userRole: string;
}

const GuidesSection: React.FC<GuidesSectionProps> = ({ userRole }) => {
  // Different guides for different user roles
  const guides = userRole === "member" ? memberGuides : managerGuides;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guides & Tutorials</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((guide, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-slate-100 p-4 flex justify-center items-center">
                {guide.icon === "video" ? (
                  <Play className="h-12 w-12 text-[#0B294B]" />
                ) : guide.icon === "doc" ? (
                  <FileText className="h-12 w-12 text-[#0B294B]" />
                ) : (
                  <BookOpen className="h-12 w-12 text-[#0B294B]" />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
                <button className="mt-4 text-[#0B294B] font-medium hover:underline inline-flex items-center">
                  View Guide <span className="ml-1">→</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Guides for gym members
const memberGuides = [
  {
    title: "Getting Started Guide",
    description: "Learn how to make the most of your gym membership with this comprehensive guide.",
    icon: "book"
  },
  {
    title: "Mobile App Tutorial",
    description: "Step-by-step video tutorial on how to use all features of our mobile app.",
    icon: "video"
  },
  {
    title: "Fitness Tracking Guide",
    description: "Learn how to track your fitness progress and set achievable goals.",
    icon: "doc"
  },
  {
    title: "Booking Classes Tutorial",
    description: "Video guide on how to browse and book fitness classes through our system.",
    icon: "video"
  },
  {
    title: "Managing Your Account",
    description: "Documentation on updating your profile, payment methods, and preferences.",
    icon: "doc"
  },
  {
    title: "Gym Equipment Guide",
    description: "Detailed instructions for using all equipment available in our facilities.",
    icon: "book"
  }
];

// Guides for gym managers
const managerGuides = [
  {
    title: "Admin Dashboard Guide",
    description: "Comprehensive overview of all management features in the admin dashboard.",
    icon: "book"
  },
  {
    title: "Member Management Tutorial",
    description: "Video tutorial on how to add, edit, and manage gym members.",
    icon: "video"
  },
  {
    title: "Financial Reports Guide",
    description: "Learn how to generate and interpret financial reports for your gym.",
    icon: "doc"
  },
  {
    title: "Class Scheduling Tutorial",
    description: "Video demonstration of setting up and managing fitness classes.",
    icon: "video"
  },
  {
    title: "Staff Management Guide",
    description: "Documentation on adding staff accounts and setting permissions.",
    icon: "doc"
  },
  {
    title: "Marketing Tools Guide",
    description: "Learn how to use built-in tools to promote your gym and increase membership.",
    icon: "book"
  }
];

export default GuidesSection;
