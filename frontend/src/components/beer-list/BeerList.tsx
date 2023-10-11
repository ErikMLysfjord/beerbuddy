import BeerCard from "../beer-card/BeerCard";

/**
 * BeerList component
 * @returns a list of beers, that should be lazyloaded
 */
const BeerList = () => {
  return (
    <main>
      <BeerCard
        name="21st Amendment Bitter American"
        brewery="Nico Freccia breweries"
      />
      <BeerCard name="Borg Citra" brewery="Hansa-Borg" />
      <BeerCard
        name="Sierra Nevada Pale Ale"
        brewery="Sierra Nevada Brewing Co."
      />
      <BeerCard name="Mono Stereo Mosaic" brewery="To Øl" />
    </main>
  );
};
export default BeerList;
