import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser ? "User logged in" : "No user");
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in successful");
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      console.error("Error in signIn:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, role: string) => {
    try {
      console.log("Starting sign up process for:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created in Firebase Auth");
      const userDoc = doc(db, "users", userCredential.user.uid);
      await setDoc(userDoc, {
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log("User document created in Firestore");
      await updateProfile(userCredential.user, { displayName: role });
      console.log("User profile updated");
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error: any) {
      console.error("Error in signUp:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Attempting to log out");
      await firebaseSignOut(auth);
      console.log("Logout successful");
      toast({
        title: "Success",
        description: "Logged out successfully!",
      });
    } catch (error: any) {
      console.error("Error in logout:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log("Attempting to reset password for:", email);
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
      toast({
        title: "Success",
        description: "Password reset email sent!",
      });
    } catch (error: any) {
      console.error("Error in resetPassword:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
