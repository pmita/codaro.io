import { getUser } from "@/data/user-2";
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../useAuth";


export const useUserQuery = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await getUser();
    },
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
    gcTime: 1000 * 60 * 60 * 12, 
    enabled: !!user
  });
}