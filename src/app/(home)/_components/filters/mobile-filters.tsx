'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import FiltersForm from './filters-form';
import { Button } from '@/components/ui/button';
import { FilterIcon } from 'lucide-react';
import MobileClearFilterButton from './mobile-clear-filter-button';
import React from 'react';

export default function MobileFilters() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex justify-end gap-5 px-10 lg:hidden">
      <MobileClearFilterButton />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger onClick={() => setIsOpen(true)} asChild>
          <Button size="sm">
            <FilterIcon size={20} className="mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent className="space-y-4" side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <SheetDescription className="sr-only">
            Apply Filters to the dashboard
          </SheetDescription>

          <FiltersForm postApply={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
