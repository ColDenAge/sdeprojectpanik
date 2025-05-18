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

        console.log('Number of gyms found:', gymsSnapshot.size);

        const gymsList = await Promise.all(
          gymsSnapshot.docs.map(async (doc) => {
            const gymData = doc.data();
            console.log('Raw gym data for', doc.id, ':', gymData);

            // Fetch amenities from subcollection
            let amenities: string[] = [];
            try {
              const amenitiesRef = collection(db, `gyms/${doc.id}/amenities`);
              const amenitiesSnapshot = await getDocs(amenitiesRef);
              amenities = amenitiesSnapshot.docs.map(doc => doc.data().name || doc.data().amenity || '');
              console.log('Amenities for gym', doc.id, ':', amenities);
            } catch (error) {
              console.error(`Error fetching amenities for gym ${doc.id}:`, error);
            }

            // Transform membership plans to match the expected structure
            const membershipOptions: MembershipOption[] = (gymData.membershipPlans || []).map((plan: any) => ({
              id: plan.id,
              name: plan.name,
              price: `$${plan.price}/mo`,
              duration: plan.duration,
              benefits: plan.benefits || []
            }));

            console.log('Membership options for gym', doc.id, ':', membershipOptions);

            // Fetch classes from subcollection
            let classes: GymClass[] = [];
            try {
              const classesRef = collection(db, `gyms/${doc.id}/classes`);
              const classesSnapshot = await getDocs(classesRef);
              classes = classesSnapshot.docs.map(doc => ({
                id: Number(doc.id),
                name: doc.data().name,
                instructor: doc.data().instructor,
                schedule: doc.data().schedule,
                capacity: Number(doc.data().capacity),
                enrolled: Number(doc.data().enrolled),
                gymId: doc.data().gymId
              }));
              console.log('Classes for gym', doc.id, ':', classes);
            } catch (error) {
              console.error(`Error fetching classes for gym ${doc.id}:`, error);
            }

            // Create the final gym object
            const gym = {
              id: doc.id,
              name: gymData.name,
              location: gymData.location,
              address: gymData.address,
              contactNumber: gymData.contactNumber,
              amenities,
              membershipOptions,
              classes,
              status: gymData.status,
              members: gymData.members,
              pendingApplications: gymData.pendingApplications,
              ownerId: gymData.ownerId,
              updatedAt: gymData.updatedAt
            } as Gym;

            console.log('Final gym object for', doc.id, ':', gym);
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