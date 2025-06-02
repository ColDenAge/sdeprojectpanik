export interface GymClass {
  id: number;
  name: string;
  instructor: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  gymId: string;
}

export interface MembershipOption {
  id: string;
  name: string;
  price: string;
  duration: string;
  benefits: string[];
}

export interface Gym {
  id: string;
  name: string;
  location: string;
  address: string;
  contactNumber: string;
  amenities: string[];
  membershipOptions: MembershipOption[];
  classes: GymClass[];
  status: string;
  members: number;
  pendingApplications: number;
  ownerId: string;
  updatedAt: any;
}

export interface MembershipApplication {
  id: string;
  gymId: string;
  memberName: string;
  membershipType: string;
  requestDate: string;
  status: string;
  memberId: string;
}

export interface GymMember {
  id: string;
  name: string;
  membership: string;
  status: string;
  location: string;
  joinDate: string;
  gyms: string[];
}
