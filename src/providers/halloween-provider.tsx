import React, { createContext, useContext, useState } from 'react';

interface HalloweenContextType {
  isHalloweenMode: boolean;
  toggleHalloweenMode: () => void;
}

const HalloweenContext = createContext<HalloweenContextType | undefined>(undefined);

export function HalloweenProvider({ children }: { children: React.ReactNode }) {
  const [isHalloweenMode, setIsHalloweenMode] = useState(() => {
    const savedMode = localStorage.getItem('halloweenMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    
    const OCTOBER = 9;
    const date = new Date();
    const currentMonth = date.getMonth();
    const dayOfMonth = date.getDate();
    
    const isOctober = currentMonth === OCTOBER;
    const isFirstWeek = dayOfMonth <= 7;
    
    const initialMode = isOctober && isFirstWeek;
    localStorage.setItem('halloweenMode', String(initialMode));
    return initialMode;
  });

  const toggleHalloweenMode = () => {
    setIsHalloweenMode(prev => {
      const newValue = !prev;
      localStorage.setItem('halloweenMode', String(newValue));
      return newValue;
    });
  };

  return (
    <HalloweenContext.Provider value={{ isHalloweenMode, toggleHalloweenMode }}>
      {children}
    </HalloweenContext.Provider>
  );
}

export const useHalloween = () => {
  const context = useContext(HalloweenContext);
  if (context === undefined) {
    throw new Error('useHalloween must be used within a HalloweenProvider');
  }
  return context;
};