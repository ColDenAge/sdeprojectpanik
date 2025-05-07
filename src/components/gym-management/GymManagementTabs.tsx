
import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Dumbbell, List, Calendar } from "lucide-react";
import MembersTab from "./MembersTab";
import GymsTab from "./GymsTab";
import AmenitiesTab from "./AmenitiesTab";
import ClassesTab from "./ClassesTab";
import MembershipPlansTab from "./MembershipPlansTab";
import { SearchProvider } from "./SearchContext";

interface GymManagementTabsProps {
  userRole?: string;
}

const GymManagementTabs: React.FC<GymManagementTabsProps> = ({ userRole }) => {
  return (
    <SearchProvider>
      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5 md:inline-flex h-auto">
              <TabsTrigger value="members" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2 hidden md:inline" />
                Members
              </TabsTrigger>
              <TabsTrigger value="gyms" className="px-4 py-2">
                <Dumbbell className="h-4 w-4 mr-2 hidden md:inline" />
                Gyms
              </TabsTrigger>
              <TabsTrigger value="amenities" className="px-4 py-2">
                <List className="h-4 w-4 mr-2 hidden md:inline" />
                Amenities
              </TabsTrigger>
              <TabsTrigger value="classes" className="px-4 py-2">
                <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
                Classes
              </TabsTrigger>
              <TabsTrigger value="memberships" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2 hidden md:inline" />
                Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="pt-4">
              <MembersTab />
            </TabsContent>

            <TabsContent value="gyms" className="pt-4">
              <GymsTab userRole={userRole} />
            </TabsContent>

            <TabsContent value="amenities" className="pt-4">
              <AmenitiesTab />
            </TabsContent>

            <TabsContent value="classes" className="pt-4">
              <ClassesTab />
            </TabsContent>

            <TabsContent value="memberships" className="pt-4">
              <MembershipPlansTab />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </SearchProvider>
  );
};

export default GymManagementTabs;
