
// DATA
import { getUserSubscriptionStatus } from '@/data/db/actions/user';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';
import { getUserInvoices } from '@/data/db/actions/invoice';
// TYPES 
import { UserInvoicesQueryType } from './types';
import { IInvoiceFilters } from '@/data/db/actions/types';

export const useUserInvoicesQuery = ({ 
  status,
  limit,
  sort,
}: IInvoiceFilters) => {
  const { user } = useAuth();
  return useQuery<UserInvoicesQueryType[] | null>({
    queryKey: ['user-invoices'],
    queryFn: async () => (
      await getUserInvoices({
        status,
        limit,
        sort,
      })
    ),
    enabled: !!user,
  });
}