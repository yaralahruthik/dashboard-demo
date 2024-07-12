import Filters from './_components/filters';

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="flex flex-col gap-5 xl:flex-row">
      <Filters />
      <div className="xl:w-1 xl:flex-1">{children}</div>
    </main>
  );
}
