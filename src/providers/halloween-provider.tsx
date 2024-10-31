import React, { createContext, useContext, useState, useEffect } from 'react';

interface HalloweenContextType {
  isHalloweenMode: boolean;
  toggleHalloweenMode: () => void;
}

const HalloweenContext = createContext<HalloweenContextType | undefined>(undefined);

export function HalloweenProvider({ children }: { children: React.ReactNode }) {
  const [isHalloweenMode, setIsHalloweenMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('halloweenMode');
    if (savedMode !== null) {
      setIsHalloweenMode(savedMode === 'true');
    } else {
      const OCTOBER = 9;
      const date = new Date();
      const currentMonth = date.getMonth();
      const dayOfMonth = date.getDate();
      
      const isOctober = currentMonth === OCTOBER;
      const isFirstWeek = dayOfMonth <= 7;
      
      setIsHalloweenMode(isOctober && isFirstWeek);
    }
  }, []);

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