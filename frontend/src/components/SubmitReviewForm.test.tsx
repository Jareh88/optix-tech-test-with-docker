import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SubmitReviewForm } from "./SubmitReviewForm";

describe("<SubmitReviewForm>", () => {
  it("should render component", () => {
    render(<SubmitReviewForm selectedRow={"0"} />);
  });
  // Tests here
});
