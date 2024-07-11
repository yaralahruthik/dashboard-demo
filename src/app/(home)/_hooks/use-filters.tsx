import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function useFilters() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const arefiltersApplied = searchParams.get('from') || searchParams.get('to');

  const clearFilters = () => {
    replace(`${pathname}`);
  };

  return { arefiltersApplied, clearFilters };
}
