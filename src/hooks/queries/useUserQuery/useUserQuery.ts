// DATA
import { getCurrentUser } from "@/data/auth/currentUser";
// PACKAGES
import { useQuery } from "@tanstack/react-query"
// HOOKS
import { useAuth } from "../../useAuth";


export const useUserQuery = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await getCurrentUser();
    },
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
    gcTime: 1000 * 60 * 60 * 12, 
    enabled: !!user
  });
}