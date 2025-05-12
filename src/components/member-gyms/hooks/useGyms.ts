import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Gym, GymClass, MembershipOption } from '../types/gymTypes';
import { useToast } from '@/hooks/use-toast';

export const useGyms = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setIsLoading(true);
        const gymsRef = collection(db, "gyms");
        const gymsSnapshot = await getDocs(gymsRef);

        // Debug: Log the number of gyms found
        console.log('Number of gyms found:', gymsSnapshot.size);

        const gymsList = await Promise.all(
          gymsSnapshot.docs.map(async (doc) => {
            const gymData = doc.data() as Omit<Gym, 'id' | 'membershipOptions' | 'classes'>;

            // Debug: Log the gym data
            console.log('Gym data:', { id: doc.id, ...gymData });

            // Try fetching membership options from both possible paths
            let membershipOptions: MembershipOption[] = [];
            try {
              // First try: Check if membership options are in a subcollection
              const membershipOptionsRef = collection(db, `gyms/${doc.id}/membershipOptions`);
              const membershipOptionsSnapshot = await getDocs(membershipOptionsRef);

              // Debug: Log the number of membership options found
              console.log(`Membership options found for gym ${doc.id}:`, membershipOptionsSnapshot.size);

              if (membershipOptionsSnapshot.size > 0) {
                membershipOptions = membershipOptionsSnapshot.docs.map(doc => ({
                  id: Number(doc.id),
                  ...doc.data()
                })) as MembershipOption[];
              } else {
                // Second try: Check if membership options are in the gym document itself
                const membershipOptionsData = gymData.membershipOptions;
                if (Array.isArray(membershipOptionsData)) {
                  membershipOptions = membershipOptionsData.map((option, index) => ({
                    id: index + 1,
                    ...option
                  })) as MembershipOption[];
                }
              }
            } catch (error) {
              console.error(`Error fetching membership options for gym ${doc.id}:`, error);
            }

            // Fetch classes
            const classesRef = collection(db, `gyms/${doc.id}/classes`);
            const classesSnapshot = await getDocs(classesRef);
            const classes = classesSnapshot.docs.map(doc => ({
              id: Number(doc.id),
              ...doc.data()
            })) as GymClass[];

            // Debug: Log the final gym object
            const gym = {
              id: Number(doc.id),
              ...gymData,
              membershipOptions,
              classes
            } as Gym;
            console.log('Final gym object:', gym);

            return gym;
          })
        );
        setGyms(gymsList);
      } catch (error) {
        console.error("Error fetching gyms:", error);
        toast({
          title: "Error",
          description: "Failed to fetch gyms data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchGyms();
  }, []);

  return { gyms, isLoading };
};