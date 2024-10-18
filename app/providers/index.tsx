'use client';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { createAppStore, IAppStore } from '../store';
import { useStore } from 'zustand';

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

export interface AppStoreProviderProps {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const storeRef = useRef<AppStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = <T,>(selector: (store: IAppStore) => T): T => {
  const counterStoreContext = useContext(AppStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useAppStore must be used within AppStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
