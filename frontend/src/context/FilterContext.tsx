import { createContext, useEffect, useState } from "react";

interface FilterContextType {
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

  // update localStorage when searchString changes
  useEffect(() => {
    localStorage.setItem("searchString", searchString);
    localStorage.setItem("IBU", JSON.stringify(IBU));
    localStorage.setItem("ABV", JSON.stringify(ABV));
    localStorage.setItem("styles", JSON.stringify(styles));
    localStorage.setItem("sorting", sorting);
  }, [searchString, IBU, ABV, styles, sorting]);

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
