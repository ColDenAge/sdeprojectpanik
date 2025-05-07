
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { Gym, GymClass, MembershipOption } from "./types/gymTypes";

interface GymDetailsContentProps {
  gym: Gym;
  hasApplied: boolean;
  onEnrollClass: (gymClass: GymClass) => void;
  onSelectMembership: (membership: MembershipOption) => void;
}

const GymDetailsContent: React.FC<GymDetailsContentProps> = ({
  gym,
  hasApplied,
  onEnrollClass,
  onSelectMembership
}) => {
  return (
    <Tabs defaultValue="classes">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="memberships">Memberships</TabsTrigger>
      </TabsList>
      
      <TabsContent value="classes" className="space-y-4 py-4">
        <h3 className="text-lg font-medium">Available Classes</h3>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {gym.classes.map((cls) => (
            <div key={cls.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{cls.name}</h4>
                  <p className="text-sm text-muted-foreground">Instructor: {cls.instructor}</p>
                  <p className="text-sm flex items-center gap-1 mt-1">
                    <CalendarIcon className="h-3 w-3" /> {cls.schedule}
                  </p>
                  <p className="text-sm mt-1">Availability: {cls.enrolled}/{cls.capacity}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="text-[#0B294B] border-[#0B294B] hover:bg-[#0B294B]/10"
                  disabled={cls.enrolled >= cls.capacity}
                  onClick={() => onEnrollClass(cls)}
                >
                  {cls.enrolled >= cls.capacity ? "Full" : "Enroll"}
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
      
      <TabsContent value="amenities" className="py-4">
        <h3 className="text-lg font-medium mb-4">Gym Amenities</h3>
        <div className="grid grid-cols-2 gap-2">
          {gym.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
              <div className="h-2 w-2 rounded-full bg-[#0B294B]"></div>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="memberships" className="py-4">
        <h3 className="text-lg font-medium mb-4">Membership Plans</h3>
        <div className="space-y-4">
          {gym.membershipOptions.map((membership) => (
            <div key={membership.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{membership.name}</h4>
                <p className="text-sm text-muted-foreground">{membership.price}</p>
              </div>
              <Button 
                variant="outline" 
                className="text-[#0B294B] border-[#0B294B] hover:bg-[#0B294B]/10"
                onClick={() => onSelectMembership(membership)}
                disabled={hasApplied}
              >
                {hasApplied ? "Applied" : "Select"}
              </Button>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GymDetailsContent;
