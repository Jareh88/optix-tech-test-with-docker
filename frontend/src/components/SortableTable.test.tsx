import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SortableTable } from "./SortableTable";
import { Data } from "../App";

describe("SortableTable Component", () => {
  const mockData: Data[] = [
    {
      id: "1",
      reviews: [3, 8, 7],
      title: "Shiny underpants",
      filmCompanyId: "1",
      cost: 1020,
      releaseYear: 2001,
    },
    {
      id: "2",
      reviews: [5, 9, 7],
      title: "Stop right there",
      filmCompanyId: "2",
      cost: 1500,
      releaseYear: 1999,
    },
  ];

  it("renders the table with the correct data", () => {
    render(
      <SortableTable
        rows={mockData}
        categories={[{ id: "1", name: "Mock Film Company" }]}
        selected={null}
        handleClick={jest.fn()}
        order="asc"
        orderBy="title"
        handleSort={jest.fn()}
      />
    );

    expect(screen.getByText("Shiny underpants")).toBeInTheDocument();
    expect(screen.getByText("Stop right there")).toBeInTheDocument();
  });

  it("calls handleClick when a row is clicked", () => {
    const handleClick = jest.fn();
    render(
      <SortableTable
        rows={mockData}
        categories={[{ id: "1", name: "Mock Film Company" }]}
        selected={null}
        handleClick={handleClick}
        order="asc"
        orderBy="title"
        handleSort={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Shiny underpants"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
