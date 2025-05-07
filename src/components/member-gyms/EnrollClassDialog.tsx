
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GymClass } from "./types/gymTypes";

interface EnrollClassDialogProps {
  open: boolean;
  selectedClass: GymClass | null;
  onClose: () => void;
  onConfirm: () => void;
}

const EnrollClassDialog: React.FC<EnrollClassDialogProps> = ({
  open,
  selectedClass,
  onClose,
  onConfirm
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enroll in Class</DialogTitle>
        </DialogHeader>
        
        {selectedClass && (
          <div className="py-4">
            <h3 className="font-medium text-lg">{selectedClass.name}</h3>
            <p className="text-sm text-muted-foreground mt-2">Instructor: {selectedClass.instructor}</p>
            <p className="text-sm text-muted-foreground mt-1">Schedule: {selectedClass.schedule}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Available Spots: {selectedClass.capacity - selectedClass.enrolled}/{selectedClass.capacity}
            </p>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-md">
              <p className="text-sm">
                By enrolling in this class, you agree to attend or cancel at least 24 hours in advance. 
                Please arrive 10 minutes before the class starts.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-[#0B294B] text-white hover:bg-[#0a2544]">
            Confirm Enrollment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollClassDialog;
