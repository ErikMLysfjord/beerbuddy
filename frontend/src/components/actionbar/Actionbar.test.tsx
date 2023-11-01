import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Actionbar from "./Actionbar";
import { act } from "react-dom/test-utils";

describe("Actionbar", () => {
  it("renders correctly", () => {
    const { container } = render(<Actionbar />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct dropdown", () => {
    const { getByRole } = render(<Actionbar />);
    expect(getByRole("combobox")).toBeInTheDocument();
    expect(screen.queryByText("Ascending")).not.toBeInTheDocument();
    expect(screen.queryByText("Descending")).not.toBeInTheDocument();
  });

  it("renders option after clicking dropdown", async () => {
    render(<Actionbar />);

    const dropdown = screen.getByRole("combobox");

    act(() => {
      fireEvent.mouseDown(dropdown);
    });

    await waitFor(() => {
      expect(screen.getByText("Ascending")).toBeInTheDocument();
      expect(screen.getByText("Descending")).toBeInTheDocument();
    });
  });

  it("renders with correct searchbar", () => {
    const { getByRole } = render(<Actionbar />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
