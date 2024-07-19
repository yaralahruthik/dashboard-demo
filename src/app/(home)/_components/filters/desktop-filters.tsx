import React from 'react';
import FiltersForm from './filters-form';

export default function DesktopFilters() {
  return (
    <div className="hidden min-w-80 max-w-80 border-r pl-10 pr-5 xl:block">
      <div className="sticky top-14 space-y-4">
        <span className="text-2xl">Filters</span>
        <React.Suspense>
          <FiltersForm />
        </React.Suspense>
      </div>
    </div>
  );
}
