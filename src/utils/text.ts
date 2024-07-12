export const convertUnderscoresToSpacesAndCapitalize = (key: string) => {
  // Convert underscores to spaces and capitalize each word
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const convertSpacesToUnderscoresAndLowercase = (key: string) => {
  // Convert spaces and lowercase each word
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
