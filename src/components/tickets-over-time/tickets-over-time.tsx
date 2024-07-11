import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { db } from '@/db';
import { and, isNotNull } from 'drizzle-orm';
import { usersQuery } from '@/schema';
import Chart from './chart';

async function getTicketsOverTime() {
  const dataPoints = await db.query.usersQuery.findMany({
    where: and(
      isNotNull(usersQuery.queryResponseDatetimeUTC),
      isNotNull(usersQuery.ticketId),
      isNotNull(usersQuery.predAssignment),
    ),
    columns: {
      userQueryDatetimeUTC: true,
      ticketId: true,
      predAssignment: true,
    },
  });

  const predAssignments = new Set(
    dataPoints.map(({ predAssignment }) => predAssignment),
  );

  return {
    predAssignments: Array.from(predAssignments),
    dataPoints,
  };
}

export default async function TicketsOverTime() {
  // const [selectedAssignments, setSelectedAssignments] = React.useState([
  //   assignments[0],
  // ]);

  const ticketsOverTime = await getTicketsOverTime();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets Over Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Chart
          predAssignments={ticketsOverTime.predAssignments.filter(
            (item) => item !== null,
          )}
          dataPoints={ticketsOverTime.dataPoints}
        />
      </CardContent>
      {/* <CardFooter>
        <div className="mx-auto grid grid-cols-2 gap-2 md:grid-cols-3">
          {assignments.map((assignment) => (
            <div key={assignment} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedAssignments.includes(assignment)}
                onCheckedChange={() =>
                  setSelectedAssignments(
                    selectedAssignments.includes(assignment)
                      ? selectedAssignments.filter((a) => a !== assignment)
                      : [...selectedAssignments, assignment],
                  )
                }
                id={assignment}
              />
              <Label htmlFor={assignment}>{assignment}</Label>
            </div>
          ))}
        </div>
      </CardFooter> */}
    </Card>
  );
}
