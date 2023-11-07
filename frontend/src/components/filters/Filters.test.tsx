import { it, expect, describe, vi, vitest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filters from "./Filters";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";
import { jest } from '@jest/globals'; // import the jest object
import { useState as useStateMock } from "react";
import { FilterContext } from "../../context/FilterContext";

vi.mock("react", () => ({
  ...vitest.importActual("react"),
  useState: vi.fn(),
  createContext: vi.fn(),
  useContext: vi.fn(),
}));


const MockedFilters = () => {
  const searchString = "";
  const setSearchString = jest.fn();
  const IBU = [0, 140];
  const setIBU = jest.fn();
  const ABV = [0, 40];
  const setABV = jest.fn();
  const styles = ['American IPA', 'American Pale Ale (APA)'];
  const setStyles = jest.fn();
  const sorting = "top";
  const setSorting = jest.fn();

  return (
    <FilterContext.Provider value={{
      searchString,
      setSearchString,
      IBU,
      setIBU,
      ABV,
      setABV,
      styles,
      setStyles,
      sorting,
      setSorting,
    }}>
      <Filters />
    </FilterContext.Provider>
  )
}

describe("Filters", () => {
  const setState = vi.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
  });

  test("is accessible", async () => {
    const { container } = render(<MockedFilters />);
    expect(await axe(container)).toHaveNoViolations();
  });

  test("changes value of IBU slider", () => {
    render(<MockedFilters />);
    const minSlider = screen.getAllByRole("slider")[0];
    const maxSlider = screen.getAllByRole("slider")[1];
    act(() => {
      fireEvent.change(minSlider, { target: { value: 25 } });
    });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith([25, 140]);

    setState.mockReset();
    act(() => {
      fireEvent.change(maxSlider, { target: { value: 30 } });
    });

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith([0, 30]);
    setState.mockReset();
  });

  test("changes value of alcohol slider", () => {
    render(<MockedFilters />);
    const minSlider = screen.getAllByRole("slider")[2];
    const maxSlider = screen.getAllByRole("slider")[3];
    act(() => {
      fireEvent.change(minSlider, { target: { value: 10 } });
    });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith([10, 40]);

    setState.mockReset();
    act(() => {
      fireEvent.change(maxSlider, { target: { value: 30 } });
    });

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith([0, 30]);
  });
});
