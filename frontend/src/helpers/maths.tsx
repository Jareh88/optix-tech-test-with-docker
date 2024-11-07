export const giveAverage = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0;
  }
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const average = sum / arr.length;
  return isNaN(average) ? 0 : average;
};
