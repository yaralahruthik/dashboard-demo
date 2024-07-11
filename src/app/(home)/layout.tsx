import Sidebar from '@/components/sidebar';
import Filters from './_components/filters';

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="flex">
      <Sidebar>
        <Filters />
      </Sidebar>
      <div className="w-full px-10">{children}</div>
    </main>
  );
}
