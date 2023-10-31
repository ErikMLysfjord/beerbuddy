import BeerCard from "../beer-card/BeerCard";
import styles from "./BeerList.module.css";

/**
 * BeerList component
 * @returns a list of beers, that should be lazyloaded
 */
const BeerList = () => {
  return (
    <section>
      <ul className={styles.list}>
        <li>
          <BeerCard
            name="21st Amendment Bitter American"
            brewery="Nico Freccia breweries"
          />
        </li>
        <li>
          <BeerCard name="Borg Citra" brewery="Hansa-Borg" />
        </li>
        <li>
          <BeerCard
            name="Sierra Nevada Pale Ale"
            brewery="Sierra Nevada Brewing Co."
          />
        </li>
        <li>
          <BeerCard name="Mono Stereo Mosaic" brewery="To Øl" />
        </li>
      </ul>
    </section>
  );
};
export default BeerList;
