import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId = 'electric' | 'emerald' | 'sunset' | 'hr-blue' | 'midnight-navy' | 'blue-violet';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  tooltip: string;
  /** Gradient for the swatch circle itself */
  swatchGradient: string;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'electric',
    label: 'Electric',
    tooltip: 'Silicon Valley Electric — Innovation & Transformation',
    swatchGradient: 'linear-gradient(135deg, hsl(302, 58%, 36%) 0%, hsl(335, 89%, 51%) 100%)',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    tooltip: 'Pacific Emerald — Executive Growth & Wellness',
    swatchGradient: 'linear-gradient(135deg, hsl(158, 65%, 28%) 0%, hsl(160, 84%, 39%) 100%)',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    tooltip: 'Sunset Coral — Human Connection & Culture',
    swatchGradient: 'linear-gradient(135deg, hsl(32, 95%, 44%) 0%, hsl(20, 92%, 52%) 100%)',
  },
  {
    id: 'hr-blue',
    label: 'HR Blue',
    tooltip: 'HR Professional Blue — Authority, SHRM/HRCI & Executive Credibility',
    swatchGradient: 'linear-gradient(135deg, hsl(218, 72%, 32%) 0%, hsl(200, 84%, 44%) 100%)',
  },
  {
    id: 'midnight-navy',
    label: 'Midnight',
    tooltip: 'Charcoal Slate — Executive Composure & Quiet Authority',
    swatchGradient: 'linear-gradient(135deg, hsl(213, 14%, 31%) 0%, hsl(210, 28%, 52%) 100%)',
  },
  {
    id: 'blue-violet',
    label: 'Violet',
    tooltip: 'Bluish Violet — Visionary Innovation & Creative Intelligence',
    swatchGradient: 'linear-gradient(135deg, hsl(255, 62%, 42%) 0%, hsl(276, 72%, 56%) 100%)',
  },
];

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'electric',
  setTheme: () => {},
});

const STORAGE_KEY = 'hrwest2027-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    return saved && ['electric', 'emerald', 'sunset', 'hr-blue', 'midnight-navy', 'blue-violet'].includes(saved) ? saved : 'electric';
  });

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  // Apply data-theme attribute to <html> for CSS overrides
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Apply on mount (before first paint)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    const initial = saved && ['electric', 'emerald', 'sunset', 'hr-blue', 'midnight-navy', 'blue-violet'].includes(saved) ? saved : 'electric';
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
