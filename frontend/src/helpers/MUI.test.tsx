// Import the required functions and types
import { descendingComparator, getComparator } from "./MUI";
import { Data } from "../App";

type comparatorItem = Record<keyof Data, number | string | number[]>;

describe("descendingComparator", () => {
  it("should return 1 when a > b", () => {
    const a: comparatorItem = {
      id: "1",
      reviews: [1],
      title: "A",
      filmCompanyId: "1",
      cost: 10,
      releaseYear: 2020,
    };
    const b: comparatorItem = {
      id: "2",
      reviews: [2],
      title: "B",
      filmCompanyId: "2",
      cost: 20,
      releaseYear: 2020,
    };

    expect(descendingComparator(a, b, "cost")).toBe(1);
  });
  it("should return -1 when a < b", () => {
    const a: comparatorItem = {
      id: "1",
      reviews: [1],
      title: "A",
      filmCompanyId: "1",
      cost: 20,
      releaseYear: 2020,
    };
    const b: comparatorItem = {
      id: "2",
      reviews: [2],
      title: "B",
      filmCompanyId: "2",
      cost: 10,
      releaseYear: 2020,
    };

    expect(descendingComparator(a, b, "cost")).toBe(-1);
  });

  it("should return 0 when a === b", () => {
    const a: comparatorItem = {
      id: "1",
      reviews: [1],
      title: "A",
      filmCompanyId: "1",
      cost: 20,
      releaseYear: 2020,
    };
    const b: comparatorItem = {
      id: "2",
      reviews: [2],
      title: "B",
      filmCompanyId: "2",
      cost: 20,
      releaseYear: 2020,
    };

    expect(descendingComparator(a, b, "cost")).toBe(0);
  });
});

describe("getComparator", () => {
  const data: Data[] = [
    {
      id: "1",
      reviews: [1],
      title: "A",
      filmCompanyId: "1",
      cost: 100,
      releaseYear: 2020,
    },
    {
      id: "2",
      reviews: [2],
      title: "B",
      filmCompanyId: "2",
      cost: 200,
      releaseYear: 2019,
    },
    {
      id: "3",
      reviews: [3],
      title: "C",
      filmCompanyId: "3",
      cost: 50,
      releaseYear: 2021,
    },
  ];

  it("should return a comparator that sorts ascending", () => {
    const comparator = getComparator("asc", "cost");
    const sorted = [...data].sort(comparator);
    expect(sorted.map((item) => item.cost)).toEqual([50, 100, 200]);
  });

  it("should return a comparator that sorts descending", () => {
    const comparator = getComparator("desc", "cost");
    const sorted = [...data].sort(comparator);
    expect(sorted.map((item) => item.cost)).toEqual([200, 100, 50]);
  });

  it("should return a comparator that sorts by title in ascending order", () => {
    const comparator = getComparator("asc", "title");
    const sorted = [...data].sort(comparator);
    expect(sorted.map((item) => item.title)).toEqual(["A", "B", "C"]);
  });

  it("should return a comparator that sorts by title in descending order", () => {
    const comparator = getComparator("desc", "title");
    const sorted = [...data].sort(comparator);
    expect(sorted.map((item) => item.title)).toEqual(["C", "B", "A"]);
  });
});
