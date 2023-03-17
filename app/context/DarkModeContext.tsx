"use client"

import { createContext, useContext, useState } from "react"
// TYPES
import { DarkModeProviderType, DarkModeContextType } from "../types/context/DarkModeContext"

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider = ({ children }: DarkModeProviderType) => {
  // STATE
  const [darkMode, setDarkMode] = useState(false);

  console.log(darkMode);

  //EVENTS
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
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

