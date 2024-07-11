import { cache } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { and, countDistinct, isNotNull } from 'drizzle-orm';
import Chart from './chart';
import { DateRange, Params } from '../../_types';
import {
  getDateRangeFromSearchParams,
  getUserQueryDateRangeSQL,
} from '../../_utils';

const getTicketsByPriority = cache(async (dateRange: DateRange) => {
  return await db
    .select({
      count: countDistinct(usersQuery.ticketId),
      predPriority: usersQuery.predPriority,
    })
    .from(usersQuery)
    .where(
      and(
        isNotNull(usersQuery.predPriority),
        getUserQueryDateRangeSQL(dateRange),
      ),
    )
    .groupBy(usersQuery.predPriority);
});

export default async function TicketsByPriority({ searchParams }: Params) {
  const dateRange = getDateRangeFromSearchParams(searchParams);

  const ticketsByPriority = await getTicketsByPriority(dateRange);

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
