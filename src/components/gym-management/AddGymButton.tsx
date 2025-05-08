
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddGymButtonProps {
  onAddGym: () => void;
}

const AddGymButton: React.FC<AddGymButtonProps> = ({ onAddGym }) => {
  return (
    <div className="flex justify-end mb-4">
      <Button
        onClick={onAddGym}
        className="bg-[#0B294B] text-white rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Create New Gym</span>
      </Button>
    </div>
  );
};

export default AddGymButton;
