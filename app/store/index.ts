import { createStore } from 'zustand';

interface IState {
  currentStation: any;
  view: any;
  map: any;
}

interface IAction {
  setMap: (map: any) => void;
  setView: (view: string) => void;
  setCurrentStation: (station: any) => void;
}

export type IAppStore = IState & IAction;

export const createAppStore = () =>
  createStore<IState & IAction>(set => ({
    map: null,
    currentStation: null,
    view: 'charging',
    setMap: (map: any) => set(() => ({ map })),
    setView: (view: string) => set(() => ({ view })),
    setCurrentStation: (currentStation: any) => set(() => ({ currentStation })),
  }));
