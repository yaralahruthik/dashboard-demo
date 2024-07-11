import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { usersQuery } from '@/schema';
import Chart from './chart';
import { cache } from 'react';

const getTicketsOverTime = cache(async () => {
  const ticketsOverTime = await db.execute(sql`
    WITH weekly_data AS (
      SELECT
        DATE_PART('week', ${usersQuery.userQueryDatetimeUTC}) AS week,
        ${usersQuery.predAssignment} AS pred_assignment,
        COUNT(DISTINCT ${usersQuery.ticketId}) AS new_tickets
      FROM ${usersQuery}
      WHERE 
        ${usersQuery.ticketId} IS NOT NULL
        AND ${usersQuery.predAssignment} IS NOT NULL
      GROUP BY 
        DATE_PART('week', ${usersQuery.userQueryDatetimeUTC}),
        ${usersQuery.predAssignment}
    )
    SELECT 
      pred_assignment,
      SUM(new_tickets) AS total_tickets,
      week
    FROM weekly_data
    GROUP BY pred_assignment, week
    ORDER BY pred_assignment, week
  `);

  return ticketsOverTime.map((row) => ({
    predAssignment: row.pred_assignment as string,
    totalTickets: Number(row.total_tickets),
    week: Number(row.week),
  }));
});

export default async function TicketsOverTime() {
  const ticketsOverTime = await getTicketsOverTime();

  const predAssignments = Array.from(
    new Set(ticketsOverTime.map((item) => item.predAssignment)),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets Over Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Chart
          predAssignments={predAssignments.filter((item) => item !== null)}
          dataPoints={ticketsOverTime}
        />
      </CardContent>
    </Card>
  );
}
