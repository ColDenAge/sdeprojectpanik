
import React from "react";
import { Button } from "@/components/ui/button";
import { useSearch } from "./SearchContext";

const locationsData = [
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
];

const LocationsTab = () => {
  const { searchTerm } = useSearch();

  const filteredLocations = locationsData.filter((location) => {
    const search = searchTerm.toLowerCase();
    return (
      location.name.toLowerCase().includes(search) ||
      location.address.toLowerCase().includes(search) ||
      location.gyms.toString().includes(search) ||
      location.members.toString().includes(search)
    );
  });

  return (
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
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, i) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                No locations match your search
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LocationsTab;
