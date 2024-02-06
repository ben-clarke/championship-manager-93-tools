// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import App from "../app";

test("renders learn react link", () => {
  render(<App />);
  expect(screen.getByText("Converting to human readable CSV")).toBeInTheDocument();
});
