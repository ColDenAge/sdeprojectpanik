
import React, { useContext } from "react";
import { AuthContext } from "../App";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, User, UserPlus } from "lucide-react";

const Members = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gym Members</h1>
        <button className="bg-[#0B294B] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors">
          <UserPlus className="h-5 w-5" />
          Add New Member
        </button>
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
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Same as last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Members Table */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
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
                  <tr key={i} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{member.name}</td>
                    <td className="px-4 py-3 text-sm">{member.membership}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{member.location}</td>
                    <td className="px-4 py-3 text-sm">{member.joinDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Members;
