import React from 'react';
import FiltersButtonWithSheet from './filters-button-with-sheet';
import ClearFiltersButton from './clear-filters-button';

export default function MobileFilters() {
  return (
    <div className="flex justify-end gap-5 px-10 xl:hidden">
      <React.Suspense>
        <ClearFiltersButton />
      </React.Suspense>

      <FiltersButtonWithSheet />
    </div>
  );
}
