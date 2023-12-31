import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterButton from "./FilterButton";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";

// Fixes a warning which seems to be a bug.
// https://github.com/nickcolley/jest-axe/issues/147
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

describe("FilterButton", () => {
  const fetchMore = vi.fn();

  it("is accessible", async () => {
    const { container } = render(<FilterButton fetchMore={fetchMore} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<FilterButton fetchMore={fetchMore} />);
    expect(container).toMatchSnapshot();
  });

  it("should open modal", () => {
    const { getAllByRole } = render(<FilterButton fetchMore={fetchMore} />);

    expect(screen.queryByText("Filters")).not.toBeInTheDocument();

    act(() => {
      getAllByRole("button")[0].click();
    });

    expect(screen.queryByText("Filters")).toBeInTheDocument();
  });

  it("should close modal", () => {
    render(<FilterButton fetchMore={fetchMore} />);

    expect(screen.queryByText("Filters")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    const dialog = screen.getByRole("dialog");

    /* Need to test the visibility of the wrapper of the modal,
    since that is the element gaining the display: none on closing. */
    const modalWrapper = dialog.parentElement;
    expect(modalWrapper).toBeVisible();

    const closeButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(closeButton);
    expect(modalWrapper).not.toBeVisible();
  });
});
