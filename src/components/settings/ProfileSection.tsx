import React, { useContext, useState } from "react";
import { RoleContext } from "../../router/App";
import { useAuth } from "@/context/AuthProvider";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import ProfileForm from "./ProfileForm";

const ProfileSection = () => {
  const { userRole } = useContext(RoleContext);
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.fullName) setFullName(data.fullName);
      } else if (user.displayName) {
        setFullName(user.displayName);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsLoading(true);

    let authSuccess = false;
    let firestoreSuccess = false;

    try {
      // Update Firebase Auth profile
      await updateProfile(user, { displayName: fullName });
      authSuccess = true;
    } catch (error) {
      console.error("Error updating Firebase Auth profile:", error);
      toast({
        title: "Error",
        description: "Failed to update authentication profile. Please try again.",
        variant: "destructive",
      });
    }

    try {
      // Update Firestore user document
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
        fullName: fullName,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      firestoreSuccess = true;
    } catch (error) {
      console.error("Error updating Firestore user document:", error);
      toast({
        title: "Error",
        description: "Failed to update Firestore profile. Please try again.",
        variant: "destructive",
      });
    }

    if (authSuccess && firestoreSuccess) {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[#0B294B] mb-6">Profile Settings</h2>
      <ProfileForm
        fullName={fullName}
        onFullNameChange={setFullName}
        user={user}
        userRole={userRole}
        isLoading={isLoading}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default ProfileSection;
