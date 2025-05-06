
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "./SearchContext";
import { AddEditClassDialog } from "./dialogs/AddEditClassDialog";

const classesData = [
  {
    id: "1",
    name: "Yoga Basics",
    instructor: "Sarah Johnson",
    schedule: "Mon, Wed, Fri 6:00 PM - 7:00 PM",
    capacity: "20",
    enrolled: "14",
  },
  {
    id: "2",
    name: "HIIT Workout",
    instructor: "Michael Torres",
    schedule: "Tue, Thu 7:00 AM - 8:00 AM",
    capacity: "15",
    enrolled: "12",
  },
  {
    id: "3",
    name: "Spinning",
    instructor: "Jessica Smith",
    schedule: "Mon, Wed, Fri 8:00 AM - 9:00 AM",
    capacity: "25",
    enrolled: "22",
  },
];

const ClassesTab = () => {
  const { searchTerm } = useSearch();
  const [classes, setClasses] = useState(classesData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<undefined | typeof classesData[0]>(undefined);

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
    } else {
      // Add new class
      const newClass = {
        id: `${classes.length + 1}`,
        ...values,
        enrolled: "0",
      };
      setClasses([...classes, newClass]);
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                      onClick={() => handleEditClass(cls)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
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
    </div>
  );
};

export default ClassesTab;
