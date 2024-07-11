import { cache } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { and, countDistinct, isNotNull } from 'drizzle-orm';
import Chart from './chart';
import { Filters, Params } from '../../_types';
import { constructFiltersSQL, getFiltersFromSearchParams } from '../../_utils';

const getTicketsByAIAssignment = cache(async (filters: Filters) => {
  return await db
    .select({
      count: countDistinct(usersQuery.ticketId),
      predAssignment: usersQuery.predAssignment,
    })
    .from(usersQuery)
    .where(
      and(isNotNull(usersQuery.predAssignment), constructFiltersSQL(filters)),
    )
    .groupBy(usersQuery.predAssignment);
});

export default async function TicketsByAIAssignment({ searchParams }: Params) {
  const filters = getFiltersFromSearchParams(searchParams);

  const ticketsByAIAssignment = await getTicketsByAIAssignment(filters);

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
