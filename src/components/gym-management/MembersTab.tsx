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
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface MembersTabProps {
  gymId?: string;
}

const MembersTab: React.FC<MembersTabProps> = ({ gymId }) => {
  const { searchTerm } = useSearch();
  const [members, setMembers] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!gymId) return;
    const fetchMembersAndPending = async () => {
      // Fetch approved members
      const membersRef = collection(db, 'gyms', gymId, 'members');
      const membersSnapshot = await getDocs(membersRef);
      const approvedMembers = membersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        status: 'active',
      }));
      // Fetch pending applications
      const applicationsRef = collection(db, 'gyms', gymId, 'applications');
      const pendingQuery = query(applicationsRef, where('status', '==', 'pending'));
      const pendingSnapshot = await getDocs(pendingQuery);
      const pendingMembers = pendingSnapshot.docs.map(doc => ({
        id: doc.id,
        memberName: doc.data().memberName,
        membershipType: doc.data().membershipType,
        joinedAt: null,
        status: 'pending',
      }));
      setMembers([...approvedMembers, ...pendingMembers]);
    };
    fetchMembersAndPending();
  }, [gymId]);

  // Filter members based on search term and gymId
  const filteredMembers = members.filter((member) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      (member.memberName || '').toLowerCase().includes(search) ||
      (member.membershipType || '').toLowerCase().includes(search);
    return matchesSearch;
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
        description: `${memberToDelete.memberName} has been removed.`,
      });
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="overflow-x-auto">
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
                <TableCell>{member.memberName}</TableCell>
                <TableCell>{member.membershipType}</TableCell>
                <TableCell>
                  <Badge
                    variant={member.status === "active" ? "success" : "destructive"}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>{member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : '-'}</TableCell>
                <TableCell>-</TableCell>
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
              {memberToDelete && ` "${memberToDelete.memberName}"`} and remove their data.
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
