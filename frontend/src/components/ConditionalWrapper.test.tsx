import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ConditionalWrapper } from "./ConditionalWrapper";

const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="wrapper">{children}</div>
);

const FallbackComponent = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="fallback">{children}</div>
);

const mockChild = <span data-testid="child">Hello, World!</span>;

describe("ConditionalWrapper", () => {
  test("renders children wrapped in wrapper when condition is true", () => {
    render(
      <ConditionalWrapper
        condition={true}
        wrapper={(children) => <WrapperComponent>{children}</WrapperComponent>}
        fallbackWrapper={(children) => (
          <FallbackComponent>{children}</FallbackComponent>
        )}
      >
        {mockChild}
      </ConditionalWrapper>
    );

    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("renders children wrapped in fallbackWrapper when condition is false", () => {
    render(
      <ConditionalWrapper
        condition={false}
        wrapper={(children) => <WrapperComponent>{children}</WrapperComponent>}
        fallbackWrapper={(children) => (
          <FallbackComponent>{children}</FallbackComponent>
        )}
      >
        {mockChild}
      </ConditionalWrapper>
    );

    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.queryByTestId("wrapper")).not.toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
