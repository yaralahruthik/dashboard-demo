import { ChartConfig } from '@/components/ui/chart';
import { COLORS } from './colors';

export const CHART_CONFIG: ChartConfig = {
  admin: {
    label: 'Admin',
    theme: {
      light: COLORS[0][1],
      dark: COLORS[0][0],
    },
  },
  cleaning: {
    label: 'Cleaning',
    theme: {
      light: COLORS[1][1],
      dark: COLORS[1][0],
    },
  },
  finance: {
    label: 'Finance',
    theme: {
      light: COLORS[2][1],
      dark: COLORS[2][0],
    },
  },
  human_resource: {
    label: 'Human Resource',
    theme: {
      light: COLORS[3][1],
      dark: COLORS[3][0],
    },
  },
  operations: {
    label: 'Operations',
    theme: {
      light: COLORS[4][1],
      dark: COLORS[4][0],
    },
  },
  other: {
    label: 'Other',
    theme: {
      light: COLORS[5][1],
      dark: COLORS[5][0],
    },
  },
  plumbing: {
    label: 'Plumbing',
    theme: {
      light: COLORS[6][1],
      dark: COLORS[6][0],
    },
  },
};
