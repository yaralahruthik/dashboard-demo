'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FilterIcon } from 'lucide-react';
import FiltersForm from './filters-form';

export default function FiltersButtonWithSheet() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger onClick={() => setIsOpen(true)} asChild>
        <Button size="sm">
          <FilterIcon size={20} className="mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        className="max-h-screen space-y-4 overflow-y-auto"
        side="left"
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <SheetDescription className="sr-only">
          Apply Filters to the dashboard
        </SheetDescription>

        <FiltersForm postApply={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
