import { Checkbox, Slider } from "antd";
import Filter from "./Filter";

const beerStyles = [
  "IPA",
  "Stout",
  "Lager",
  "Pilsner",
  "Pale Ale",
  "Wheat",
  "Sour",
  "Porter",
  "Belgian",
  "Brown Ale",
  "Red Ale",
  "Barleywine",
  "Saison",
  "Bock",
  "Amber Ale",
  "APA",
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
        <Slider range defaultValue={[0, 24]} />
      </Filter>
      <Filter heading="Alcohol" tooltip="Percentage of alcohol in the beer">
        <Slider min={0} max={25} range defaultValue={[4, 8]} />
      </Filter>
    </>
  );
};
export default Filters;
