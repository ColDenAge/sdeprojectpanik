import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Gym, MembershipOption } from '../types/gymTypes';

interface UseMembershipApplicationsProps {
  currentUser: {
    name: string;
    id: string;
  };
}

export const useMembershipApplications = ({ currentUser }: UseMembershipApplicationsProps) => {
  const [applicationSuccess, setApplicationSuccess] = useState<string[]>([]);
  const [applications, setApplications] = useState<Record<string, any[]>>({});
  const { toast } = useToast();

  const submitApplication = (gym: Gym, membership: MembershipOption) => {
    const newApplication = {
      id: `app-${Date.now()}`,
      gymId: gym.id.toString(),
      memberName: currentUser.name,
      membershipType: membership.name,
      requestDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: "pending",
      memberId: currentUser.id
    };

    setApplications(prev => {
      const gymId = gym.id.toString();
      return {
        ...prev,
        [gymId]: [...(prev[gymId] || []), newApplication]
      };
    });

    toast({
      title: "Membership Application Submitted",
      description: `Your application for ${membership.name} membership at ${gym.name} has been submitted successfully.`,
    });

    setApplicationSuccess(prev => [...prev, gym.id.toString()]);
  };

  const hasApplied = (gymId: number) => {
    return applicationSuccess.includes(gymId.toString());
  };

  return {
    applications,
    hasApplied,
    submitApplication
  };
};