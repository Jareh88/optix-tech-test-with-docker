import "@testing-library/jest-dom";
import { ReviewContent } from "./ReviewContent";
import { render } from "@testing-library/react";

const mockData = {
  title: "Test Movie",
  id: "10",
};

describe("<ReviewContent>", () => {
  it("should render component", () => {
    render(<ReviewContent selectedRow={mockData} />);
  });
  // Tests here
});
