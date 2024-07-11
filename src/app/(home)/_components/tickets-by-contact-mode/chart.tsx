'use client';

import { Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CHART_CONFIG } from '@/utils/chartConfig';
import { convertSpacesToUnderscoresAndLowercase } from '@/utils/formatKey';

type ChartProps = {
  dataPoints: {
    percentage: number;
    userQueryMode: string;
  }[];
};

export default function Chart({ dataPoints }: ChartProps) {
  const dataPointsWithFill = dataPoints.map((item) => ({
    ...item,
    fill: `var(--color-${convertSpacesToUnderscoresAndLowercase(item.userQueryMode)})`,
  }));

  return (
    <ChartContainer className="max-h-80 min-h-60 w-full" config={CHART_CONFIG}>
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={dataPointsWithFill}
          dataKey="percentage"
          nameKey="userQueryMode"
          label={(value) => `${value.percentage}%`}
        />
        <ChartLegend content={<ChartLegendContent nameKey="userQueryMode" />} />
      </PieChart>
    </ChartContainer>
  );
}
