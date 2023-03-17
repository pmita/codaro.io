"use client"

import { createContext, useContext, useState, useEffect } from "react"
// TYPES
import { DarkModeProviderType, DarkModeContextType } from "../types/context/DarkModeContext"

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider = ({ children }: DarkModeProviderType) => {
  // STATE
  const [darkMode, setDarkMode] = useState(false);

  //EVENTS
  const toggleDarkMode = () => {
    if(localStorage.getItem('darkMode')) {
      if(localStorage.getItem('darkMode') === 'light'){
        setDarkMode(true)
        localStorage.setItem('darkMode', 'dark')
      } else {
        setDarkMode(false)
        localStorage.setItem('darkMode', 'light')
      }
  }
}

  useEffect(() => {
    if(!localStorage.getItem('darkMode')){
      localStorage.setItem('darkMode', 'light')
    } else {
      if(localStorage.getItem('darkMode') === 'dark'){
        setDarkMode(true)
      }
    }
  }, []);

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