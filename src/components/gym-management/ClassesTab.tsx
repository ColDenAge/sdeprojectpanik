
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditClassDialog } from "./dialogs/AddEditClassDialog";
import { EnrollMemberDialog } from "./dialogs/EnrollMemberDialog";
import { useToast } from "@/hooks/use-toast";
import ClassesTable from "./classes/ClassesTable";
import DeleteClassDialog from "./classes/DeleteClassDialog";
import { initialClassesData, availableMembers } from "./classes/classesData";

const ClassesTab = () => {
  const { searchTerm } = useSearch();
  const [classes, setClasses] = useState(initialClassesData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<undefined | typeof initialClassesData[0]>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<undefined | typeof initialClassesData[0]>(undefined);
  const { toast } = useToast();

  const filteredClasses = classes.filter((cls) => {
    const search = searchTerm.toLowerCase();
    return (
      cls.name.toLowerCase().includes(search) ||
      cls.instructor.toLowerCase().includes(search) ||
      cls.schedule.toLowerCase().includes(search)
    );
  });

  const handleAddClass = () => {
    setCurrentClass(undefined);
    setDialogOpen(true);
  };

  const handleEditClass = (cls: typeof initialClassesData[0]) => {
    setCurrentClass(cls);
    setDialogOpen(true);
  };

  const handleDeleteClass = (cls: typeof initialClassesData[0]) => {
    setClassToDelete(cls);
    setDeleteDialogOpen(true);
  };

  const handleEnrollMembers = (cls: typeof initialClassesData[0]) => {
    setCurrentClass(cls);
    setEnrollDialogOpen(true);
  };

  const confirmDeleteClass = () => {
    if (classToDelete) {
      setClasses(classes.filter(cls => cls.id !== classToDelete.id));
      toast({
        title: "Class Deleted",
        description: `${classToDelete.name} has been removed.`,
      });
    }
    setDeleteDialogOpen(false);
  };

  const handleSaveClass = (values: { name: string; instructor: string; schedule: string; capacity: string }) => {
    if (currentClass) {
      // Edit existing class
      setClasses(
        classes.map((item) =>
          item.id === currentClass.id
            ? { ...item, ...values }
            : item
        )
      );
      toast({
        title: "Class Updated",
        description: `${values.name} has been updated.`,
      });
    } else {
      // Add new class
      const newClass = {
        id: `${classes.length + 1}`,
        ...values,
        enrolled: "0",
        enrolledMembers: []
      };
      setClasses([...classes, newClass]);
      toast({
        title: "Class Added",
        description: `${values.name} has been added.`,
      });
    }
  };

  const handleSaveEnrollment = (selectedMemberIds: string[]) => {
    if (currentClass) {
      const updatedClasses = classes.map(cls => {
        if (cls.id === currentClass.id) {
          // Get all members that match the selected IDs
          const newEnrolledMembers = availableMembers.filter(member => 
            selectedMemberIds.includes(member.id)
          );
          
          return {
            ...cls,
            enrolledMembers: newEnrolledMembers,
            enrolled: `${selectedMemberIds.length}`
          };
        }
        return cls;
      });
      
      setClasses(updatedClasses);
      toast({
        title: "Enrollment Updated",
        description: `Enrollment for ${currentClass.name} has been updated.`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Gym Classes</h3>
        <Button 
          onClick={handleAddClass}
          className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>
      
      <ClassesTable 
        filteredClasses={filteredClasses}
        onEditClass={handleEditClass}
        onDeleteClass={handleDeleteClass}
        onEnrollMembers={handleEnrollMembers}
      />

      <AddEditClassDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        class={currentClass}
        onSave={handleSaveClass}
      />

      <EnrollMemberDialog
        open={enrollDialogOpen}
        onOpenChange={setEnrollDialogOpen}
        class={currentClass}
        availableMembers={availableMembers}
        onSave={handleSaveEnrollment}
        currentlyEnrolled={currentClass?.enrolledMembers?.map(m => m.id) || []}
      />

      <DeleteClassDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        classToDelete={classToDelete}
        onConfirmDelete={confirmDeleteClass}
      />
    </div>
  );
};

export default ClassesTab;
