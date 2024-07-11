'use client';

import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { COLORS } from '@/utils/colors';
import { TICKETS_OVER_TIME_DATA } from '@/utils/mock-data';

const assignments = [
  'plumbing',
  'finance',
  'human_resource',
  'operations',
  'admin',
  'cleaning',
];

function getChartConfig(assignments: string[]): ChartConfig {
  return Object.fromEntries(
    assignments.map((assignment, index) => [
      assignment.toLowerCase(),
      {
        label: assignment,
        theme: {
          dark: COLORS[index][0],
          light: COLORS[index][1],
        },
      },
    ]),
  );
}

export default function TicketsOverTime() {
  const [selectedAssignments, setSelectedAssignments] = React.useState([
    assignments[0],
  ]);

  const chartConfig = getChartConfig(selectedAssignments);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets Over Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChartContainer
          className="max-h-80 min-h-60 w-full"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={TICKETS_OVER_TIME_DATA}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: 'Week Number',
                position: 'bottom',
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: 'Tickets',
                angle: -90,
                position: 'left',
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend className="mt-4" content={<ChartLegendContent />} />
            {selectedAssignments.map((assignment) => (
              <Line
                key={assignment}
                dataKey={assignment}
                type="monotone"
                stroke={`var(--color-${assignment})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}
