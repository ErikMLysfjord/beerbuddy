import { it, expect, describe, vi, vitest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filters from "./Filters";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";
import { useContext, useState as useStateMock } from "react";

vi.mock("react", () => ({
  ...vitest.importActual("react"),
  useState: vi.fn(),
  createContext: vi.fn(),
  useContext: vi.fn(),
}));

describe("Filters", () => {
  const setState = vi.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
    (useContext as jest.Mock).mockImplementation(() => ({
      searchString: "",
      setSearchString: () => {},
      IBU: [0, 140],
      setIBU: () => {},
      ABV: [0, 40],
      setABV: () => {},
      styles: [],
      setStyles: () => {},
      sorting: "top",
      setSorting: () => {},
    }));
  });

  it("is accessible", async () => {
    const { container } = render(<Filters />);
    expect(await axe(container)).toHaveNoViolations();
  });

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

it("changes value of IBU slider", () => {
  const setIBU = vi.fn();

  // Must mock again because it can't be done in beforeEach since it needs a const
  (useContext as jest.Mock).mockImplementation(() => ({
    searchString: "",
    setSearchString: () => {},
    IBU: [0, 140],
    setIBU,
    ABV: [0, 40],
    setABV: () => {},
    styles: [],
    setStyles: () => {},
    sorting: "top",
    setSorting: () => {},
  }));

  render(<Filters />);
  const minSlider = screen.getAllByRole("slider")[0];
  const maxSlider = screen.getAllByRole("slider")[1];
  act(() => {
    fireEvent.change(minSlider, { target: { value: 25 } });
  });

  expect(setIBU).toHaveBeenCalledTimes(1);
  expect(setIBU).toHaveBeenCalledWith([25, 140]);

  act(() => {
    fireEvent.change(maxSlider, { target: { value: 30 } });
  });

  expect(setIBU).toHaveBeenCalledTimes(2);
  expect(setIBU).toHaveBeenCalledWith([0, 30]);
});

it("changes value of alcohol slider", () => {
  const setABV = vi.fn();

  // Must mock again because it can't be done in beforeEach since it needs a const
  (useContext as jest.Mock).mockImplementation(() => ({
    searchString: "",
    setSearchString: () => {},
    IBU: [0, 140],
    setIBU: () => {},
    ABV: [0, 40],
    setABV,
    styles: [],
    setStyles: () => {},
    sorting: "top",
    setSorting: () => {},
  }));

  render(<Filters />);
  const minSlider = screen.getAllByRole("slider")[2];
  const maxSlider = screen.getAllByRole("slider")[3];
  act(() => {
    fireEvent.change(minSlider, { target: { value: 10 } });
  });
  expect(setABV).toHaveBeenCalledTimes(1);
  expect(setABV).toHaveBeenCalledWith([10, 40]);

  act(() => {
    fireEvent.change(maxSlider, { target: { value: 30 } });
  });

  expect(setABV).toHaveBeenCalledTimes(2);
  expect(setABV).toHaveBeenCalledWith([0, 30]);
});

it("changes value of styles", () => {
  const setStyles = vi.fn();

  // Must mock again because it can't be done in beforeEach since it needs a const
  (useContext as jest.Mock).mockImplementation(() => ({
    searchString: "",
    setSearchString: () => {},
    IBU: [0, 140],
    setIBU: () => {},
    ABV: [0, 40],
    setABV: () => {},
    styles: [],
    setStyles,
    sorting: "top",
    setSorting: () => {},
  }));

  render(<Filters />);
  const checkbox = screen.getByLabelText("American IPA");
  act(() => {
    fireEvent.click(checkbox);
  });
  expect(setStyles).toHaveBeenCalledTimes(1);
  expect(setStyles).toHaveBeenCalledWith(["American IPA"]);

  act(() => {
    fireEvent.click(checkbox);
  });
  expect(setStyles).toHaveBeenCalledTimes(2);
  expect(setStyles).toHaveBeenCalledWith([]);
});
