import { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

interface UseApproveRejectApplicationProps {
  gymId: string;
  onSuccess?: () => void;
}

export const useApproveRejectApplication = ({ gymId, onSuccess }: UseApproveRejectApplicationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approveApplication = async (memberId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Update member's status to active and set join date
      const memberRef = doc(db, 'members', memberId);
      await updateDoc(memberRef, {
        status: 'active',
        joinDate: new Date().toISOString(),
      });

      // Update gym's member count
      const gymRef = doc(db, 'gyms', gymId);
      const gymDoc = await getDocs(query(collection(db, 'gyms'), where('id', '==', gymId)));
      const currentMemberCount = gymDoc.docs[0]?.data()?.memberCount || 0;
      
      await updateDoc(gymRef, {
        memberCount: currentMemberCount + 1,
      });

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve application');
    } finally {
      setIsLoading(false);
    }
  };

  const rejectApplication = async (memberId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Delete the member document
      const memberRef = doc(db, 'members', memberId);
      await deleteDoc(memberRef);
      
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject application');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    approveApplication,
    rejectApplication,
    isLoading,
    error,
  };
}; 