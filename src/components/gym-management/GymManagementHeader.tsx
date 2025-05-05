
import React from "react";
import { Search, Filter, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "./SearchContext";

const GymManagementHeader = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      <h1 className="text-3xl font-bold">Gym Management</h1>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members, gyms, or locations..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
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
  );
};

export default GymManagementHeader;
