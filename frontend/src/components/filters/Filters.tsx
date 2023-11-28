import { Button, Checkbox, Collapse, Divider, Tooltip } from "antd";
import { Slider, SliderProps, alpha, styled } from "@mui/material";
import { useContext, useId, useRef } from "react";
import { FilterContext } from "../../context/FilterContext";
import {
  QuestionCircleOutlined,
  RollbackOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { default as CSSstyles } from "./Filters.module.css";

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
  const headingID = useId();

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
    <section aria-labelledby={headingID}>
      <Divider />
      <h2 id={headingID}>Filters</h2>

      <Collapse
        aria-label="Beer styles"
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} aria-hidden />
        )}
        className={CSSstyles.collapse}
        items={[
          {
            key: "styles-checkbox-key",
            label: (
              <span className={CSSstyles.collapseSpan}>
                Beer styles
                <Tooltip title={"Filter on certain styles of beer."}>
                  <QuestionCircleOutlined aria-hidden />
                </Tooltip>
              </span>
            ),
            children: (
              <Checkbox.Group
                options={beerStyles}
                name="styles"
                onChange={(checkedValues) =>
                  setStyles(checkedValues.map((value) => value.toString()))
                }
                value={styles}
              />
            ),
          },
        ]}
      />
      <Collapse
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} aria-hidden />
        )}
        className={CSSstyles.collapse}
        items={[
          {
            key: "IBU-range-key",
            label: (
              <span className={CSSstyles.collapseSpan}>
                IBU
                <Tooltip title={"Filter on the bitterness of the beer."}>
                  <QuestionCircleOutlined aria-hidden />
                </Tooltip>
              </span>
            ),
            children: (
              <StyledSlider
                getAriaLabel={() => "IBU range"}
                value={IBU}
                onChange={(e: Event, newValue: number | number[]) => {
                  e.preventDefault();
                  setIBU(newValue as number[]);
                }}
                max={140}
                valueLabelDisplay="auto"
                getAriaValueText={() =>
                  `Min value is ${IBU[0]}, max is ${IBU[1]}`
                }
              />
            ),
          },
        ]}
      />
      <Collapse
        className={CSSstyles.collapse}
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} aria-hidden />
        )}
        items={[
          {
            key: "ABV-range-key",
            label: (
              <span className={CSSstyles.collapseSpan}>
                ABV
                <Tooltip
                  title={"Filter on the alcohol percentage of the beer."}
                >
                  <QuestionCircleOutlined aria-hidden />
                </Tooltip>
              </span>
            ),
            children: (
              <StyledSlider
                getAriaLabel={() => "ABV range"}
                value={ABV}
                onChange={(e: Event, newValue: number | number[]) => {
                  e.preventDefault();
                  setABV(newValue as number[]);
                }}
                max={40}
                valueLabelDisplay="auto"
                getAriaValueText={() =>
                  `Min value is ${ABV[0]}, max is ${ABV[1]}`
                }
              />
            ),
          },
        ]}
      />

      <Button
        type="primary"
        className={CSSstyles.buttons}
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
        className={CSSstyles.buttons}
        onClick={resetFilters}
        icon={<RollbackOutlined />}
      >
        Reset Filters
      </Button>
    </section>
  );
};
export default Filters;
