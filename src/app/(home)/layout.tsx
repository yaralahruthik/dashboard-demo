import Sidebar from '@/components/sidebar';

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full px-10">{children}</div>
    </main>
  );
}
