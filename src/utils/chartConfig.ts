import { ChartConfig } from '@/components/ui/chart';
import { COLORS } from './colors';
import { covertUnderscoresToSpacesAndCapitalize } from './formatKey';

const keys = [
  'admin',
  'cleaning',
  'finance',
  'human_resource',
  'operations',
  'other',
  'plumbing',
  'high',
  'low',
  'medium',
];

export const CHART_CONFIG: ChartConfig = Object.fromEntries(
  keys.map((key, index) => [
    key,
    {
      label: covertUnderscoresToSpacesAndCapitalize(key),
      theme: {
        light: COLORS[index][0],
        dark: COLORS[index][1],
      },
    },
  ]),
);
