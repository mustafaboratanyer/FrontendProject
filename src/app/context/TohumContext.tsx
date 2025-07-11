'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface TohumContextType {
  balance: number;
  basicSeeds: number;
  premiumSeeds: number;
  setBalance: (balance: number) => void;
  setBasicSeeds: (count: number) => void;
  setPremiumSeeds: (count: number) => void;
  buyBasicSeed: () => void;
  buyPremiumSeed: () => void;
}

const TohumContext = createContext<TohumContextType | undefined>(undefined);

export const TohumProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(100);
  const [basicSeeds, setBasicSeeds] = useState(0);
  const [premiumSeeds, setPremiumSeeds] = useState(0);

  const buyBasicSeed = () => {
    if (balance >= 10) {
      setBalance(balance - 10);
      setBasicSeeds(basicSeeds + 1);
    } else {
      alert("Paran yeterli değilll!");
    }
  };

  const buyPremiumSeed = () => {
    if (balance >= 20) {
      setBalance(balance - 20);
      setPremiumSeeds(premiumSeeds + 1);
    } else {
      alert("Paran yeterli değil!");
    }
  };

  return (
    <TohumContext.Provider value={{
      balance,
      basicSeeds,
      premiumSeeds,
      setBalance,
      setBasicSeeds,
      setPremiumSeeds,
      buyBasicSeed,
      buyPremiumSeed
    }}>
      {children}
    </TohumContext.Provider>
  );
};

export const useTohumContext = () => {
  const context = useContext(TohumContext);
  if (context === undefined) {
    throw new Error('useTohumContext yanlış kullanıldı, TohumProviderda kullam');
  }
  return context;
};
