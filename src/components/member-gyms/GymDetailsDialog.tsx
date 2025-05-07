
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Gym, GymClass } from "./types/gymTypes";
import EnrollClassDialog from "./EnrollClassDialog";

interface GymDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gym: Gym | null;
  onEnrollClass: (classItem: GymClass) => void;
}

const GymDetailsDialog: React.FC<GymDetailsDialogProps> = ({
  isOpen,
  onClose,
  gym,
  onEnrollClass
}) => {
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);

  const handleEnrollClick = (classItem: GymClass) => {
    setSelectedClass(classItem);
    setEnrollDialogOpen(true);
  };

  const handleEnrollConfirm = () => {
    if (selectedClass) {
      onEnrollClass(selectedClass);
    }
    setEnrollDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">{gym?.name}</DialogTitle>
            <p className="text-sm text-muted-foreground">{gym?.location}</p>
          </DialogHeader>
          
          {gym && (
            <div className="flex-grow overflow-hidden">
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
                          <Button 
                            variant="outline" 
                            className="text-[#0B294B] border-[#0B294B] hover:bg-[#0B294B]/10"
                            disabled={cls.enrolled >= cls.capacity}
                            onClick={() => handleEnrollClick(cls)}
                          >
                            {cls.enrolled >= cls.capacity ? "Full" : "Enroll"}
                          </Button>
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
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <EnrollClassDialog
        open={enrollDialogOpen}
        selectedClass={selectedClass}
        onClose={() => setEnrollDialogOpen(false)}
        onConfirm={handleEnrollConfirm}
      />
    </>
  );
};

export default GymDetailsDialog;
