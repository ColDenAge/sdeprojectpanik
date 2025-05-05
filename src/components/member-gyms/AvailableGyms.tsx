
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";

// Mock data for available gyms
const availableGyms = [
  {
    id: 1,
    name: "FitLife Downtown",
    location: "123 Main St, Downtown",
    amenities: "Pool, Sauna, 24/7 Access",
    membershipOptions: "Standard, Premium, Premium Plus",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    name: "Elite Fitness Center",
    location: "456 Park Ave, Westside",
    amenities: "Classes, Personal Training, Nutrition Counseling",
    membershipOptions: "Basic, Standard, Premium",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
  },
  {
    id: 3,
    name: "PowerLift Gym",
    location: "789 Strong Blvd, Eastside",
    amenities: "Weightlifting, Powerlifting Equipment, Protein Bar",
    membershipOptions: "Monthly, Quarterly, Annual",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

const AvailableGyms = () => {
  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Explore Available Gyms
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGyms.map((gym) => (
            <Card key={gym.id} className="overflow-hidden border border-border">
              <div className="h-48 overflow-hidden">
                <img 
                  src={gym.image} 
                  alt={gym.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{gym.name}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {gym.location}
                </p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">AMENITIES</p>
                    <p className="text-sm">{gym.amenities}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">MEMBERSHIP OPTIONS</p>
                    <p className="text-sm">{gym.membershipOptions}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <button className="text-[#0B294B] font-medium hover:underline">View Details</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableGyms;
