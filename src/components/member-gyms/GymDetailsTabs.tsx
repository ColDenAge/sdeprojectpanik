
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { Gym } from "./types/gymTypes";

interface GymDetailsTabsProps {
  gym: Gym;
}

const GymDetailsTabs: React.FC<GymDetailsTabsProps> = ({ gym }) => {
  return (
    <Tabs defaultValue="classes" className="h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
      </TabsList>
      
      <TabsContent value="classes" className="flex-grow overflow-hidden flex flex-col">
        <h3 className="text-lg font-medium mb-2">Available Classes</h3>
        <ScrollArea className="flex-grow rounded-md border p-4">
          {gym.classes.map((cls) => (
            <div key={cls.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{cls.name}</h4>
                  <p className="text-sm text-muted-foreground">Instructor: {cls.instructor}</p>
                  <p className="text-sm flex items-center gap-1 mt-1">
                    <CalendarIcon className="h-3 w-3" /> {cls.schedule}
                  </p>
                  <p className="text-sm mt-1">
                    Availability: {cls.enrolled}/{cls.capacity}
                  </p>
                </div>
                <p className="text-sm italic text-muted-foreground">
                  Apply for membership to enroll
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
      
      <TabsContent value="amenities" className="flex-grow overflow-hidden flex flex-col">
        <h3 className="text-lg font-medium mb-4">Gym Amenities</h3>
        <ScrollArea className="flex-grow">
          <div className="grid grid-cols-2 gap-2">
            {gym.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                <div className="h-2 w-2 rounded-full bg-[#0B294B]"></div>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default GymDetailsTabs;
