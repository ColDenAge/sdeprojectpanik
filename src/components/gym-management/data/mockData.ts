
import { Gym, MembershipApplication, ApplicationsRecord } from "../types/gymTypes";

export const initialGymsData: Gym[] = [
  {
    id: "1",
    name: "Downtown Fitness",
    location: "Downtown",
    address: "123 Main St, City, State",
    contactNumber: "(555) 123-4567",
    members: 87,
    status: "Active",
    pendingApplications: 2,
  },
  {
    id: "2",
    name: "Westside Gym",
    location: "Westside",
    address: "456 West Ave, City, State",
    contactNumber: "(555) 234-5678",
    members: 65,
    status: "Active",
    pendingApplications: 0,
  },
  {
    id: "3",
    name: "Eastside Fitness Center",
    location: "Eastside",
    address: "789 East Blvd, City, State",
    contactNumber: "(555) 345-6789",
    members: 52,
    status: "Active",
    pendingApplications: 1,
  },
];

// Example mock data for pending applications, with correct status types
export const mockApplicationsData: ApplicationsRecord = {
  "1": [
    {
      id: "a1",
      gymId: "1",
      memberName: "John Smith",
      membershipType: "Premium",
      requestDate: "May 6, 2025",
      status: "pending",
    },
    {
      id: "a2",
      gymId: "1",
      memberName: "Alice Johnson",
      membershipType: "Standard",
      requestDate: "May 7, 2025",
      status: "pending",
    },
  ],
  "3": [
    {
      id: "a3",
      gymId: "3",
      memberName: "Bob Williams",
      membershipType: "Standard",
      requestDate: "May 5, 2025",
      status: "pending",
    },
  ],
};
