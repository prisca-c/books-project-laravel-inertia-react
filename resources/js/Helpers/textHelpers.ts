export const toCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const toTitleCase = (text: string): string => {
  return text
    .split(' ')
    .map((word) => toCapitalize(word))
    .join(' ');
};
