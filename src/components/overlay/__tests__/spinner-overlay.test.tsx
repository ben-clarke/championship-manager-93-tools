// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import SpinnerOverlay from "../spinner-overlay";

describe("SpinnerOverlay", () => {
  it("should render spinner with overlay", () => {
    render(<SpinnerOverlay />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
  });

  it("should render full screen spinner with overlay", () => {
    render(<SpinnerOverlay fullScreen />);
    expect(screen.getByTestId("spinner").parentNode).toHaveClass("h-screen");
  });
});
