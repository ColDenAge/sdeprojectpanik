
import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Dumbbell, MapPin } from "lucide-react";
import MembersTab from "./MembersTab";
import GymsTab from "./GymsTab";
import LocationsTab from "./LocationsTab";
import { SearchProvider } from "./SearchContext";

const GymManagementTabs = () => {
  return (
    <SearchProvider>
      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex h-auto">
              <TabsTrigger value="members" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2 hidden md:inline" />
                Members
              </TabsTrigger>
              <TabsTrigger value="gyms" className="px-4 py-2">
                <Dumbbell className="h-4 w-4 mr-2 hidden md:inline" />
                Gyms
              </TabsTrigger>
              <TabsTrigger value="locations" className="px-4 py-2">
                <MapPin className="h-4 w-4 mr-2 hidden md:inline" />
                Locations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="pt-4">
              <MembersTab />
            </TabsContent>

            <TabsContent value="gyms" className="pt-4">
              <GymsTab />
            </TabsContent>

            <TabsContent value="locations" className="pt-4">
              <LocationsTab />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </SearchProvider>
  );
};

export default GymManagementTabs;
