import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Gym, GymClass } from "./types/gymTypes";

interface GymDetailsTabsProps {
  gym: Gym;
  onEnrollClass: (classItem: GymClass) => void;
  canEnroll: boolean;
}

const GymDetailsTabs: React.FC<GymDetailsTabsProps> = ({ gym, onEnrollClass, canEnroll }) => {
  const [loading, setLoading] = useState(false);

  const handleEnrollClick = async (classItem: GymClass) => {
    setLoading(true);
    try {
      await onEnrollClass(classItem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="classes" className="h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
      </TabsList>

      <TabsContent value="classes" className="flex-grow overflow-hidden flex flex-col">
        <h3 className="text-lg font-medium mb-2">Available Classes</h3>
        <ScrollArea className="flex-grow rounded-md border p-4">
          {gym.classes && gym.classes.length > 0 ? (
            gym.classes.map((cls) => (
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
                  {canEnroll && (
                    <Button
                      variant="outline"
                      className="text-[#0B294B] border-[#0B294B] hover:bg-[#0B294B]/10"
                      disabled={cls.enrolled >= cls.capacity || loading}
                      onClick={() => handleEnrollClick(cls)}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : cls.enrolled >= cls.capacity ? (
                        "Full"
                      ) : (
                        "Enroll"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No classes available at the moment.
            </div>
          )}
        </ScrollArea>
      </TabsContent>

      <TabsContent value="amenities" className="flex-grow overflow-hidden flex flex-col">
        <h3 className="text-lg font-medium mb-4">Gym Amenities</h3>
        <ScrollArea className="flex-grow">
          {gym.amenities && gym.amenities.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {gym.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                  <div className="h-2 w-2 rounded-full bg-[#0B294B]"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No amenities listed for this gym.
            </div>
          )}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default GymDetailsTabs;
