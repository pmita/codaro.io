
// DATA
import { getUserSubscriptionStatus } from '@/data/db/user';
// PACKAGES
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';
import { getUserInvoices } from '@/data/db/invoice';
// TYPES 
import { UserInvoicesQueryType } from './types';
import { useFilterSearchParams } from '@/hooks/useFilterSearchParams';


export type SearchFiltersParams = {
  limit?: number | null;
  status?: string | null;
  sort?: string | null;
}

export const useUserInvoicesQuery = () => {
  const { status, limit, sort } = useFilterSearchParams();
  const { user } = useAuth();
  return useInfiniteQuery<UserInvoicesQueryType[] | null>({
    queryKey: ['user-invoices', { status, limit, sort }],
    queryFn: async (context) => {
      const pageParam = context.pageParam as SearchFiltersParams;
      return await getUserInvoices(pageParam);
    },
    initialPageParam: { status, limit, sort, startAfter: null },
    getNextPageParam: (lastPage) => {
      const lastPageData = lastPage ? lastPage[lastPage.length - 1] : null;

      if (lastPageData) {
        const { createdAt, id } = lastPageData;
        const startAfter = {
          createdAt: createdAt,
          id: id,
        };
        return {
          status,
          limit,
          sort,
          startAfter,
        };
      }
    },
    enabled: !!user,
  });
}