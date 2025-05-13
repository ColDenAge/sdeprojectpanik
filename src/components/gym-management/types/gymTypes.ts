export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  benefits: string[];
}

export interface ActiveMember {
  id: string;
  name: string;
  membershipPlanId: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "suspended";
}

export interface Gym {
  id: string;
  name: string;
  location: string;
  address: string;
  contactNumber: string;
  ownerId: string;
  gcashNumber: string;
  activeMembers?: ActiveMember[];
  status: string;
  members: number;
  pendingApplications: number;
  membershipPlans?: MembershipPlan[];
  createdAt?: Date;
  updatedAt?: Date;
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
