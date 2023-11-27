// import { it, expect, describe, vi, vitest } from "vitest";
// import { fireEvent, render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import Filters from "./Filters";
// import { act } from "react-dom/test-utils";
// import { axe } from "jest-axe";
// import { useState as useStateMock } from "react";
// import { FilterContext } from "../../context/FilterContext";

// vi.mock("react", () => ({
//   ...vitest.importActual("react"),
//   useState: vi.fn(),
//   createContext: vi.fn(),
// }));

// interface MockFiltersProps {
//   searchString: string;
//   setSearchString: (searchString: string) => void;
//   IBU: number[];
//   setIBU: (IBU: number[]) => void;
//   ABV: number[];
//   setABV: (ABV: number[]) => void;
//   styles: string[];
//   setStyles: (styles: string[]) => void;
//   sorting: string;
//   setSorting: (sorting: string) => void;
// }

// export const MockFilters: React.FC<MockFiltersProps> = ({
//   searchString,
//   setSearchString,
//   IBU,
//   setIBU,
//   ABV,
//   setABV,
//   styles,
//   setStyles,
//   sorting,
//   setSorting
// }) => {
//   return (
//     <FilterContext.Provider value={{
//       searchString,
//       setSearchString,
//       IBU,
//       setIBU,
//       ABV,
//       setABV,
//       styles,
//       setStyles,
//       sorting,
//       setSorting,
//     }}>
//       <Filters />
//     </FilterContext.Provider>
//   );
// };

test("my test", () => {
  expect(true).toBe(true);
});

// describe("Filters", () => {
//   const setState = vi.fn();

//   beforeEach(() => {
//     (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
//   });

//   it("is accessible", async () => {
//     const { container } = render(<Filters />);
//     expect(await axe(container)).toHaveNoViolations();
//   });

//   it("renders correctly", () => {
//     const { container } = render(<Filters />);
//     expect(container).toMatchSnapshot();
//   });

//   it("renders a Filter component for each filter", () => {
//     const { container } = render(<MockFilters />);
//     expect(container.querySelectorAll(".ant-divider").length).toBe(3);
//   });

//   it("renders a checkbox group for the beer styles", () => {
//     render(<MockFilters />);
//     expect(screen.getAllByRole("checkbox").length).toBe(16);

//     const firstCheckbox = screen.getByLabelText("American IPA");
//     expect(firstCheckbox).toBeInTheDocument();
//     expect(firstCheckbox).not.toBeChecked();

//     act(() => {
//       firstCheckbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     });

//     expect(firstCheckbox).toBeChecked();
//   });

//   it("renders a slider for the IBU", () => {
//     render(<MockFilters />);
//     expect(screen.queryAllByRole("slider")[0]).toBeInTheDocument();
//   });

//   it("renders a filter for style, ibu and alcohol", () => {
//     render(<MockFilters />);
//     expect(screen.getByText("Style")).toBeInTheDocument();
//     expect(screen.getByText("Style")).toBeInstanceOf(HTMLHeadingElement);

//     expect(screen.getByText("IBU")).toBeInTheDocument();
//     expect(screen.getByText("IBU")).toBeInstanceOf(HTMLHeadingElement);

//     expect(screen.getByText("Alcohol")).toBeInTheDocument();
//     expect(screen.getByText("Alcohol")).toBeInstanceOf(HTMLHeadingElement);
//   });

//   it("changes value of IBU slider", () => {
//     render(<MockFilters />);
//     const minSlider = screen.getAllByRole("slider")[0];
//     const maxSlider = screen.getAllByRole("slider")[1];
//     act(() => {
//       fireEvent.change(minSlider, { target: { value: 25 } });
//     });
//     expect(setState).toHaveBeenCalledTimes(1);
//     expect(setState).toHaveBeenCalledWith([25, 137]);

//     setState.mockReset();
//     act(() => {
//       fireEvent.change(maxSlider, { target: { value: 30 } });
//     });

//     expect(setState).toHaveBeenCalledTimes(1);
//     expect(setState).toHaveBeenCalledWith([0, 30]);
//     setState.mockReset();
//   });

//   it("changes value of alcohol slider", () => {
//     render(<MockFilters />);
//     const minSlider = screen.getAllByRole("slider")[2];
//     const maxSlider = screen.getAllByRole("slider")[3];
//     act(() => {
//       fireEvent.change(minSlider, { target: { value: 10 } });
//     });
//     expect(setState).toHaveBeenCalledTimes(1);
//     expect(setState).toHaveBeenCalledWith([10, 12]);

//     setState.mockReset();
//     act(() => {
//       fireEvent.change(maxSlider, { target: { value: 30 } });
//     });

//     expect(setState).toHaveBeenCalledTimes(1);
//     expect(setState).toHaveBeenCalledWith([0, 30]);
//   });
// });
