import { Checkbox } from "antd";
import Filter from "./Filter";
import { Slider, SliderProps, alpha, styled } from "@mui/material";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

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

/**
 * Filters component that contains all filters.
 * @returns a Filters component
 */
const Filters = () => {
  const { IBU, setIBU, ABV, setABV, setStyles, styles } =
    useContext(FilterContext);

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
          getAriaLabel={() => "Temperature range"}
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
          getAriaLabel={() => "Temperature range"}
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
    </>
  );
};
export default Filters;
