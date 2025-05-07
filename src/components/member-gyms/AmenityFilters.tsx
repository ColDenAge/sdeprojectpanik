
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Wifi, SwimmingPool, Shower, Spa } from "lucide-react";

// Get all unique amenities from gyms
export const getUniqueAmenities = (gyms: any[]): string[] => {
  const amenitiesSet = new Set<string>();
  
  gyms.forEach(gym => {
    gym.amenities.forEach((amenity: string) => {
      amenitiesSet.add(amenity);
    });
  });
  
  return Array.from(amenitiesSet);
};

const amenityIcons: Record<string, React.ReactNode> = {
  "Pool": <SwimmingPool className="h-4 w-4" />,
  "Sauna": <Spa className="h-4 w-4" />,
  "Weightlifting": <Dumbbell className="h-4 w-4" />,
  "24/7 Access": <Wifi className="h-4 w-4" />,
  "Shower": <Shower className="h-4 w-4" />
};

interface AmenityFiltersProps {
  amenities: string[];
  selectedAmenities: string[];
  onAmenityChange: (amenity: string) => void;
}

const AmenityFilters: React.FC<AmenityFiltersProps> = ({ 
  amenities,
  selectedAmenities,
  onAmenityChange
}) => {
  return (
    <div>
      <h3 className="font-medium text-sm mb-2">Filter by Amenities</h3>
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity) => (
          <Badge
            key={amenity}
            variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
            className={`cursor-pointer flex items-center gap-1 ${
              selectedAmenities.includes(amenity) 
                ? "bg-[#0B294B]" 
                : "hover:bg-[#0B294B]/10"
            }`}
            onClick={() => onAmenityChange(amenity)}
          >
            {amenityIcons[amenity] || null}
            {amenity}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default AmenityFilters;
