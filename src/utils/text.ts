import { format } from 'date-fns';

export const convertUnderscoresToSpacesAndCapitalize = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const convertSpacesToUnderscoresAndLowercase = (key: string) => {
  return key
    .replace(/ /g, '_')
    .split('_')
    .map((word) => word.toLowerCase())
    .join('_');
};

export const formatTextForTable = (key: string | null) => {
  if (!key) {
    return '-';
  }

  return convertUnderscoresToSpacesAndCapitalize(key);
};

export const formatDateForTable = (key: Date | null) => {
  if (!key) {
    return null;
  }

  return {
    date: format(key, 'do MMM yyyy'),
    time: format(key, 'HH:mm:ss'),
  };
};

export const formatNumbersForKPIs = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }

  return (value / 1000).toFixed(1) + 'K';
};
