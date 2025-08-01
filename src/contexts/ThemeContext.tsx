import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS custom properties
    if (theme === 'light') {
      document.documentElement.style.setProperty('--primary-black', '#ffffff');
      document.documentElement.style.setProperty('--secondary-black', '#f8f9fa');
      document.documentElement.style.setProperty('--accent-gray', '#e9ecef');
      document.documentElement.style.setProperty('--text-primary', '#1a1a1a');
      document.documentElement.style.setProperty('--text-secondary', '#6c757d');
      document.documentElement.style.setProperty('--text-muted', '#495057');
      document.documentElement.style.setProperty('--accent-color', '#0066cc');
      document.documentElement.style.setProperty('--border-color', '#dee2e6');
    } else {
      document.documentElement.style.setProperty('--primary-black', '#0a0a0a');
      document.documentElement.style.setProperty('--secondary-black', '#1a1a1a');
      document.documentElement.style.setProperty('--accent-gray', '#2a2a2a');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
      document.documentElement.style.setProperty('--text-muted', '#666666');
      document.documentElement.style.setProperty('--accent-color', '#f5f5f5');
      document.documentElement.style.setProperty('--border-color', '#333333');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 