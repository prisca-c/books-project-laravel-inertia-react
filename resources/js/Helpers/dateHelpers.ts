export const toDateNomalized = (date: string): string => {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
