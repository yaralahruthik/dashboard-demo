import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { and, countDistinct, isNotNull } from 'drizzle-orm';
import Chart from './chart';
import { cache } from 'react';
import { Filters, Params } from '../../_types';
import { constructFiltersSQL, getFiltersFromSearchParams } from '../../_utils';

const getTicketsByContactMode = cache(async (filters: Filters) => {
  const results = await db
    .select({
      count: countDistinct(usersQuery.ticketId).as('count'),
      userQueryMode: usersQuery.userQueryMode,
    })
    .from(usersQuery)
    .where(
      and(isNotNull(usersQuery.userQueryMode), constructFiltersSQL(filters)),
    )
    .groupBy(usersQuery.userQueryMode);

  const totalCount = results.reduce((sum, row) => sum + row.count, 0);

  return results.map((row) => ({
    userQueryMode: row.userQueryMode,
    percentage: +((row.count / totalCount) * 100).toFixed(2),
  }));
});

export default async function TicketsByContactMode({ searchParams }: Params) {
  const filters = getFiltersFromSearchParams(searchParams);

  const ticketsByContactMode = await getTicketsByContactMode(filters);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets By Contact Mode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Chart
          dataPoints={ticketsByContactMode.filter(
            (item): item is { percentage: number; userQueryMode: string } =>
              item.userQueryMode !== null,
          )}
        />
      </CardContent>
    </Card>
  );
}
