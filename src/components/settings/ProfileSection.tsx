import React, { useContext, useState } from "react";
import { RoleContext } from "../../router/App";
import { useAuth } from "@/context/AuthProvider";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import ProfileForm from "./ProfileForm";

const ProfileSection = () => {
  const { userRole } = useContext(RoleContext);
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: fullName
      });

      // Update Firestore user document
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        fullName: fullName,
        updatedAt: new Date().toISOString()
      });

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
