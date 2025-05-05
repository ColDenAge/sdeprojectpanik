
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "./SearchContext";

const membersData = [
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
];

const MembersTab = () => {
  const { searchTerm } = useSearch();

  const filteredMembers = membersData.filter((member) => {
    const search = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(search) ||
      member.membership.toLowerCase().includes(search) ||
      member.status.toLowerCase().includes(search) ||
      member.location.toLowerCase().includes(search) ||
      member.joinDate.toLowerCase().includes(search)
    );
  });

  return (
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
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, i) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                No members match your search
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTab;
