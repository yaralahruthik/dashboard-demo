import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { countDistinct, isNotNull } from 'drizzle-orm';
import Chart from './chart';
import { cache } from 'react';

const getTicketsByContactMode = cache(async () => {
  return await db
    .select({
      count: countDistinct(usersQuery.ticketId),
      userQueryMode: usersQuery.userQueryMode,
    })
    .from(usersQuery)
    .where(isNotNull(usersQuery.userQueryMode))
    .groupBy(usersQuery.userQueryMode);
});

export default async function TicketsByContactMode() {
  const ticketsByContactMode = await getTicketsByContactMode();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets By Contact Mode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Chart
          dataPoints={ticketsByContactMode.filter(
            (item): item is { count: number; userQueryMode: string } =>
              item.userQueryMode !== null,
          )}
        />
      </CardContent>
    </Card>
  );
}
