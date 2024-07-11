'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CHART_CONFIG } from '@/utils/chartConfig';

const chartData = [
  { week: 1, admin: 186, cleaning: 80 },
  { week: 2, admin: 305, cleaning: 200 },
  { week: 3, admin: 237, cleaning: 120 },
  { week: 4, admin: 73, cleaning: 190 },
  { week: 5, admin: 209, cleaning: 130 },
  { week: 6, admin: 214, cleaning: 140 },
];

export default function Chart() {
  return (
    <ChartContainer config={CHART_CONFIG}>
      <LineChart
        accessibilityLayer
        data={chartData}
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
          tickMargin={8}
          label={{ value: 'Week Number', position: 'bottom' }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{ value: 'Ticket Count', angle: -90, position: 'left' }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend className="mt-2" content={<ChartLegendContent />} />
        <Line
          dataKey="admin"
          type="monotone"
          stroke="var(--color-admin)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="cleaning"
          type="monotone"
          stroke="var(--color-cleaning)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
