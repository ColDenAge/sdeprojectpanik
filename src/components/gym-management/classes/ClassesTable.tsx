
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, UserPlus } from "lucide-react";

interface ClassesTableProps {
  filteredClasses: Array<{
    id: string;
    name: string;
    instructor: string;
    schedule: string;
    capacity: string;
    enrolled: string;
  }>;
  onEditClass: (cls: any) => void;
  onDeleteClass: (cls: any) => void;
  onEnrollMembers: (cls: any) => void;
}

const ClassesTable = ({ 
  filteredClasses, 
  onEditClass, 
  onDeleteClass, 
  onEnrollMembers 
}: ClassesTableProps) => {
  return (
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
                      onClick={() => onEnrollMembers(cls)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Enroll
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                      onClick={() => onEditClass(cls)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                      onClick={() => onDeleteClass(cls)}
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
  );
};

export default ClassesTable;
