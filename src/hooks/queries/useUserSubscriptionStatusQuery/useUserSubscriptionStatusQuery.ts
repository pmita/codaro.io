
// DATA
import { getUserSubscriptionStatus } from '@/data/db/actions/user';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';

export const useUserSubscriptionStatusQuery = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['subscription-status'],
    queryFn: async () => (
      await getUserSubscriptionStatus()
    ),
    enabled: !!user,
  });
}