import { create } from 'zustand';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: ThemeType;
  accentColor: string;
  setTheme: (theme: ThemeType) => void;
  setAccentColor: (color: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'system',
  accentColor: '#FFC107',
  setTheme: (theme) => set({ theme }),
  setAccentColor: (color) => set({ accentColor: color }),
}));
