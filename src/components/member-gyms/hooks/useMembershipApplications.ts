import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Gym, MembershipOption } from '../types/gymTypes';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc, query, where, getDocs } from 'firebase/firestore';

interface UseMembershipApplicationsProps {
  currentUser: {
    name: string;
    id: string;
    email?: string;
  };
}

export const useMembershipApplications = ({ currentUser }: UseMembershipApplicationsProps) => {
  const [applicationSuccess, setApplicationSuccess] = useState<string[]>([]);
  const [applications, setApplications] = useState<Record<string, any[]>>({});
  const { toast } = useToast();

  const submitApplication = async (gym: Gym, membership: MembershipOption) => {
    // Fetch full name from Firestore if available
    let memberName = currentUser.name;
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.id));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.fullName) memberName = data.fullName;
        else if (data.displayName) memberName = data.displayName;
      }
    } catch (e) {
      // fallback to currentUser.name
    }
    if (!memberName && currentUser.email) memberName = currentUser.email;

    // Check if user is already an active member
    const membersRef = collection(db, 'gyms', gym.id.toString(), 'members');
    const memberQuery = query(
      membersRef,
      where('memberId', '==', currentUser.id),
      where('status', '==', 'active')
    );
    const memberSnapshot = await getDocs(memberQuery);

    if (!memberSnapshot.empty) {
      toast({
        title: "Already a Member",
        description: "You are already an active member of this gym.",
        variant: "destructive"
      });
      return;
    }

    // Check for existing pending applications
    const applicationsRef = collection(db, 'gyms', gym.id.toString(), 'applications');
    const existingQuery = query(
      applicationsRef,
      where('memberId', '==', currentUser.id),
      where('status', '==', 'pending')
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      toast({
        title: "Application Already Pending",
        description: "You already have a pending application for this gym.",
        variant: "destructive"
      });
      return;
    }

    const newApplication = {
      gymId: gym.id.toString(),
      memberName,
      membershipType: membership.name,
      requestDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: "pending",
      memberId: currentUser.id
    };

    // Write to Firestore
    try {
      await addDoc(collection(db, 'gyms', gym.id.toString(), 'applications'), newApplication);
      toast({
        title: "Membership Application Submitted",
        description: `Your application for ${membership.name} membership at ${gym.name} has been submitted successfully.`,
      });
      setApplicationSuccess(prev => [...prev, gym.id.toString()]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  };

  const hasApplied = (gymId: number) => {
    return applicationSuccess.includes(gymId.toString());
  };

  return {
    applications,
    hasApplied,
    submitApplication
  };
};