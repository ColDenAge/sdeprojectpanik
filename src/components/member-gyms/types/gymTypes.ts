
export interface GymClass {
  id: number;
  name: string;
  instructor: string;
  schedule: string;
  capacity: number;
  enrolled: number;
}

export interface MembershipOption {
  id: number;
  name: string;
  price: string;
}

export interface Gym {
  id: number;
  name: string;
  location: string;
  amenities: string[];
  membershipOptions: MembershipOption[];
  classes: GymClass[];
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
