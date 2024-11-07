import { giveAverage } from "./maths";

describe("giveAverage", () => {
  test("should return 0 for an empty array", () => {
    expect(giveAverage([])).toBe(0);
  });

  test("should calculate the correct average for a list of positive numbers", () => {
    expect(giveAverage([2, 4, 6, 8])).toBe(5);
  });

  test("should return correct string to 1 decimal place when .toFixed(1) is used", () => {
    expect(/7.6/.exec(giveAverage([6, 8, 7, 9, 8, 7, 8]).toFixed(1))); // 7.571428571428571 should round up to 7.6
  });

  test("should calculate the correct average for a list of mixed positive and negative numbers", () => {
    expect(giveAverage([-2, 2, -4, 4])).toBe(0);
  });
});
