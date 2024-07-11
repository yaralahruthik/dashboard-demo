import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import FiltersForm from './filters-form';
import { Button } from '@/components/ui/button';
import { FilterIcon } from 'lucide-react';
import MobileClearFilterButton from './mobile-clear-filter-button';

export default function MobileFilters() {
  return (
    <div className="ml-auto flex justify-between gap-5 px-10 lg:hidden">
      <MobileClearFilterButton />

      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm">
            <FilterIcon size={20} className="mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent className="space-y-4" side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <FiltersForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}
