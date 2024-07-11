'use client';

import { Button } from '@/components/ui/button';
import useFilters from '../../_hooks/use-filters';

export default function MobileClearFilterButton() {
  const { arefiltersApplied, clearFilters } = useFilters();

  if (!arefiltersApplied) return null;

  return (
    <Button onClick={clearFilters} size="sm" variant="destructive">
      Clear Filters
    </Button>
  );
}
