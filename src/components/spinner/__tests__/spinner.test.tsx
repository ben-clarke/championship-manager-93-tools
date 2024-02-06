import { render, screen } from "@testing-library/react";
import Spinner from "../spinner";

describe("Spinner", () => {
  it("should render spinner with testid", () => {
    render(<Spinner testId="nice-spinner" />);
    expect(screen.getByTestId("nice-spinner")).toBeInTheDocument();
  });
});
