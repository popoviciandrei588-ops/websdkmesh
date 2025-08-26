import React, { createContext, useContext, useState, useCallback } from 'react';

interface ConnectedAccount {
  id: string;
  name: string;
  type: 'bank' | 'crypto';
  balance: number;
  currency: string;
  institution: string;
  accountNumber: string;
  authToken?: string;
  refreshToken?: string;
}

interface MeshContextType {
  connectedAccounts: ConnectedAccount[];
  isLoading: boolean;
  error: string | null;
  addAccount: (account: ConnectedAccount) => void;
  removeAccount: (accountId: string) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

const MeshContext = createContext<MeshContextType | undefined>(undefined);

export function MeshProvider({ children }: { children: React.ReactNode }) {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAccount = useCallback((account: ConnectedAccount) => {
    setConnectedAccounts(prev => [...prev, account]);
    setError(null);
  }, []);

  const removeAccount = useCallback((accountId: string) => {
    setConnectedAccounts(prev => prev.filter(acc => acc.id !== accountId));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <MeshContext.Provider value={{
      connectedAccounts,
      isLoading,
      error,
      addAccount,
      removeAccount,
      clearError,
      setLoading
    }}>
      {children}
    </MeshContext.Provider>
  );
}

export function useMesh() {
  const context = useContext(MeshContext);
  if (context === undefined) {
    throw new Error('useMesh must be used within a MeshProvider');
  }
  return context;
}