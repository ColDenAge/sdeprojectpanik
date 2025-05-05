
import React, { useContext } from "react";
import { AuthContext } from "../App";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, User, UserPlus, Search, Dumbbell, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Members = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="w-full flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold">Gym Management</h1>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members, gyms, or locations..."
              className="pl-9 w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="bg-[#0B294B] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors">
              <UserPlus className="h-4 w-4" />
              <span>Add New Member</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gym Locations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Same as last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Content */}
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Membership</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Join Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "John Doe",
                        membership: "Premium",
                        status: "Active",
                        location: "Downtown",
                        joinDate: "Jan 12, 2023",
                      },
                      {
                        name: "Jane Smith",
                        membership: "Standard",
                        status: "Active",
                        location: "Westside",
                        joinDate: "Mar 5, 2023",
                      },
                      {
                        name: "Robert Johnson",
                        membership: "Premium",
                        status: "Inactive",
                        location: "Downtown",
                        joinDate: "Nov 19, 2022",
                      },
                      {
                        name: "Emily Davis",
                        membership: "Standard",
                        status: "Active",
                        location: "Eastside",
                        joinDate: "Jul 30, 2023",
                      },
                      {
                        name: "Michael Wilson",
                        membership: "Premium Plus",
                        status: "Active",
                        location: "Downtown",
                        joinDate: "Feb 14, 2023",
                      },
                    ].map((member, i) => (
                      <tr key={i} className="border-b hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm">{member.name}</td>
                        <td className="px-4 py-3 text-sm">{member.membership}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            variant={member.status === "Active" ? "success" : "destructive"}
                          >
                            {member.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{member.location}</td>
                        <td className="px-4 py-3 text-sm">{member.joinDate}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2">Edit</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50 px-2">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="gyms" className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left text-sm font-medium">Gym Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Members</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Downtown Fitness",
                        location: "Downtown",
                        members: 87,
                        status: "Active",
                      },
                      {
                        name: "Westside Gym",
                        location: "Westside",
                        members: 65,
                        status: "Active",
                      },
                      {
                        name: "Eastside Fitness Center",
                        location: "Eastside",
                        members: 52,
                        status: "Active",
                      },
                    ].map((gym, i) => (
                      <tr key={i} className="border-b hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm">{gym.name}</td>
                        <td className="px-4 py-3 text-sm">{gym.location}</td>
                        <td className="px-4 py-3 text-sm">{gym.members}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="success">
                            {gym.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2">Edit</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="locations" className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left text-sm font-medium">Location Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Address</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Gyms</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Members</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Downtown",
                        address: "123 Main St, City, State",
                        gyms: 1,
                        members: 87,
                      },
                      {
                        name: "Westside",
                        address: "456 West Ave, City, State",
                        gyms: 1,
                        members: 65,
                      },
                      {
                        name: "Eastside",
                        address: "789 East Blvd, City, State",
                        gyms: 1,
                        members: 52,
                      },
                    ].map((location, i) => (
                      <tr key={i} className="border-b hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm">{location.name}</td>
                        <td className="px-4 py-3 text-sm">{location.address}</td>
                        <td className="px-4 py-3 text-sm">{location.gyms}</td>
                        <td className="px-4 py-3 text-sm">{location.members}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2">Edit</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </DashboardLayout>
  );
};

export default Members;
