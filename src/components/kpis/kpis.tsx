import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/db';
import { usersQuery } from '@/schema';
import { countDistinct, eq, sql } from 'drizzle-orm';
import SeedDataButton from '../seed-data-button';

async function getTicketStats() {
  const totalTickets = await db
    .select({ value: countDistinct(usersQuery.ticketId) })
    .from(usersQuery)
    .limit(1);

  const REJECTED = 27;

  return {
    totalTickets: totalTickets[0].value,
    accepted: totalTickets[0].value - REJECTED,
    rejected: REJECTED,
  };
}

async function getNumberOfAIAssignments() {
  return (
    await db
      .select({ value: countDistinct(usersQuery.ticketId) })
      .from(usersQuery)
      .where(eq(usersQuery.predAssignmentManualFlag, false))
      .limit(1)
  )[0];
}

async function getNumberOfManualAssignments() {
  return (
    await db
      .select({ value: countDistinct(usersQuery.ticketId) })
      .from(usersQuery)
      .where(eq(usersQuery.predAssignmentManualFlag, true))
      .limit(1)
  )[0];
}

async function getAverageAssignmentTime() {
  const result = await db
    .select({
      value: sql<number>`
        AVG(
          EXTRACT(EPOCH FROM (${usersQuery.queryResponseDatetimeUTC} - ${usersQuery.userQueryDatetimeUTC}))
        )`.as('avgTime'),
    })
    .from(usersQuery)
    .where(
      sql`${usersQuery.queryResponseDatetimeUTC} IS NOT NULL AND ${usersQuery.userQueryDatetimeUTC} IS NOT NULL`,
    );

  const average = result[0].value || 0;

  return {
    value: average,
  };
}

export default async function KPIs() {
  const { totalTickets, accepted, rejected } = await getTicketStats();
  const { value: numberOfAIAssignments } = await getNumberOfAIAssignments();
  const { value: numberOfManualAssignments } =
    await getNumberOfManualAssignments();

  const { value: averageAssignmentTime } = await getAverageAssignmentTime();

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
            {(+averageAssignmentTime).toPrecision(3)} Seconds
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
