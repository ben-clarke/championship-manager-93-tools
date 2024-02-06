// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import ErrorBanner from "../error-banner";
import SuccessBanner from "../success-banner";
import WarningBanner from "../warning-banner";

describe("ErrorBanner", () => {
  it("should show children", () => {
    render(<ErrorBanner info={[""]}>Children</ErrorBanner>);
    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("should show info", () => {
    render(<ErrorBanner info={["info"]} />);
    expect(screen.getByText("info")).toBeInTheDocument();
  });

  it("should remove duplicates", () => {
    render(<ErrorBanner info={["info", "info"]} />);
    expect(screen.getAllByText("info").length).toBe(1);
  });

  it("should return null if no info or children", () => {
    const { container } = render(<ErrorBanner info={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("SuccessBanner", () => {
  it("should show children", () => {
    render(<SuccessBanner info={[""]}>Children</SuccessBanner>);
    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("should show info", () => {
    render(<SuccessBanner info={["info"]} />);
    expect(screen.getByText("info")).toBeInTheDocument();
  });

  it("should remove duplicates", () => {
    render(<SuccessBanner info={["info", "info"]} />);
    expect(screen.getAllByText("info").length).toBe(1);
  });
});

describe("WarningBanner", () => {
  it("should show children", () => {
    render(<WarningBanner info={[""]}>Children</WarningBanner>);
    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("should show info", () => {
    render(<WarningBanner info={["info"]} />);
    expect(screen.getByText("info")).toBeInTheDocument();
  });

  it("should remove duplicates", () => {
    render(<WarningBanner info={["info", "info"]} />);
    expect(screen.getAllByText("info").length).toBe(1);
  });
});
