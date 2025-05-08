import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "No user");
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
// Mali pag declare
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
// to revise
  const signUp = async (email: string, password: string, role: string) => {
    try {
      console.log("Starting sign up process for:", email);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created in Firebase Auth");
      
      // Create user document in Firestore
      const userDoc = doc(db, "users", userCredential.user.uid);
      await setDoc(userDoc, {
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log("User document created in Firestore");
      
      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: role
      });
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

  const logout = async () => {
    try {
      console.log("Attempting to log out");
      await signOut(auth);
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

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 