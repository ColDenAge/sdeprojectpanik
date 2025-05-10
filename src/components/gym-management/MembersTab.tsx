import React, { useState, useEffect } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { initialMembersData } from "./data/mockData";

interface MembersTabProps {
  gymId?: string;
}

const MembersTab: React.FC<MembersTabProps> = ({ gymId }) => {
  const { searchTerm } = useSearch();
  const [members, setMembers] = useState(initialMembersData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const { toast } = useToast();

  // Filter members based on search term and gymId
  const filteredMembers = members.filter((member) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      member.name.toLowerCase().includes(search) ||
      member.membership.toLowerCase().includes(search) ||
      member.location.toLowerCase().includes(search) ||
      member.gyms.some(gym => gym.toLowerCase().includes(search));

    // If gymId is provided, only show members of that gym
    const matchesGym = gymId ? member.gyms.includes(gymId) : true;

    return matchesSearch && matchesGym;
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
      <div className="flex justify-end mb-4">
        <Button className="bg-[#0B294B] text-white hover:bg-[#0a2544]">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Member
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead>Name</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Gyms</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, i) => (
              <TableRow key={i} className="hover:bg-muted/30">
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.membership}</TableCell>
                <TableCell>
                  <Badge
                    variant={member.status === "Active" ? "success" : "destructive"}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{member.location}</TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.gyms.map((gym, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-muted/50"
                      >
                        {gym}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                      onClick={() => handleDeleteMember(member)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                No members match your search
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
