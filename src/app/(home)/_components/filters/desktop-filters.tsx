import FiltersForm from './filters-form';

export default function DesktopFilters() {
  return (
    <div className="hidden w-full max-w-xs space-y-4 border-r px-5 lg:block">
      <span className="text-2xl">Filters</span>
      <FiltersForm />
    </div>
  );
}
