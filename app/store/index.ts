import { createStore } from 'zustand';

interface IState {
  currentStation: any;
  view: any;
  map: any;
  hasTeam: boolean;
}

interface IAction {
  setMap: (map: any) => void;
  setView: (view: string) => void;
  setCurrentStation: (station: any) => void;
  setHasTeam: (hasTeam: boolean) => void;
}

export type IAppStore = IState & IAction;

export const createAppStore = () =>
  createStore<IState & IAction>(set => ({
    map: null,
    currentStation: null,
    view: 'charging',
    hasTeam: false,
    setHasTeam: (hasTeam: any) => set(() => ({ hasTeam })),
    setMap: (map: any) => set(() => ({ map })),
    setView: (view: string) => set(() => ({ view })),
    setCurrentStation: (currentStation: any) => set(() => ({ currentStation })),
  }));
