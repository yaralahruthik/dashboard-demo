import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { and, countDistinct, eq, sql } from 'drizzle-orm';
import { DateRange, Params } from '../../types';

function getDateRange(searchParams: Params['searchParams']) {
  if (searchParams.from && searchParams.to) {
    const from = searchParams.from;
    const to = searchParams.to;

    return { from, to };
  }

  return null;
}

async function getTicketStats(dateRange: DateRange) {
  let query = db
    .select({ value: countDistinct(usersQuery.ticketId) })
    .from(usersQuery)
    .where(
      dateRange?.from && dateRange?.to
        ? sql`${usersQuery.userQueryDatetimeUTC} BETWEEN ${dateRange.from} AND ${dateRange.to}`
        : undefined,
    );

  const totalTickets = await query.limit(1);

  const REJECTED = 27;

  return {
    totalTickets: totalTickets[0].value,
    accepted: totalTickets[0].value - REJECTED,
    rejected: REJECTED,
  };
}

async function getNumberOfAIAssignments(dateRange: DateRange) {
  return (
    await db
      .select({ value: countDistinct(usersQuery.ticketId) })
      .from(usersQuery)
      .where(
        and(
          eq(usersQuery.predAssignmentManualFlag, false),
          dateRange?.from && dateRange?.to
            ? sql`${usersQuery.userQueryDatetimeUTC} BETWEEN ${dateRange.from} AND ${dateRange.to}`
            : undefined,
        ),
      )
      .limit(1)
  )[0];
}

async function getNumberOfManualAssignments(dateRange: DateRange) {
  return (
    await db
      .select({ value: countDistinct(usersQuery.ticketId) })
      .from(usersQuery)
      .where(
        and(
          eq(usersQuery.predAssignmentManualFlag, true),
          dateRange?.from && dateRange?.to
            ? sql`${usersQuery.userQueryDatetimeUTC} BETWEEN ${dateRange.from} AND ${dateRange.to}`
            : undefined,
        ),
      )
      .limit(1)
  )[0];
}

async function getAverageAssignmentTime(dateRange: DateRange) {
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
        dateRange?.from && dateRange?.to
          ? sql`${usersQuery.userQueryDatetimeUTC} BETWEEN ${dateRange.from} AND ${dateRange.to}`
          : undefined,
      ),
    );

  const average = result[0].value || 0;

  return {
    value: average,
  };
}

export default async function KPIs({ searchParams }: Params) {
  const dateRange = getDateRange(searchParams);

  const [
    { totalTickets, accepted, rejected },
    { value: numberOfAIAssignments },
    { value: numberOfManualAssignments },
    { value: averageAssignmentTime },
  ] = await Promise.all([
    getTicketStats(dateRange),
    getNumberOfAIAssignments(dateRange),
    getNumberOfManualAssignments(dateRange),
    getAverageAssignmentTime(dateRange),
  ]);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription>Total Number of Tickets</CardDescription>
          <CardTitle className="text-4xl">{totalTickets}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between gap-2">
              <span>Accepted</span>
              <span>{accepted}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Rejected</span>
              <span>{rejected}</span>
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
          <CardTitle className="text-4xl">{numberOfAIAssignments}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="h-full justify-between">
          <CardDescription>Number of Manual Assignments</CardDescription>
          <CardTitle className="text-4xl">
            {numberOfManualAssignments}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
