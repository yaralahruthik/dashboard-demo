'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { COLORS } from '@/utils/colors';

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

type ChartProps = {
  predAssignments: string[];
  dataPoints: {
    userQueryDatetimeUTC: Date | null;
    ticketId: string | null;
    predAssignment: string | null;
  }[];
};

export default function Chart({ predAssignments, dataPoints }: ChartProps) {
  const chartConfig = getChartConfig(predAssignments);

  return (
    <ChartContainer className="max-h-80 min-h-60 w-full" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={dataPoints}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="userQueryDatetimeUTC"
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
          dataKey="ticketId"
          label={{
            value: 'Tickets',
            angle: -90,
            position: 'left',
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend className="mt-4" content={<ChartLegendContent />} />
        {predAssignments.map((assignment) => (
          <Line
            key={assignment}
            dataKey="ticketId"
            type="monotone"
            stroke={`var(--color-${assignment})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
