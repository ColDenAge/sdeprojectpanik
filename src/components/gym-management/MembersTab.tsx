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
import { collection, getDocs, query, where, doc, deleteDoc, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { useGyms } from "@/components/member-gyms/hooks/useGyms";
import { addMonths, addYears } from 'date-fns';

interface MembersTabProps {
  gymId?: string;
  onMemberAccepted?: () => void;
}

const MembersTab: React.FC<MembersTabProps> = ({ gymId, onMemberAccepted }) => {
  const { searchTerm } = useSearch();
  const [members, setMembers] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [pendingToReview, setPendingToReview] = useState<any>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPaymentMember, setSelectedPaymentMember] = useState<any>(null);
  const { toast } = useToast();
  const { gyms } = useGyms();
  const currentGym = gyms.find(g => g.id === gymId);

  useEffect(() => {
    if (!gymId) return;
    const fetchMembersAndPending = async () => {
      // Fetch approved members
      const membersRef = collection(db, 'gyms', gymId, 'members');
      const membersSnapshot = await getDocs(membersRef);
      const approvedMembers = membersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure endDate is included if it exists
        endDate: doc.data().endDate || null,
      }));

      // Fetch pending applications
      const applicationsRef = collection(db, 'gyms', gymId, 'applications');
      const pendingQuery = query(applicationsRef, where('status', '==', 'pending'));
      const pendingSnapshot = await getDocs(pendingQuery);

      // Clean up duplicate applications
      const pendingMembers = pendingSnapshot.docs.map(doc => ({
        id: doc.id,
        memberName: doc.data().memberName,
        membershipType: doc.data().membershipType,
        joinedAt: null,
        status: 'pending',
        memberId: doc.data().memberId
      }));

      // Group by memberId to find duplicates
      const memberGroups = pendingMembers.reduce((acc, member) => {
        if (!acc[member.memberId]) {
          acc[member.memberId] = [];
        }
        acc[member.memberId].push(member);
        return acc;
      }, {});

      // Keep only the most recent application for each member
      const uniquePendingMembers = Object.values(memberGroups).map((group: any[]) => {
        if (group.length > 1) {
          // Sort by ID (assuming newer IDs are more recent)
          group.sort((a, b) => b.id.localeCompare(a.id));
          // Delete all but the most recent application
          group.slice(1).forEach(async (duplicate) => {
            const appRef = doc(db, 'gyms', gymId, 'applications', duplicate.id);
            await deleteDoc(appRef);
          });
          return group[0];
        }
        return group[0];
      });

      setMembers([...approvedMembers, ...uniquePendingMembers]);
    };
    fetchMembersAndPending();
  }, [gymId]);

  // Automatically set status to inactive if expired
  useEffect(() => {
    const now = new Date();
    const updateExpiredMembers = async () => {
      let updated = false;
      const newMembers = await Promise.all(members.map(async (member) => {
        if (member.endDate) {
          const end = new Date(member.endDate);
          if (end < now && member.status !== 'inactive') {
            // Update Firestore
            if (gymId) {
              const memberRef = doc(db, 'gyms', gymId, 'members', member.id);
              await updateDoc(memberRef, { status: 'inactive' });
            }
            updated = true;
            return { ...member, status: 'inactive' };
          }
        }
        return member;
      }));
      if (updated) setMembers(newMembers);
    };
    if (members.length > 0) updateExpiredMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, gymId]);

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

  const handleReviewPending = (member: any) => {
    setPendingToReview(member);
    setReviewDialogOpen(true);
  };

  const handleAcceptPending = async () => {
    if (!pendingToReview || !gymId) return;
    // Remove from applications
    const appRef = doc(db, 'gyms', gymId, 'applications', pendingToReview.id);
    await deleteDoc(appRef);
    // Check if member already exists
    const membersRef = collection(db, 'gyms', gymId, 'members');
    const memberQuery = query(membersRef, where('memberId', '==', pendingToReview.memberId));
    const memberSnapshot = await getDocs(memberQuery);
    if (!memberSnapshot.empty) {
      // Member exists, update their membershipType and status
      const memberDocRef = doc(db, 'gyms', gymId, 'members', memberSnapshot.docs[0].id);
      await updateDoc(memberDocRef, {
        membershipType: pendingToReview.membershipType,
        status: 'active',
        joinedAt: new Date().toISOString(),
      });
    } else {
      // Member does not exist, add new
      const memberRef = doc(collection(db, 'gyms', gymId, 'members'), pendingToReview.id);
      await setDoc(memberRef, {
        memberId: pendingToReview.memberId,
        memberName: pendingToReview.memberName,
        membershipType: pendingToReview.membershipType,
        joinedAt: new Date().toISOString(),
        status: 'active',
      });
    }
    // Debug log before increment
    console.log('Incrementing members for gym:', gymId);
    // Increment gym's member count in Firestore
    const gymRef = doc(db, 'gyms', gymId);
    await updateDoc(gymRef, { members: increment(1) });
    // Notify parent to update local gyms state
    if (onMemberAccepted) onMemberAccepted();
    setMembers(members => members.map(m => m.id === pendingToReview.id ? { ...m, status: 'active', joinedAt: new Date().toISOString() } : m));
    setReviewDialogOpen(false);
    setPendingToReview(null);
    toast({ title: 'Member Accepted', description: `${pendingToReview.memberName} is now an active member.` });
  };

  const handleDeclinePending = async () => {
    if (!pendingToReview || !gymId) return;
    // Remove from applications
    const appRef = doc(db, 'gyms', gymId, 'applications', pendingToReview.id);
    await deleteDoc(appRef);
    setMembers(members => members.filter(m => m.id !== pendingToReview.id));
    setReviewDialogOpen(false);
    setPendingToReview(null);
    toast({ title: 'Application Declined', description: `${pendingToReview.memberName}'s application was declined.` });
  };

  const handlePaymentClick = (member: any) => {
    setSelectedPaymentMember(member);
    setPaymentDialogOpen(true);
  };

  const handlePaymentStatus = async (status: 'paid' | 'expired') => {
    if (!selectedPaymentMember || !gymId) return;
    const memberRef = doc(db, 'gyms', gymId, 'members', selectedPaymentMember.id);

    if (status === 'expired') {
      // Update status to inactive in Firestore
      await updateDoc(memberRef, { status: 'inactive', endDate: null }); // Clear end date on expiration
      setMembers(members => members.map(m => m.id === selectedPaymentMember.id ? { ...m, status: 'inactive', endDate: null } : m));
      toast({ title: 'Status Updated', description: `${selectedPaymentMember.memberName} is now inactive.` });
    } else {
      // Status is 'paid' (set to 'active')
      // Fetch gym data to get membership plans
      const gymRef = doc(db, 'gyms', gymId);
      const gymSnap = await getDoc(gymRef);
      let endDate: Date | null = null;
      let startDate = new Date();
      if (gymSnap.exists()) {
        const gymData = gymSnap.data();
        if (gymData.membershipPlans && gymData.membershipPlans.length > 0) {
          // Find the selected plan based on member's membershipType
          const plan = gymData.membershipPlans.find((p: any) => p.name === selectedPaymentMember.membershipType);
          if (plan) {
            // Calculate end date based on plan name
            if (plan.name.toLowerCase().includes('basic')) {
              endDate = addMonths(startDate, 1);
            } else if (plan.name.toLowerCase().includes('premium')) {
              endDate = addYears(startDate, 1);
            } else {
              // Default to 1 month
              endDate = addMonths(startDate, 1);
            }
          }
        }
      }
      // Update status to active and set endDate in Firestore
      await updateDoc(memberRef, { status: 'active', endDate: endDate ? endDate.toISOString() : null, joinedAt: startDate.toISOString() });
      setMembers(members => members.map(m => m.id === selectedPaymentMember.id ? { ...m, status: 'active', endDate: endDate ? endDate.toISOString() : null, joinedAt: startDate.toISOString() } : m));
      toast({ title: 'Status Updated', description: `${selectedPaymentMember.memberName} is now active.` });
    }
    setPaymentDialogOpen(false);
    setSelectedPaymentMember(null);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead>Name</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Expiration Date</TableHead>
            <TableHead>Gyms</TableHead>
            <TableHead>Payment</TableHead>
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
                  {member.status === 'pending' ? (
                    <Badge
                      variant="destructive"
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => handleReviewPending(member)}
                    >
                      pending
                    </Badge>
                  ) : (
                    <Badge variant={member.status === 'inactive' ? 'secondary' : 'success'}>{member.status}</Badge>
                  )}
                </TableCell>
                <TableCell>{member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : '-'}</TableCell>
                <TableCell>{member.endDate ? new Date(member.endDate).toLocaleDateString() : '-'}</TableCell>
                <TableCell>{currentGym ? currentGym.name : '-'}</TableCell>
                <TableCell>
                  {(() => {
                    // Determine if expired
                    let isExpired = false;
                    let paid = false;
                    let now = new Date();
                    if (member.endDate) {
                      const end = new Date(member.endDate);
                      if (end < now) {
                        isExpired = true;
                      } else {
                        paid = true;
                      }
                    }
                    if (paid) {
                      return <Badge variant="success" className="bg-green-500 text-white">Paid</Badge>;
                    } else {
                      // Show Payment button if expired or inactive
                      return (
                        <Button variant="outline" size="sm" onClick={() => handlePaymentClick(member)}>
                          Payment
                        </Button>
                      );
                    }
                  })()}
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
              <TableCell colSpan={8} className="h-24 text-center text-gray-500">
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

      {/* Review Pending Modal */}
      <AlertDialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Review Application</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingToReview && `Do you want to accept or decline ${pendingToReview.memberName}'s application?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={handleDeclinePending} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">Decline</Button>
            <Button onClick={handleAcceptPending} className="bg-green-600 text-white hover:bg-green-700">Accept</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Status Dialog */}
      <AlertDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Payment Status</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPaymentMember && `Set payment status for ${selectedPaymentMember.memberName}:`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => handlePaymentStatus('paid')}>Paid</Button>
            <Button variant="destructive" onClick={() => handlePaymentStatus('expired')}>Expired</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MembersTab;
