import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import UploadFile from "../upload-file";

const user = userEvent.setup({ delay: null });

describe("UploadFile", () => {
  test("displays upload file if no default label", () => {
    render(<UploadFile setFile={(): void => {}} id="testid" />);
    expect(screen.getByText("Upload file")).toBeInTheDocument();
    expect(screen.getByTestId("testid")).toBeEnabled();
  });

  test("displays default label", () => {
    render(<UploadFile setFile={(): void => {}} id="testid" defaultLabel="Test label" />);
    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  test("with filePath set it shows the file name instead of upload file", () => {
    render(<UploadFile value="file.csv" setFile={(): void => {}} id="testid" />);
    expect(screen.queryByText("Upload file")).not.toBeInTheDocument();
    expect(screen.getByText("file.csv")).toBeInTheDocument();
  });

  test("allow component to be disabled", () => {
    render(<UploadFile value="file.csv" setFile={(): void => {}} id="testid" disabled />);
    expect(screen.getByTestId("testid")).toBeDisabled();
  });

  test("should allow file to be selected", async () => {
    render(<UploadFile setFile={(): void => {}} id="testid" />);

    const file = new File(["hello"], "hello.xml", { type: "application/xml" });
    const input = screen.getByTestId("testid") as HTMLInputElement;

    await upload(input, file);

    const files = input.files || [];
    expect(files).toHaveLength(1);
    expect(files[0]).toBe(file);
  });

  test("should allow blank file", async () => {
    render(<UploadFile setFile={(): void => {}} id="testid" />);

    const file = new File([], "hello.xml", { type: "application/xml" });
    const input = screen.getByTestId("testid") as HTMLInputElement;

    await upload(input, file);

    const files = input.files || [];
    expect(files).toHaveLength(1);
    expect(files[0]).toBe(file);
  });

  test("should allow reading a different type", async () => {
    render(
      <UploadFile
        setFile={(): void => {}}
        id="testid"
        accept="application/pdf"
        readType="data-url"
      />,
    );

    const file = new File([], "hello.pdf", { type: "application/pdf" });
    const input = screen.getByTestId("testid") as HTMLInputElement;

    await upload(input, file);

    const files = input.files || [];
    expect(files).toHaveLength(1);
    expect(files[0]).toBe(file);
  });
});

const upload = async (element: HTMLElement, file: File): Promise<void> => {
  await act(async () => {
    await user.upload(element, file);
  });
};
