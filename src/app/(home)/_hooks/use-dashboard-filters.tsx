import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

export default function useDashboardFilters() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const arefiltersApplied = searchParams.get('from') || searchParams.get('to');

  const clearFilters = React.useCallback(() => {
    replace(`${pathname}`);
  }, [pathname, replace]);

  const applyFilters = React.useCallback(
    (filters: string) => {
      replace(`${pathname}?${filters}`);
    },
    [pathname, replace],
  );

  const getFilters = React.useCallback(() => {
    const params: Record<string, string> = {};
    if (searchParams.get('from') && searchParams.get('to')) {
      params['from'] = searchParams.get('from')!;
      params['to'] = searchParams.get('to')!;
    }

    return params;
  }, [searchParams]);

  return { arefiltersApplied, clearFilters, applyFilters, getFilters };
}
