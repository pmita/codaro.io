"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { DarkModeProviderType, DarkModeContextType } from "../types/context/DarkModeContext"

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider = ({ children }: DarkModeProviderType) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const darkModaLocal = localStorage.getItem('darkMode');
    if(!darkModaLocal){
      localStorage.setItem('darkMode', 'dark');
    } else{
      if(darkModaLocal === 'dark'){
        localStorage.setItem('darkMode', 'light');
      } else{
        localStorage.setItem('darkMode', 'dark');
      }
    }
  }

  useEffect(() => {
    const darkModeInLocal = localStorage.getItem('darkMode');
    if(!darkModeInLocal){
      localStorage.setItem('darkMode', 'light');
    } else {
      if(darkModeInLocal === 'dark'){
        setDarkMode(true);
      } else {
        setDarkMode(false);
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
    throw new Error('useDarkMode must be used within a DarkModeProvider. Check your component is included in this context');
  }

  return darkModeContext;
}