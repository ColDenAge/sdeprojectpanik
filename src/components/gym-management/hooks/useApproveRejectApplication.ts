import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { MembershipApplication, ActiveMember } from '../types/gymTypes';

/**
 * Approve a membership application: set status to 'approved', set join date, and add to activeMembers.
 */
export async function approveApplication(application: MembershipApplication) {
  const applicationRef = doc(db, 'gyms', application.gymId, 'applications', application.id);
  const gymRef = doc(db, 'gyms', application.gymId);
  const joinDate = new Date();

  // Update application status and join date
  await updateDoc(applicationRef, {
    status: 'approved',
    joinDate: joinDate.toISOString(),
  });

  // Fetch gym to get membership plans
  const gymSnap = await getDoc(gymRef);
  let membershipPlanId = '';

  if (gymSnap.exists()) {
    const gymData = gymSnap.data();
    if (gymData.membershipPlans && gymData.membershipPlans.length > 0) {
      // Find the selected plan
      const plan = gymData.membershipPlans.find((p: any) => p.name === application.membershipType);
      if (plan) {
        membershipPlanId = plan.id;
      }
    }
  }

  // Add to activeMembers subcollection or array
  const newMember: ActiveMember = {
    id: application.memberId,
    name: application.memberName,
    membershipPlanId,
    startDate: joinDate.toISOString(),
    endDate: null,
    status: 'active',
  };
  // Option 1: Add to subcollection (recommended for scalability)
  await addDoc(collection(db, 'gyms', application.gymId, 'activeMembers'), newMember);
  // Option 2: Or update an array field (uncomment if you use an array)
  // await updateDoc(gymRef, { activeMembers: arrayUnion(newMember) });
}

/**
 * Reject a membership application: set status to 'rejected'.
 */
export async function rejectApplication(application: MembershipApplication) {
  const applicationRef = doc(db, 'gyms', application.gymId, 'applications', application.id);
  await updateDoc(applicationRef, {
    status: 'rejected',
  });
} 