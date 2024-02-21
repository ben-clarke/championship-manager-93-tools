// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import App from "../app";

test("renders learn react link", () => {
  render(<App />);
  expect(
    screen.getByText(
      "This is the home page of a number of tools to facilitate the editing of Championship Manger '93 era games.",
    ),
  ).toBeInTheDocument();
});
