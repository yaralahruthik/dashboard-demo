'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CHART_CONFIG } from '@/utils/chartConfig';
import {
  convertSpacesToUnderscoresAndLowercase,
  covertUnderscoresToSpacesAndCapitalize,
} from '@/utils/formatKey';

type ChartProps = {
  dataPoints: {
    count: number;
    predPriority: string;
  }[];
};

export default function Chart({ dataPoints }: ChartProps) {
  const dataPointsWithFill = dataPoints.map((item) => ({
    ...item,
    fill: `var(--color-${convertSpacesToUnderscoresAndLowercase(item.predPriority)})`,
  }));

  return (
    <ChartContainer className="max-h-80 min-h-60 w-full" config={CHART_CONFIG}>
      <BarChart
        accessibilityLayer
        data={dataPointsWithFill}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="predPriority"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={covertUnderscoresToSpacesAndCapitalize}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          dataKey="count"
          label={{
            value: 'Ticket Count',
            angle: -90,
            position: 'left',
          }}
        />
        <Bar dataKey="count" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
}
