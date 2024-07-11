import Filters from './_components/filters';

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="flex flex-col gap-5 lg:flex-row">
      <Filters />

      <div className="w-full px-10">{children}</div>
    </main>
  );
}
