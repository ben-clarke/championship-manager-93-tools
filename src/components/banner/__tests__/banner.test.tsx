// @vitest-environment happy-dom
import * as Mocks from "@lhv-uk/testing-utils";
import { render, screen } from "@testing-library/react";
import { BannerLinkList } from "../banner-link-list";
import ErrorBanner from "../error-banner";
import SuccessBanner from "../success-banner";
import WarningBanner from "../warning-banner";

vi.mock("@remix-run/react", () => Mocks.createRemixReactMock({ path: "/" }));

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

describe("BannerLinkList", () => {
  it("should show links", () => {
    render(
      <BannerLinkList
        bannerLinks={[
          { text: "link-text-1", link: "link-1" },
          { text: "link-text-2", link: "link-2" },
        ]}
      />,
    );
    expect(screen.getByText("link-text-1")).toBeInTheDocument();
    expect(screen.getByText("link-text-1").closest("a")?.getAttribute("href")).toBe("/link-1");
    expect(screen.getByText("link-text-2")).toBeInTheDocument();
    expect(screen.getByText("link-text-2").closest("a")?.getAttribute("href")).toBe("/link-2");
  });
});
