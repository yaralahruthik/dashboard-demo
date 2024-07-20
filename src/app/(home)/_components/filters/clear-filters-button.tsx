'use client';

import { Button } from '@/components/ui/button';
import useDashboardFilters from '../../_hooks/use-dashboard-filters';

export default function ClearFiltersButton() {
  const { arefiltersApplied, clearFilters } = useDashboardFilters();

  if (!arefiltersApplied) return null;

  return (
    <Button onClick={clearFilters} size="sm" variant="destructive">
      Clear Filters
    </Button>
  );
}
