import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle } from "lucide-react";
import { Gym } from "./types/gymTypes";

interface GymCardProps {
  gym: Gym;
  hasApplied: boolean;
  onViewDetails: (gym: Gym) => void;
  onApplyMembership: (gym: Gym) => void;
}

const GymCard: React.FC<GymCardProps> = ({
  gym,
  hasApplied,
  onViewDetails,
  onApplyMembership
}) => {
  return (
    <Card key={gym.id} className="overflow-hidden border border-border">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{gym.name}</CardTitle>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {gym.location}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground">AMENITIES</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {(gym.amenities ?? []).slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {((gym.amenities?.length ?? 0) > 3) && (
                <Badge variant="outline" className="text-xs">
                  +{(gym.amenities?.length ?? 0) - 3} more
                </Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">MEMBERSHIP OPTIONS</p>
            <p className="text-sm">{(gym.membershipOptions ?? []).map(m => m.name).join(", ")}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">CLASSES</p>
            <p className="text-sm">{(gym.classes?.length ?? 0)} classes available</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
          {hasApplied ? (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Application Submitted
            </div>
          ) : (
            <Button
              variant="default"
              className="bg-[#0B294B] hover:bg-[#0a2544] text-white"
              onClick={() => onApplyMembership(gym)}
            >
              Apply for Membership
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => onViewDetails(gym)}
            className="text-[#0B294B] hover:bg-[#0B294B]/10"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GymCard;
