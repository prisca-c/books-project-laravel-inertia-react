export const filterBy = (array: any[], key: string, value: any) => {
  if (value === '') {
    return array;
  }

  return array.filter((item) => {
    return item[key].includes(value);
  });
};
