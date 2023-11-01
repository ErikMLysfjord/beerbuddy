import { Checkbox, Slider } from "antd";
import Filter from "./Filter";

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

const Filters = () => {
  return (
    <>
      <Filter heading="Style" tooltip="Filter on certain styles of beer.">
        <Checkbox.Group options={beerStyles} />
      </Filter>
      <Filter
        heading="IBU"
        tooltip="IBU is International Bitternes Units, a metric for the bitternes of your beer. The higher the number, the more bitter the beer."
      >
        <Slider range min={0} max={140} defaultValue={[20, 100]} />
      </Filter>
      <Filter heading="Alcohol" tooltip="Percentage of alcohol in the beer">
        <Slider min={0} max={14} range defaultValue={[0, 14]} />
      </Filter>
    </>
  );
};
export default Filters;
