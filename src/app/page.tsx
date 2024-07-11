import KPIs from '@/components/kpis';
import TicketsOverTime from '@/components/tickets-over-time';

export default function Home() {
  return (
    <main className="container flex flex-col gap-10 py-10">
      <KPIs />
      <TicketsOverTime />
    </main>
  );
}
