import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { countDistinct, isNotNull } from 'drizzle-orm';
import Chart from './chart';

async function getTicketsByPriority() {
  return await db
    .select({
      count: countDistinct(usersQuery.ticketId),
      manualPriority: usersQuery.manualPriority,
    })
    .from(usersQuery)
    .where(isNotNull(usersQuery.manualPriority))
    .groupBy(usersQuery.manualPriority);
}

export default async function TicketsByPriority() {
  const ticketsByPriority = await getTicketsByPriority();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets By Priority</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Chart
          dataPoints={ticketsByPriority.filter(
            (item): item is { count: number; manualPriority: string } =>
              item.manualPriority !== null,
          )}
        />
      </CardContent>
    </Card>
  );
}
