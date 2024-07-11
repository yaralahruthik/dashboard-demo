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

const getTicketsByAIAssignment = cache(async (dateRange: DateRange) => {
  return await db
    .select({
      count: countDistinct(usersQuery.ticketId),
      predAssignment: usersQuery.predAssignment,
    })
    .from(usersQuery)
    .where(
      and(
        isNotNull(usersQuery.predAssignment),
        getUserQueryDateRangeSQL(dateRange),
      ),
    )
    .groupBy(usersQuery.predAssignment);
});

export default async function TicketsByAIAssignment({ searchParams }: Params) {
  const dateRange = getDateRangeFromSearchParams(searchParams);

  const ticketsByAIAssignment = await getTicketsByAIAssignment(dateRange);

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
