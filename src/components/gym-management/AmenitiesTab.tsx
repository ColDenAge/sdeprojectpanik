
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { useSearch } from "./SearchContext";
import { AddEditAmenityDialog } from "./dialogs/AddEditAmenityDialog";

const amenitiesData = [
  {
    id: "1",
    name: "Swimming Pool",
    description: "Olympic-sized swimming pool with lap lanes",
  },
  {
    id: "2",
    name: "Sauna",
    description: "Dry heat sauna room for relaxation",
  },
  {
    id: "3",
    name: "Basketball Court",
    description: "Full-sized indoor basketball court",
  },
  {
    id: "4",
    name: "Cardio Equipment",
    description: "Treadmills, ellipticals, and stationary bikes",
  },
];

const AmenitiesTab = () => {
  const { searchTerm } = useSearch();
  const [amenities, setAmenities] = useState(amenitiesData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState<undefined | typeof amenitiesData[0]>(undefined);

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

  const handleEditAmenity = (amenity: typeof amenitiesData[0]) => {
    setCurrentAmenity(amenity);
    setDialogOpen(true);
  };

  const handleSaveAmenity = (values: { name: string; description: string }) => {
    if (currentAmenity) {
      // Edit existing amenity
      setAmenities(
        amenities.map((item) =>
          item.id === currentAmenity.id
            ? { ...item, ...values }
            : item
        )
      );
    } else {
      // Add new amenity
      const newAmenity = {
        id: `${amenities.length + 1}`,
        ...values,
      };
      setAmenities([...amenities, newAmenity]);
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2"
                      onClick={() => handleEditAmenity(amenity)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
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
    </div>
  );
};

export default AmenitiesTab;
