import KPIs from '@/components/kpis';
import TicketsByAIAssignment from '@/components/tickets-by-ai-assignment/tickets-by-ai-assignment';
import TicketsByContactMode from '@/components/tickets-by-contact-mode';
import TicketsByPriority from '@/components/tickets-by-priority';
import TicketsOverTime from '@/components/tickets-over-time';

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <KPIs />
      {/* <TicketsOverTime /> */}
      <TicketsByAIAssignment />
      <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2">
        <TicketsByPriority />
        <TicketsByContactMode />
      </div>
    </div>
  );
}
