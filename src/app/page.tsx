import KPIs from '@/components/kpis';
import TicketsByAIAssignment from '@/components/tickets-by-ai-assignment/tickets-by-ai-assignment';
import TicketsOverTime from '@/components/tickets-over-time';

export default function Home() {
  return (
    <main className="container flex flex-col gap-10 py-10">
      <KPIs />
      {/* <TicketsOverTime /> */}
      <TicketsByAIAssignment />
    </main>
  );
}
