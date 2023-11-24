import { createContext, useState } from "react";

/**
 * interface for the FilterContext
 * @param searchString - the string to search for
 * @param setSearchString - function to update the searchString
 * @param IBU - the IBU range to filter by
 * @param setIBU - function to update the IBU range
 * @param ABV - the ABV range to filter by
 * @param setABV - function to update the ABV range
 * @param styles - the styles to filter by
 * @param setStyles - function to update the styles
 * @param sorting - the sorting to apply
 * @param setSorting - function to update the sorting
 */
export interface FilterContextType {
  searchString: string;
  setSearchString: (searchString: string) => void;
  IBU: number[];
  setIBU: (IBU: number[]) => void;
  ABV: number[];
  setABV: (ABV: number[]) => void;
  styles: string[];
  setStyles: (styles: string[]) => void;
  sorting: string;
  setSorting: (sorting: string) => void;
}

/**
 * Context that contains the filter settings.
 */
export const FilterContext = createContext<FilterContextType>({
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
});

/**
 * Provider for the FilterContext.
 * A wrapper for the children that needs access to the FilterContext.
 * @param children - the children of the provider
 */
export const FilterContextProvider: React.FC<
  React.PropsWithChildren<object>
> = ({ children }) => {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );
  const [IBU, setIBU] = useState<number[]>(
    JSON.parse(localStorage.getItem("IBU") || "[0, 140]") as number[]
  );
  const [ABV, setABV] = useState<number[]>(
    JSON.parse(localStorage.getItem("ABV") || "[0, 40]") as number[]
  );
  const [styles, setStyles] = useState<string[]>(
    JSON.parse(localStorage.getItem("styles") || "[]") as string[]
  );
  const [sorting, setSorting] = useState<string>(
    localStorage.getItem("sorting") || "top"
  );

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
