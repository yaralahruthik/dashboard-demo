import { ChartConfig } from '@/components/ui/chart';

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
  'chat',
  'email',
  'phone',
];

const CHART_CONFIG_PRED_ASSIGNMENT: ChartConfig = {
  admin: {
    label: 'Admin',
    theme: {
      light: `#e41a1c`,
      dark: `#e41a1c`,
    },
  },
  cleaning: {
    label: 'Cleaning',
    theme: {
      light: `#377eb8`,
      dark: `#377eb8`,
    },
  },
  finance: {
    label: 'Finance',
    theme: {
      light: `#4daf4a`,
      dark: `#4daf4a`,
    },
  },
  human_resource: {
    label: 'Human Resource',
    theme: {
      light: `#984ea3`,
      dark: `#984ea3`,
    },
  },
  operations: {
    label: 'Operations',
    theme: {
      light: `#ff7f00`,
      dark: `#ff7f00`,
    },
  },
  plumbing: {
    label: 'Plumbing',
    theme: {
      light: `#f781bf`,
      dark: `#f781bf`,
    },
  },
  other: {
    label: 'Other',
    theme: {
      light: `#a65628`,
      dark: `#a65628`,
    },
  },
};

const CHART_CONFIG_PRIORITY = {
  high: {
    label: 'High',
    theme: {
      light: `#b2182b`,
      dark: `#b2182b`,
    },
  },
  medium: {
    label: 'Medium',
    theme: {
      light: `#e08214`,
      dark: `#e08214`,
    },
  },
  low: {
    label: 'Low',
    theme: {
      light: `#7fbc41`,
      dark: `#7fbc41`,
    },
  },
};

const CHART_CONFIG_CONTACT = {
  chat: {
    label: 'Chat',
    theme: {
      light: `#d7191c`,
      dark: `#d7191c`,
    },
  },
  email: {
    label: 'Email',
    theme: {
      light: `#4dac26`,
      dark: `#4dac26`,
    },
  },
  phone: {
    label: 'Phone',
    theme: {
      light: `#2c7bb6`,
      dark: `#2c7bb6`,
    },
  },
};

export const CHART_CONFIG: ChartConfig = {
  ...CHART_CONFIG_PRED_ASSIGNMENT,
  ...CHART_CONFIG_PRIORITY,
  ...CHART_CONFIG_CONTACT,
};
