import { cache } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { and, countDistinct, isNotNull } from 'drizzle-orm';
import Chart from './chart';
import { Filters, Params } from '../../_types';
import { constructFiltersSQL, getFiltersFromSearchParams } from '../../_utils';

const getTicketsByPriority = cache(async (filters: Filters) => {
  return await db
    .select({
      count: countDistinct(usersQuery.ticketId),
      predPriority: usersQuery.predPriority,
    })
    .from(usersQuery)
    .where(
      and(isNotNull(usersQuery.predPriority), constructFiltersSQL(filters)),
    )
    .groupBy(usersQuery.predPriority);
});

export default async function TicketsByPriority({ searchParams }: Params) {
  const filters = getFiltersFromSearchParams(searchParams);

  const ticketsByPriority = await getTicketsByPriority(filters);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets By Priority</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Chart
          dataPoints={ticketsByPriority.filter(
            (item): item is { count: number; predPriority: string } =>
              item.predPriority !== null,
          )}
        />
      </CardContent>
    </Card>
  );
}
