import { cache } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { countDistinct, isNotNull } from 'drizzle-orm';
import Chart from './chart';

const getTicketsByAIAssignment = cache(async () => {
  return await db
    .select({
      count: countDistinct(usersQuery.ticketId),
      predAssignment: usersQuery.predAssignment,
    })
    .from(usersQuery)
    .where(isNotNull(usersQuery.predAssignment))
    .groupBy(usersQuery.predAssignment);
});

export default async function TicketsByAIAssignment() {
  const ticketsByAIAssignment = await getTicketsByAIAssignment();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets By AI Assignment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Chart
          dataPoints={ticketsByAIAssignment.filter(
            (item): item is { count: number; predAssignment: string } =>
              item.predAssignment !== null,
          )}
        />
      </CardContent>
    </Card>
  );
}
