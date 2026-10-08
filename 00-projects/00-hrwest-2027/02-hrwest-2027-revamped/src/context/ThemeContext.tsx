import React, { createContext, useContext, useEffect } from 'react';

export type ThemeId = 'blue-violet';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  tooltip: string;
  swatchGradient: string;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'blue-violet',
    label: 'Violet',
    tooltip: 'Bluish Violet — Visionary Innovation & Creative Intelligence',
    swatchGradient: 'linear-gradient(135deg, hsl(262, 72%, 48%) 0%, hsl(335, 90%, 54%) 100%)',
  },
];

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'blue-violet',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always lock to blue-violet
  const theme: ThemeId = 'blue-violet';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'blue-violet');
    localStorage.setItem('hrwest2027-theme', 'blue-violet');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
