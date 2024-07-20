import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { formatNumbersForKPIs } from '@/utils/text';
import { and, countDistinct, eq, sql } from 'drizzle-orm';
import { Filters, Params } from '../../_types';
import {
  constructFiltersSQL,
  getFiltersFromSearchParams,
  getUserQueryDateRangeSQL,
} from '../../_utils';

async function getTicketStats(filters: Filters) {
  let query = db
    .select({
      total: countDistinct(usersQuery.ticketId),
      accepted: countDistinct(
        sql`CASE WHEN ${usersQuery.isQueryFlag} THEN ${usersQuery.ticketId} ELSE NULL END`,
      ),
    })
    .from(usersQuery)
    .where(constructFiltersSQL(filters));

  const totalTickets = await query.limit(1);

  return {
    totalTickets: totalTickets[0].total,
    accepted: totalTickets[0].accepted,
    rejected: totalTickets[0].total - totalTickets[0].accepted,
  };
}

async function getNumberOfAIAssignments(filters: Filters) {
  return (
    await db
      .select({ value: countDistinct(usersQuery.ticketId) })
      .from(usersQuery)
      .where(
        and(
          eq(usersQuery.predAssignmentManualFlag, false),
          constructFiltersSQL(filters),
        ),
      )
      .limit(1)
  )[0];
}

async function getNumberOfManualAssignments(filters: Filters) {
  return (
    await db
      .select({ value: countDistinct(usersQuery.ticketId) })
      .from(usersQuery)
      .where(
        and(
          eq(usersQuery.predAssignmentManualFlag, true),
          getUserQueryDateRangeSQL(filters.dateRange),
        ),
      )
      .limit(1)
  )[0];
}

async function getAverageAssignmentTime(filters: Filters) {
  const result = await db
    .select({
      value: sql<number>`
        AVG(
          EXTRACT(EPOCH FROM (${usersQuery.queryResponseDatetimeUTC} - ${usersQuery.userQueryDatetimeUTC}))
        )`.as('avgTime'),
    })
    .from(usersQuery)
    .where(
      and(
        sql`${usersQuery.queryResponseDatetimeUTC} IS NOT NULL AND ${usersQuery.userQueryDatetimeUTC} IS NOT NULL`,
        constructFiltersSQL(filters),
      ),
    );

  const average = result[0].value || 0;

  return {
    value: average,
  };
}

export default async function KPIs({ searchParams }: Params) {
  const filters = getFiltersFromSearchParams(searchParams);

  const [
    { totalTickets, accepted, rejected },
    { value: numberOfAIAssignments },
    { value: numberOfManualAssignments },
    { value: averageAssignmentTime },
  ] = await Promise.all([
    getTicketStats(filters),
    getNumberOfAIAssignments(filters),
    getNumberOfManualAssignments(filters),
    getAverageAssignmentTime(filters),
  ]);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription>Total Number of Tickets</CardDescription>
          <CardTitle className="text-4xl">
            {formatNumbersForKPIs(totalTickets)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between gap-2">
              <span>Accepted</span>
              <span>{formatNumbersForKPIs(accepted)}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Rejected</span>
              <span>{formatNumbersForKPIs(rejected)}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="h-full justify-between">
          <CardDescription>Average Assignment Time Per Ticket</CardDescription>
          <CardTitle className="text-4xl">
            {(+averageAssignmentTime).toPrecision(3)}{' '}
            <span className="text-lg">Seconds</span>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="h-full justify-between">
          <CardDescription>Number of AI Assignments</CardDescription>
          <CardTitle className="text-4xl">
            {formatNumbersForKPIs(numberOfAIAssignments)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="h-full justify-between">
          <CardDescription>Number of Manual Assignments</CardDescription>
          <CardTitle className="text-4xl">
            {formatNumbersForKPIs(numberOfManualAssignments)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
