
export interface Gym {
  id: string;
  name: string;
  location: string;
  address: string;
  contactNumber: string;
  members: number;
  status: string;
  pendingApplications: number;
}

export type MembershipApplicationStatus = "pending" | "approved" | "rejected";

export interface MembershipApplication {
  id: string;
  gymId: string;
  memberName: string;
  membershipType: string;
  requestDate: string;
  status: MembershipApplicationStatus;
}

export type ApplicationsRecord = Record<string, MembershipApplication[]>;
