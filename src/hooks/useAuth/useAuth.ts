import { useContext } from "react";
import { AuthContext } from '@/context/AuthContext';
import { AuthReducerState } from "@/context/AuthContext/types";

export const useAuth = (): AuthReducerState => {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error('useAuthState must be used within a AuthContextProvider');
  }

  return context;
}