// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import Overlay from "../overlay";

describe("Overlay", () => {
  it("should render children in overlay", () => {
    render(<Overlay centerContent={false}>Cat</Overlay>);
    expect(screen.getByText("Cat")).toBeInTheDocument();
    expect(screen.getByText("Cat").closest("div")).not.toHaveClass("items-center justify-center");
  });

  it("should use centered classes when needed", () => {
    render(<Overlay centerContent>Cat</Overlay>);
    expect(screen.getByText("Cat").closest("div")).toHaveClass("items-center justify-center");
  });

  it("should add class when passed", () => {
    render(<Overlay className="rabbit">Cat</Overlay>);
    expect(screen.getByText("Cat").closest("div")).toHaveClass("rabbit");
  });
});
