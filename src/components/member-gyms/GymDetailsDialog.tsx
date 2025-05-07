
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gym, GymClass } from "./types/gymTypes";
import EnrollClassDialog from "./EnrollClassDialog";
import GymDetailsTabs from "./GymDetailsTabs";

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
              <GymDetailsTabs
                gym={gym}
                onEnrollClass={handleEnrollClick}
              />
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
