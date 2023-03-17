"use client"

import { createContext, useContext, useState } from "react"
// TYPES
import { DarkModeProviderType, DarkModeContextType } from "../types/context/DarkModeContext"

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider = ({ children }: DarkModeProviderType) => {
  // STATE
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, color: 'blue' }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => {
  const darkModeContext = useContext(DarkModeContext);

  if(!darkModeContext) {
    throw new Error('useDarkMode must be used within a DarkModeProvider. Check the your component is included in this context');
  }

  return darkModeContext;
}

