import Filters from '@/components/filters';

export default function Sidebar() {
  return (
    <div className="hidden w-full max-w-xs border-r px-5 lg:block">
      <Filters />
    </div>
  );
}
