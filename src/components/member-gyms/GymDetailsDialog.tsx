
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gym } from "./types/gymTypes";
import GymDetailsTabs from "./GymDetailsTabs";

interface GymDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gym: Gym | null;
}

const GymDetailsDialog: React.FC<GymDetailsDialogProps> = ({
  isOpen,
  onClose,
  gym
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">{gym?.name}</DialogTitle>
          <p className="text-sm text-muted-foreground">{gym?.location}</p>
        </DialogHeader>
        
        {gym && (
          <div className="flex-grow overflow-hidden">
            <GymDetailsTabs gym={gym} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GymDetailsDialog;
