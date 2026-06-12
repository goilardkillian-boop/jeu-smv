import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: ToastItem[];
  ajouter: (type: ToastType, message: string) => void;
  retirer: (id: number) => void;
}

let prochainId = 1;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  ajouter: (type, message) => {
    const id = prochainId;
    prochainId += 1;
    set((etat) => ({ toasts: [...etat.toasts, { id, type, message }] }));
    setTimeout(() => {
      set((etat) => ({ toasts: etat.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  retirer: (id) => set((etat) => ({ toasts: etat.toasts.filter((t) => t.id !== id) })),
}));

/** Raccourcis utilisables hors composants React. */
export const toast = {
  success: (message: string) => useToastStore.getState().ajouter('success', message),
  error: (message: string) => useToastStore.getState().ajouter('error', message),
  info: (message: string) => useToastStore.getState().ajouter('info', message),
  warning: (message: string) => useToastStore.getState().ajouter('warning', message),
};
