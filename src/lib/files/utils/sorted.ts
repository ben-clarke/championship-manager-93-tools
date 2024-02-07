export const getSortedList = (data: Record<string, string>): string[] => {
  const sorted = Object.keys(data)
    .sort(sortHexNumbers)
    .reduce((acc, key) => {
      acc.push(data[key]);
      return acc;
    }, [] as string[]);

  return sorted;
};

const sortHexNumbers = (a: string, b: string): number => parseInt(a, 16) - parseInt(b, 16);
