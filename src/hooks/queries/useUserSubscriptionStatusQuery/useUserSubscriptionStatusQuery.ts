
// DATA
import { getUserSubscriptionStatus } from '@/data/db/user';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';
// TYPES
import { UserSubscriptionStatusQuery } from './types';

export const useUserSubscriptionStatusQuery = () => {
  const { user } = useAuth();
  return useQuery<UserSubscriptionStatusQuery | null>({
    queryKey: ['subscription-status'],
    queryFn: async () => (
      await getUserSubscriptionStatus()
    ),
    enabled: !!user,
  });
}