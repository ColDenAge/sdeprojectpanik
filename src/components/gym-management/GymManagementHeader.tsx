
import React, { useState } from "react";
import { Search, Filter, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "./SearchContext";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const memberFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  membership: z.string().min(1, "Please select a membership type"),
  location: z.string().min(1, "Please select a location"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

const GymManagementHeader = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    membership: [],
    location: [],
  });
  const { toast } = useToast();

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: "",
      membership: "",
      location: "",
      email: "",
      phone: "",
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmitNewMember = (data: MemberFormValues) => {
    // In a real app, this would add to database
    console.log("New member data:", data);
    toast({
      title: "Success",
      description: `${data.name} has been added as a new member.`,
    });
    setAddMemberDialogOpen(false);
    form.reset();
  };

  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters(prev => {
      const currentFilters = {...prev};
      if (currentFilters[category].includes(value)) {
        currentFilters[category] = currentFilters[category].filter(item => item !== value);
      } else {
        currentFilters[category] = [...currentFilters[category], value];
      }
      return currentFilters;
    });
  };

  const applyFilters = () => {
    // In a real app, this would filter data
    console.log("Applied filters:", activeFilters);
    setFilterDialogOpen(false);
    toast({
      title: "Filters Applied",
      description: `Showing results with selected filters.`,
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      status: [],
      membership: [],
      location: [],
    });
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
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setFilterDialogOpen(true)}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button 
            className="bg-[#0B294B] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors"
            onClick={() => setAddMemberDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            <span>Add New Member</span>
          </Button>
        </div>
      </div>

      {/* Add New Member Dialog */}
      <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Fill in the member details to add them to the system.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitNewMember)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="membership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Type</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                        {...field}
                      >
                        <option value="">Select Membership</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="Premium Plus">Premium Plus</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                        {...field}
                      >
                        <option value="">Select Location</option>
                        <option value="Downtown">Downtown</option>
                        <option value="Westside">Westside</option>
                        <option value="Eastside">Eastside</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setAddMemberDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Filter Members</DialogTitle>
            <DialogDescription>
              Select options to filter the members list.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Status</h3>
              <div className="flex flex-wrap gap-2">
                {["Active", "Inactive"].map((status) => (
                  <Button
                    key={status}
                    variant={activeFilters.status.includes(status) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("status", status)}
                    className="text-xs"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-2 font-medium">Membership</h3>
              <div className="flex flex-wrap gap-2">
                {["Standard", "Premium", "Premium Plus"].map((membership) => (
                  <Button
                    key={membership}
                    variant={activeFilters.membership.includes(membership) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("membership", membership)}
                    className="text-xs"
                  >
                    {membership}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Location</h3>
              <div className="flex flex-wrap gap-2">
                {["Downtown", "Westside", "Eastside"].map((location) => (
                  <Button
                    key={location}
                    variant={activeFilters.location.includes(location) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("location", location)}
                    className="text-xs"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={clearFilters}>Clear All</Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GymManagementHeader;
