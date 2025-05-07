
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "./SearchContext";
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

const membersData = [
  {
    id: "1",
    name: "John Doe",
    membership: "Premium",
    status: "Active",
    location: "Downtown",
    joinDate: "Jan 12, 2023",
  },
  {
    id: "2",
    name: "Jane Smith",
    membership: "Standard",
    status: "Active",
    location: "Westside",
    joinDate: "Mar 5, 2023",
  },
  {
    id: "3",
    name: "Robert Johnson",
    membership: "Premium",
    status: "Inactive",
    location: "Downtown",
    joinDate: "Nov 19, 2022",
  },
  {
    id: "4",
    name: "Emily Davis",
    membership: "Standard",
    status: "Active",
    location: "Eastside",
    joinDate: "Jul 30, 2023",
  },
  {
    id: "5",
    name: "Michael Wilson",
    membership: "Premium Plus",
    status: "Active",
    location: "Downtown",
    joinDate: "Feb 14, 2023",
  },
];

const MembersTab = () => {
  const { searchTerm } = useSearch();
  const [members, setMembers] = useState(membersData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const { toast } = useToast();

  const filteredMembers = members.filter((member) => {
    const search = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(search) ||
      member.membership.toLowerCase().includes(search) ||
      member.status.toLowerCase().includes(search) ||
      member.location.toLowerCase().includes(search) ||
      member.joinDate.toLowerCase().includes(search)
    );
  });

  const handleDeleteMember = (member: any) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteMember = () => {
    if (memberToDelete) {
      setMembers(members.filter(member => member.id !== memberToDelete.id));
      toast({
        title: "Member Deleted",
        description: `${memberToDelete.name} has been removed.`,
      });
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/30">
            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Membership</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Join Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, i) => (
              <tr key={i} className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm">{member.name}</td>
                <td className="px-4 py-3 text-sm">{member.membership}</td>
                <td className="px-4 py-3 text-sm">
                  <Badge
                    variant={member.status === "Active" ? "success" : "destructive"}
                  >
                    {member.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">{member.location}</td>
                <td className="px-4 py-3 text-sm">{member.joinDate}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2">Edit</Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                      onClick={() => handleDeleteMember(member)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                No members match your search
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this member?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the member
              {memberToDelete && ` "${memberToDelete.name}"`} and remove their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteMember}
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

export default MembersTab;
