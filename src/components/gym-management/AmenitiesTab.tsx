import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditAmenityDialog } from "./dialogs/AddEditAmenityDialog";
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
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthProvider";

interface Amenity {
  id: string;
  name: string;
  description: string;
  gymId: string;
}

interface AmenitiesTabProps {
  gymId: string;
}

const AmenitiesTab: React.FC<AmenitiesTabProps> = ({ gymId }) => {
  const { searchTerm } = useSearch();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState<Amenity | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [amenityToDelete, setAmenityToDelete] = useState<Amenity | undefined>(undefined);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !gymId) return;
    fetchAmenities();
  }, [user, gymId]);

  const fetchAmenities = async () => {
    try {
      const amenitiesRef = collection(db, "gyms", gymId, "amenities");
      const amenitiesSnapshot = await getDocs(amenitiesRef);
      const allAmenities = amenitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), gymId }));
      setAmenities(allAmenities);
    } catch (error) {
      console.error("Error fetching amenities:", error);
      toast({
        title: "Error",
        description: "Failed to fetch amenities. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredAmenities = amenities.filter((amenity) => {
    const search = searchTerm.toLowerCase();
    return (
      amenity.name.toLowerCase().includes(search) ||
      amenity.description.toLowerCase().includes(search)
    );
  });

  const handleAddAmenity = () => {
    setCurrentAmenity(undefined);
    setDialogOpen(true);
  };

  const handleEditAmenity = (amenity: Amenity) => {
    setCurrentAmenity(amenity);
    setDialogOpen(true);
  };

  const handleDeleteAmenity = (amenity: Amenity) => {
    setAmenityToDelete(amenity);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAmenity = async () => {
    if (amenityToDelete) {
      try {
        await deleteDoc(doc(db, "gyms", amenityToDelete.gymId, "amenities", amenityToDelete.id));
        setAmenities(amenities.filter(amenity => amenity.id !== amenityToDelete.id));
        toast({
          title: "Amenity Deleted",
          description: `${amenityToDelete.name} has been removed.`,
        });
      } catch (error) {
        console.error("Error deleting amenity:", error);
        toast({
          title: "Error",
          description: "Failed to delete amenity. Please try again.",
          variant: "destructive",
        });
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleSaveAmenity = async (values: { name: string; description: string; gymId: string }) => {
    try {
      if (currentAmenity) {
        // Edit existing amenity
        await updateDoc(doc(db, "gyms", currentAmenity.gymId, "amenities", currentAmenity.id), values);
        setAmenities(
          amenities.map((item) =>
            item.id === currentAmenity.id
              ? { ...item, ...values }
              : item
          )
        );
        toast({
          title: "Amenity Updated",
          description: `${values.name} has been updated.`,
        });
      } else {
        // Add new amenity
        const docRef = await addDoc(collection(db, "gyms", values.gymId, "amenities"), values);
        const newAmenity = {
          id: docRef.id,
          ...values,
        };
        setAmenities([...amenities, newAmenity]);
        toast({
          title: "Amenity Added",
          description: `${values.name} has been added.`,
        });
      }
    } catch (error) {
      console.error("Error saving amenity:", error);
      toast({
        title: "Error",
        description: "Failed to save amenity. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Gym Amenities</h3>
        <Button
          onClick={handleAddAmenity}
          className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Amenity
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left text-sm font-medium">Amenity Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAmenities.length > 0 ? (
              filteredAmenities.map((amenity, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm">{amenity.name}</td>
                  <td className="px-4 py-3 text-sm">{amenity.description}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                        onClick={() => handleEditAmenity(amenity)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2"
                        onClick={() => handleDeleteAmenity(amenity)}
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
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-gray-500">
                  No amenities match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddEditAmenityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        amenity={currentAmenity}
        onSave={handleSaveAmenity}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this amenity?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the amenity
              {amenityToDelete && ` "${amenityToDelete.name}"`} and remove its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteAmenity}
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

export default AmenitiesTab;
