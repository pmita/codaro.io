
// DATA
import { isSubscriptionValid } from '@/data/db/user';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';

export const useIsSubscriptionValidQuery = () => {
  const { user } = useAuth();
  return useQuery<boolean | null>({
    queryKey: ['access-status'],
    queryFn: async () => (
      await isSubscriptionValid()
    ),
    enabled: !!user,
  });
}