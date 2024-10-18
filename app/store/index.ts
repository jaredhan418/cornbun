import { createStore } from 'zustand';

interface IState {
  currentStation: any;
  view: any;
}

interface IAction {
  setView: (view: string) => void;
  setCurrentStation: (station: any) => void;
}

export type IAppStore = IState & IAction;

export const createAppStore = () =>
  createStore<IState & IAction>(set => ({
    currentStation: null,
    view: 'charging',
    setView: (view: string) => set(() => ({ view })),
    setCurrentStation: (currentStation: any) => set(() => ({ currentStation })),
  }));
