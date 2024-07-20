import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

export default function useDashboardFilters() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const arefiltersApplied =
    searchParams.get('from') ||
    searchParams.get('to') ||
    searchParams.get('priority') ||
    searchParams.get('ticket_id') ||
    searchParams.get('assignment') ||
    searchParams.get('contact') ||
    searchParams.get('query_flag');

  const clearFilters = React.useCallback(() => {
    replace(`${pathname}`, {
      scroll: false,
    });
  }, [pathname, replace]);

  const applyFilters = React.useCallback(
    (filters: string) => {
      replace(`${pathname}?${filters}`, {
        scroll: false,
      });
    },
    [pathname, replace],
  );

  const getFilters = React.useCallback(
    (param: string) => {
      return searchParams.get(param) || undefined;
    },
    [searchParams],
  );

  return { arefiltersApplied, clearFilters, applyFilters, getFilters };
}
