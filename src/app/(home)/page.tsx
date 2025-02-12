import KPIs from './_components/kpis';
import QueriesTable from './_components/queries-table';
import TicketsByAIAssignment from './_components/tickets-by-ai-assignment';
import TicketsByContactMode from './_components/tickets-by-contact-mode';
import TicketsByPriority from './_components/tickets-by-priority';
import { Params } from './_types';

export default function Home({ searchParams }: Params) {
  return (
    <div className="flex flex-col gap-10 px-10 pb-10">
      <KPIs searchParams={searchParams} />
      <TicketsByAIAssignment searchParams={searchParams} />
      <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2">
        <TicketsByPriority searchParams={searchParams} />
        <TicketsByContactMode searchParams={searchParams} />
      </div>
      <QueriesTable searchParams={searchParams} />
    </div>
  );
}
