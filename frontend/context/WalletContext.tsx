'use client';

import React, { createContext, useContext, useState } from 'react';

type WalletContextType = {
  address: string | undefined;
  setAddress: (addr: string | undefined) => void;
};

const WalletContext = createContext<WalletContextType>({
  address: undefined,
  setAddress: () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | undefined>();

  return (
    <WalletContext.Provider value={{ address, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
