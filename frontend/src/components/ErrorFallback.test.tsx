/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorFallback } from "./ErrorFallback";

// Helper to mock window.location.reload
const mockWindowReload = () => {
  const originalReload = window.location.reload;
  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });
  afterAll(() => {
    window.location.reload = originalReload;
  });
};

describe("ErrorFallback", () => {
  it("should display the error message", () => {
    const errorMessage = "Something went wrong!";
    render(<ErrorFallback errorMessage={errorMessage} />);

    expect(
      screen.getByText(`Error fetching data: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  describe("Refresh button", () => {
    mockWindowReload();

    it("should have a refresh button that reloads the page", () => {
      render(<ErrorFallback errorMessage="Error message" />);

      const button = screen.getByRole("button", { name: /refresh page/i });
      fireEvent.click(button);

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });
});
