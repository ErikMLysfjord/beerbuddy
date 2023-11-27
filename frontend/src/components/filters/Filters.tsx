import { Button, Checkbox } from "antd";
import Filter from "./Filter";
import { Slider, SliderProps, alpha, styled } from "@mui/material";
import { useContext, useRef } from "react";
import { FilterContext } from "../../context/FilterContext";
import { RollbackOutlined } from "@ant-design/icons";

// Styles of beer that can be filtered on
const beerStyles = [
  "American IPA",
  "American Pale Ale (APA)",
  "American Amber / Red Ale",
  "American Blonde Ale",
  "American Double / Imperial IPA",
  "American Pale Wheat Ale",
  "American Brown Ale",
  "American Porter",
  "Saison / Farmhouse Ale",
  "Witbier",
  "Fruit / Vegetable Beer",
  "Kölsch",
  "Hefeweizen",
  "American Pale Lager",
  "American Stout",
  "Other",
];

// Styled slider component from MUI
const StyledSlider = styled(Slider)<SliderProps>(() => ({
  color: "#FFCC48",
  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${alpha("#FFCC48", 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px ${alpha("#FFCC48", 0.16)}`,
    },
  },
}));

interface FiltersProps {
  fetchMore: (reset?: boolean) => Promise<void>;
  apply?: () => void;
}
/**
 * Filters component that contains all filters.
 * @param fetchMore - function that is called when the apply filters button is clicked
 * @param apply - function that is called to hide the filters when the apply filters button is clicked
 * @returns a Filters component
 */
const Filters = ({ fetchMore, apply }: FiltersProps) => {
  const {
    IBU,
    setIBU,
    ABV,
    setABV,
    setStyles,
    styles,
    searchString,
    setSearchString,
  } = useContext(FilterContext);
  const fetchMoreRef = useRef(fetchMore);
  fetchMoreRef.current = fetchMore;

  /**
   * Function for resetting filters and fetching more beers.
   */
  const resetFilters = () => {
    /* Only reset filters and fetch beers if there are active filters */
    if (
      beerStyles.length > 0 ||
      ABV[0] !== 0 ||
      ABV[1] !== 40 ||
      IBU[0] !== 0 ||
      IBU[1] !== 140 ||
      searchString !== ""
    ) {
      setABV([0, 40]);
      setIBU([0, 140]);
      setStyles([]);
      setSearchString("");
      fetchMoreRef.current(true);
    }
  };

  return (
    <>
      <Filter heading="Style" tooltip="Filter on certain styles of beer.">
        <Checkbox.Group
          options={beerStyles}
          onChange={(checkedValues) =>
            setStyles(checkedValues.map((value) => value.toString()))
          }
          value={styles}
        />
      </Filter>
      <Filter
        heading="IBU"
        tooltip="IBU is International Bitternes Units, a metric for the bitternes of your beer. The higher the number, the more bitter the beer."
      >
        <StyledSlider
          getAriaLabel={() => "IBU range"}
          value={IBU}
          onChange={(e: Event, newValue: number | number[]) => {
            e.preventDefault();
            setIBU(newValue as number[]);
          }}
          max={140}
          valueLabelDisplay="auto"
          getAriaValueText={() => `Min value is ${IBU[0]}, max is ${IBU[1]}`}
        />
      </Filter>
      <Filter heading="Alcohol" tooltip="Percentage of alcohol in the beer">
        <StyledSlider
          getAriaLabel={() => "ABV range"}
          value={ABV}
          onChange={(e: Event, newValue: number | number[]) => {
            e.preventDefault();
            setABV(newValue as number[]);
          }}
          max={40}
          valueLabelDisplay="auto"
          getAriaValueText={() => `Min value is ${ABV[0]}, max is ${ABV[1]}`}
        />
      </Filter>

      <Button
        type="primary"
        style={{
          width: "100%",
          marginTop: "1rem",
        }}
        onClick={(e) => {
          e.preventDefault();
          if (apply) apply();
          fetchMore(true);
        }}
      >
        Apply Filters
      </Button>
      <Button
        type="default"
        style={{
          width: "100%",
          marginTop: "1rem",
        }}
        onClick={resetFilters}
        icon={<RollbackOutlined />}
      >
        Reset Filters
      </Button>
    </>
  );
};
export default Filters;
