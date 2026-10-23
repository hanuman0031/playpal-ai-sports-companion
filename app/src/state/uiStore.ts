// ─────────────────────────────────────────────────────────────
// PlayPal — UI state store (Zustand)
// Global UI flags: active panel, overlay visibility, navigation.
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand';

export type ActivePanel =
  | 'none'
  | 'explain'
  | 'voice'
  | 'highlights'
  | 'stats'
  | 'prediction'
  | 'settings';

export type ActiveScreen = 'home' | 'live' | 'highlights' | 'prediction';

interface UIStore {
  activeScreen: ActiveScreen;
  activePanel: ActivePanel;
  isOverlayVisible: boolean;
  demoMode: boolean;
  showDebugInfo: boolean;
  toastMessage: string | null;
  toastType: 'info' | 'success' | 'error';

  setActiveScreen: (screen: ActiveScreen) => void;
  openPanel: (panel: ActivePanel) => void;
  closePanel: () => void;
  toggleOverlay: () => void;
  setDemoMode: (enabled: boolean) => void;
  toggleDebugInfo: () => void;
  showToast: (message: string, type?: 'info' | 'success' | 'error') => void;
  clearToast: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeScreen: 'home',
  activePanel: 'none',
  isOverlayVisible: false,
  demoMode: true,
  showDebugInfo: false,
  toastMessage: null,
  toastType: 'info',

  setActiveScreen: (screen) => set({ activeScreen: screen }),

  openPanel: (panel) => set({ activePanel: panel, isOverlayVisible: true }),

  closePanel: () => set({ activePanel: 'none', isOverlayVisible: false }),

  toggleOverlay: () =>
    set((state) => ({ isOverlayVisible: !state.isOverlayVisible })),

  setDemoMode: (enabled) => set({ demoMode: enabled }),

  toggleDebugInfo: () =>
    set((state) => ({ showDebugInfo: !state.showDebugInfo })),

  showToast: (message, type = 'info') =>
    set({ toastMessage: message, toastType: type }),

  clearToast: () => set({ toastMessage: null }),
}));
