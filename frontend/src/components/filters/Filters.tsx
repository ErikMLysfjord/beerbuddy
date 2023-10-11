import { Checkbox, Divider, Slider } from "antd";

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
      <Divider />
      <h2>Style</h2>
      <Checkbox.Group options={beerStyles} />
      <Divider />
      <h2>IBU</h2>
      <Slider range defaultValue={[0, 24]} />
      <Divider />
      <h2>Alcohol</h2>
      <Slider min={0} max={25} range defaultValue={[4, 8]} />
      <Divider />
    </>
  );
};
export default Filters;
