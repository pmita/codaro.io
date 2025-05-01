
// DATA
import { getUserSubscriptionStatus } from '@/data/db/user';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';
import { getUserInvoices } from '@/data/db/invoice';

export const INITIAL_INVOICES_LIMIT = 10;

export const useUserInvoicesQuery = (limit?: number) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-invoices'],
    queryFn: async () => (
      await getUserInvoices(limit ?? INITIAL_INVOICES_LIMIT)
    ),
    enabled: !!user,
  });
}