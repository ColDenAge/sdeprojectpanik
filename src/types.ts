export interface Member {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'active' | 'inactive';
  joinDate?: string;
  gymId: string;
} 