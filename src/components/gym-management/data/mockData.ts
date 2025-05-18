import { Gym, MembershipApplication, ApplicationsRecord } from "../types/gymTypes";

export const initialGymsData: Gym[] = [
  {
    id: "1",
    name: "Downtown Fitness",
    location: "Downtown",
    address: "123 Main St",
    contactNumber: "555-0123",
    members: 450,
    status: "Active",
    pendingApplications: 3
  },
  {
    id: "2",
    name: "Westside Gym",
    location: "Westside",
    address: "456 West Ave",
    contactNumber: "555-0124",
    members: 320,
    status: "Active",
    pendingApplications: 1
  },
  {
    id: "3",
    name: "Eastside Fitness Center",
    location: "Eastside",
    address: "789 East Blvd",
    contactNumber: "555-0125",
    members: 280,
    status: "Active",
    pendingApplications: 4
  }
];

export const initialMembersData = [
  {
    id: "1",
    name: "John Doe",
    membership: "Premium",
    status: "Active",
    location: "Downtown",
    joinDate: "Jan 12, 2023",
    gyms: ["Downtown Fitness"]
  },
  {
    id: "2",
    name: "Jane Smith",
    membership: "Standard",
    status: "Active",
    location: "Westside",
    joinDate: "Mar 5, 2023",
    gyms: ["Westside Gym"]
  },
  {
    id: "3",
    name: "Robert Johnson",
    membership: "Premium",
    status: "Inactive",
    location: "Downtown",
    joinDate: "Nov 19, 2022",
    gyms: ["Downtown Fitness", "Eastside Fitness Center"]
  },
  {
    id: "4",
    name: "Emily Davis",
    membership: "Standard",
    status: "Active",
    location: "Eastside",
    joinDate: "Jul 30, 2023",
    gyms: ["Eastside Fitness Center"]
  },
  {
    id: "5",
    name: "Michael Wilson",
    membership: "Premium Plus",
    status: "Active",
    location: "Downtown",
    joinDate: "Feb 14, 2023",
    gyms: ["Downtown Fitness", "Westside Gym"]
  }
];

export const mockApplicationsData = {
  "1": [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "555-0126",
      membershipType: "Premium",
      status: "Pending",
      appliedDate: "2024-03-15"
    }
  ],
  "2": [
    {
      id: "2",
      name: "David Brown",
      email: "david.b@example.com",
      phone: "555-0127",
      membershipType: "Standard",
      status: "Pending",
      appliedDate: "2024-03-14"
    }
  ],
  "3": [
    {
      id: "3",
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      phone: "555-0128",
      membershipType: "Premium Plus",
      status: "Pending",
      appliedDate: "2024-03-13"
    }
  ]
};
