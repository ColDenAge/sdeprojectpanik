import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { useApproveRejectApplication } from '../hooks/useApproveRejectApplication';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
  gymId: string;
  memberName: string;
  onSuccess: () => void;
}

export const ApplicationModal = ({
  isOpen,
  onClose,
  memberId,
  gymId,
  memberName,
  onSuccess,
}: ApplicationModalProps) => {
  const { approveApplication, rejectApplication, isLoading, error } = useApproveRejectApplication({
    gymId,
    onSuccess: () => {
      onSuccess();
      onClose();
    },
  });

  const handleApprove = async () => {
    await approveApplication(memberId);
  };

  const handleReject = async () => {
    await rejectApplication(memberId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Application</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Review application from {memberName}</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isLoading}
          >
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isLoading}
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 