import { Checkbox } from "antd";
import Filter from "./Filter";
import { Slider, SliderProps, alpha, styled } from "@mui/material";
import { useState } from "react";

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

const Filters = () => {
  const [IBU, setIBU] = useState<number[]>([0, 140]);
  const [alcohol, setAlcohol] = useState<number[]>([0, 40]);

  return (
    <>
      <Filter heading="Style" tooltip="Filter on certain styles of beer.">
        <Checkbox.Group options={beerStyles} />
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
          valueLabelDisplay="auto"
          getAriaValueText={() => `Min value is ${IBU[0]}, max is ${IBU[1]}`}
          min={0}
          max={140}
        />
      </Filter>
      <Filter heading="Alcohol" tooltip="Percentage of alcohol in the beer">
        <StyledSlider
          getAriaLabel={() => "Temperature range"}
          value={alcohol}
          onChange={(e: Event, newValue: number | number[]) => {
            e.preventDefault();
            setAlcohol(newValue as number[]);
          }}
          valueLabelDisplay="auto"
          getAriaValueText={() =>
            `Min value is ${alcohol[0]}, max is ${alcohol[1]}`
          }
          min={0}
          max={40}
        />
      </Filter>
    </>
  );
};
export default Filters;
