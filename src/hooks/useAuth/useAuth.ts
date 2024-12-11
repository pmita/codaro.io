import { useContext } from "react";
import { AuthContext } from '@/context/auth-context';
import { AuthReducerState } from "@/context/auth-context/types";

export const useAuth = (): AuthReducerState => {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error('useAuthState must be used within a AuthContextProvider');
  }

  return context;
}