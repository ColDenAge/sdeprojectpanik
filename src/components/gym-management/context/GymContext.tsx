import React, { createContext, useContext, useState } from 'react';
import { Gym } from '../types/gymTypes';

interface GymContextType {
  selectedGym: Gym | null;
  setSelectedGym: (gym: Gym | null) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);

  return (
    <GymContext.Provider value={{ selectedGym, setSelectedGym }}>
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (context === undefined) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
