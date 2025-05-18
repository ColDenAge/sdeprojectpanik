import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditClassDialog } from "./dialogs/AddEditClassDialog";
import { EnrollMemberDialog } from "./dialogs/EnrollMemberDialog";
import { useToast } from "@/hooks/use-toast";
import ClassesTable from "./classes/ClassesTable";
import DeleteClassDialog from "./classes/DeleteClassDialog";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthProvider";

interface GymClass {
  id: string;
  name: string;
  instructor: string;
  schedule: string;
  capacity: string;
  enrolled: string;
  enrolledMembers: { id: string; name: string }[];
  gymId: string;
}

interface ClassesTabProps {
  gymId: string;
}

const ClassesTab: React.FC<ClassesTabProps> = ({ gymId }) => {
  const { searchTerm } = useSearch();
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<GymClass | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<GymClass | undefined>(undefined);
  const { toast } = useToast();
  const { user } = useAuth();
  const [availableMembers, setAvailableMembers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (!user || !gymId) return;
    fetchClasses();
  }, [user, gymId]);

  const fetchClasses = async () => {
    try {
      const classesRef = collection(db, "gyms", gymId, "classes");
      const classesSnapshot = await getDocs(classesRef);
      const allClasses = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), gymId }));
      setClasses(allClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch classes. Please try again.",
        variant: "destructive",
      });
    }
  };

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

  const handleEditClass = (cls: GymClass) => {
    setCurrentClass(cls);
    setDialogOpen(true);
  };

  const handleDeleteClass = (cls: GymClass) => {
    setClassToDelete(cls);
    setDeleteDialogOpen(true);
  };

  const handleEnrollMembers = async (cls: GymClass) => {
    setCurrentClass(cls);
    if (cls.gymId) {
      try {
        const membersRef = collection(db, "gyms", cls.gymId, "members");
        const membersSnapshot = await getDocs(membersRef);
        const membersList = membersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAvailableMembers(membersList);
      } catch (error) {
        console.error("Error fetching members:", error);
        setAvailableMembers([]);
      }
    } else {
      setAvailableMembers([]);
    }
    setEnrollDialogOpen(true);
  };

  const confirmDeleteClass = async () => {
    if (classToDelete) {
      try {
        await deleteDoc(doc(db, "gyms", classToDelete.gymId, "classes", classToDelete.id));
        setClasses(classes.filter(cls => cls.id !== classToDelete.id));
        toast({
          title: "Class Deleted",
          description: `${classToDelete.name} has been removed.`,
        });
      } catch (error) {
        console.error("Error deleting class:", error);
        toast({
          title: "Error",
          description: "Failed to delete class. Please try again.",
          variant: "destructive",
        });
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleSaveClass = async (values: { name: string; instructor: string; schedule: string; capacity: string; gymId: string }) => {
    try {
      if (currentClass) {
        // Edit existing class
        await updateDoc(doc(db, "gyms", currentClass.gymId, "classes", currentClass.id), values);
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
        const docRef = await addDoc(collection(db, "gyms", values.gymId, "classes"), {
          ...values,
          enrolled: "0",
          enrolledMembers: []
        });
        const newClass = {
          id: docRef.id,
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
    } catch (error) {
      console.error("Error saving class:", error);
      toast({
        title: "Error",
        description: "Failed to save class. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveEnrollment = async (selectedMemberIds: string[]) => {
    if (currentClass) {
      try {
        const enrolledMembers = selectedMemberIds.map(id => {
          const member = availableMembers.find(m => m.id === id);
          return {
            id,
            name: (member && member.name) || 'Unknown Member'
          };
        });

        await updateDoc(doc(db, "gyms", currentClass.gymId, "classes", currentClass.id), {
          enrolledMembers,
          enrolled: `${selectedMemberIds.length}`
        });

        setClasses(classes.map(cls => {
          if (cls.id === currentClass.id) {
            return {
              ...cls,
              enrolledMembers,
              enrolled: `${selectedMemberIds.length}`
            };
          }
          return cls;
        }));

        toast({
          title: "Enrollment Updated",
          description: `Enrollment for ${currentClass.name} has been updated.`,
        });
      } catch (error) {
        console.error("Error updating enrollment:", error);
        toast({
          title: "Error",
          description: "Failed to update enrollment. Please try again.",
          variant: "destructive",
        });
      }
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
