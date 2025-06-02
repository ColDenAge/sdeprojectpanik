
import React from "react";
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
import { Gym } from "../types/gymTypes";

interface DeleteGymDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gymToDelete: Gym | undefined;
  onConfirmDelete: () => void;
}

const DeleteGymDialog: React.FC<DeleteGymDialogProps> = ({
  open,
  onOpenChange,
  gymToDelete,
  onConfirmDelete,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this gym?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the gym
            {gymToDelete && ` "${gymToDelete.name}"`} and remove its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGymDialog;
