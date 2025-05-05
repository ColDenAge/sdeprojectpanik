
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const gymsData = [
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
];

const GymsTab = () => {
  return (
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
          {gymsData.map((gym, i) => (
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
  );
};

export default GymsTab;
