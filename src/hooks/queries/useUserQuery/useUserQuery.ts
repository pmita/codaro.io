import { getUser } from "@/data/user";
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../useAuth";


export const useUserQuery = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      return await getUser();
    },
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
    gcTime: 1000 * 60 * 60 * 12, 
    enabled: !!user
  });
}