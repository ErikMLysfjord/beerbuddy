import { createContext, useState } from "react";

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
  const [searchString, setSearchString] = useState("");
  const [IBU, setIBU] = useState<number[]>([0, 140]);
  const [ABV, setABV] = useState<number[]>([0, 40]);
  const [styles, setStyles] = useState<string[]>([]);
  const [sorting, setSorting] = useState<string>("top");

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
