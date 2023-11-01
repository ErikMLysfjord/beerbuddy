import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filters from "./Filters";
import { act } from "react-dom/test-utils";

describe("Filters", () => {
  it("renders correctly", () => {
    const { container } = render(<Filters />);
    expect(container).toMatchSnapshot();
  });

  it("renders a Filter component for each filter", () => {
    const { container } = render(<Filters />);
    expect(container.querySelectorAll(".ant-divider").length).toBe(3);
  });

  it("renders a checkbox group for the beer styles", () => {
    render(<Filters />);
    expect(screen.getAllByRole("checkbox").length).toBe(16);

    const firstCheckbox = screen.getByLabelText("American IPA");
    expect(firstCheckbox).toBeInTheDocument();
    expect(firstCheckbox).not.toBeChecked();

    act(() => {
      firstCheckbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(firstCheckbox).toBeChecked();
  });

  it("renders a slider for the IBU", () => {
    render(<Filters />);
    expect(screen.queryAllByRole("slider")[0]).toBeInTheDocument();
  });

  it("renders a filter for style, ibu and alcohol", () => {
    render(<Filters />);
    expect(screen.getByText("Style")).toBeInTheDocument();
    expect(screen.getByText("Style")).toBeInstanceOf(HTMLHeadingElement);

    expect(screen.getByText("IBU")).toBeInTheDocument();
    expect(screen.getByText("IBU")).toBeInstanceOf(HTMLHeadingElement);

    expect(screen.getByText("Alcohol")).toBeInTheDocument();
    expect(screen.getByText("Alcohol")).toBeInstanceOf(HTMLHeadingElement);
  });
});
