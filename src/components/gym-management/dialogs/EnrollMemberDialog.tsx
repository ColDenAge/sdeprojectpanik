
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EnrollMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  class?: {
    id: string;
    name: string;
    capacity: string;
  };
  availableMembers: { id: string; name: string }[];
  currentlyEnrolled: string[];
  onSave: (selectedMemberIds: string[]) => void;
}

export function EnrollMemberDialog({ 
  open, 
  onOpenChange, 
  class: gymClass, 
  availableMembers,
  currentlyEnrolled,
  onSave 
}: EnrollMemberDialogProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initialize with currently enrolled members when dialog opens
    if (open && currentlyEnrolled) {
      setSelectedMembers([...currentlyEnrolled]);
    }
  }, [open, currentlyEnrolled]);

  const handleSubmit = () => {
    onSave(selectedMembers);
    onOpenChange(false);
  };

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const filteredMembers = availableMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const capacity = gymClass ? parseInt(gymClass.capacity) : 0;
  const isAtCapacity = selectedMembers.length >= capacity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {gymClass ? `Manage Enrollment: ${gymClass.name}` : "Manage Enrollment"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Enrollment: {selectedMembers.length}/{gymClass?.capacity || 0}</span>
            {isAtCapacity && (
              <span className="text-xs text-red-500">Class at capacity</span>
            )}
          </div>
          
          <Input 
            placeholder="Search members..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          
          <ScrollArea className="h-[200px] border rounded-md p-2">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-2 py-2 px-1 hover:bg-muted/30 rounded"
                >
                  <Checkbox 
                    id={`member-${member.id}`}
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => toggleMember(member.id)}
                    disabled={isAtCapacity && !selectedMembers.includes(member.id)}
                  />
                  <label
                    htmlFor={`member-${member.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {member.name}
                  </label>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No members found
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
          >
            Save Enrollment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
