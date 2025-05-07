
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "./SearchContext";
import { AddEditClassDialog } from "./dialogs/AddEditClassDialog";
import { EnrollMemberDialog } from "./dialogs/EnrollMemberDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const classesData = [
  {
    id: "1",
    name: "Yoga Basics",
    instructor: "Sarah Johnson",
    schedule: "Mon, Wed, Fri 6:00 PM - 7:00 PM",
    capacity: "20",
    enrolled: "14",
    enrolledMembers: [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" }
    ]
  },
  {
    id: "2",
    name: "HIIT Workout",
    instructor: "Michael Torres",
    schedule: "Tue, Thu 7:00 AM - 8:00 AM",
    capacity: "15",
    enrolled: "12",
    enrolledMembers: [
      { id: "3", name: "Robert Johnson" },
    ]
  },
  {
    id: "3",
    name: "Spinning",
    instructor: "Jessica Smith",
    schedule: "Mon, Wed, Fri 8:00 AM - 9:00 AM",
    capacity: "25",
    enrolled: "22",
    enrolledMembers: [
      { id: "4", name: "Emily Davis" },
      { id: "5", name: "Michael Wilson" }
    ]
  },
];

const availableMembers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Robert Johnson" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "Michael Wilson" },
  { id: "6", name: "Sarah Thompson" },
  { id: "7", name: "David Miller" },
  { id: "8", name: "Jennifer Martinez" },
];

const ClassesTab = () => {
  const { searchTerm } = useSearch();
  const [classes, setClasses] = useState(classesData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<undefined | typeof classesData[0]>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<undefined | typeof classesData[0]>(undefined);
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

  const handleEditClass = (cls: typeof classesData[0]) => {
    setCurrentClass(cls);
    setDialogOpen(true);
  };

  const handleDeleteClass = (cls: typeof classesData[0]) => {
    setClassToDelete(cls);
    setDeleteDialogOpen(true);
  };

  const handleEnrollMembers = (cls: typeof classesData[0]) => {
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
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left text-sm font-medium">Class Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Instructor</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Schedule</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Enrollment</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm">{cls.name}</td>
                  <td className="px-4 py-3 text-sm">{cls.instructor}</td>
                  <td className="px-4 py-3 text-sm">{cls.schedule}</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant={parseInt(cls.enrolled) >= parseInt(cls.capacity) ? "destructive" : "success"}>
                      {cls.enrolled}/{cls.capacity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-green-600 hover:text-green-800 hover:bg-green-50 px-2"
                        onClick={() => handleEnrollMembers(cls)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Enroll
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                        onClick={() => handleEditClass(cls)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                        onClick={() => handleDeleteClass(cls)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                  No classes match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this class?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the class
              {classToDelete && ` "${classToDelete.name}"`} and remove its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteClass}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClassesTab;
