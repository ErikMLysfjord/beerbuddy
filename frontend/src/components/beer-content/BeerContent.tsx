import styles from "./BeerContent.module.css";

const BeerContent = () => (
  <>
    <p className={styles.breweryName}>Nico Freccia Breweries (Beer-brand)</p>
    <p className={styles.beerName}>
      21st Amendment Bitter American (Beer-name)
    </p>
    <div className={styles.rating}>
      <p className={styles.ratingNumber}>137</p>
      <p className={styles.ratingText}>rated</p>
    </div>
    <p className={styles.basedOn}>Based on 547 reviews</p>
    <div className={styles.info}>
      <div className={styles.attributeContainer}>
        <p className={styles.attributeText}>Style</p>
        <h1 className={styles.attributeText}>APA</h1>
      </div>
      <div className={styles.attributeContainer}>
        <p className={styles.attributeText}>IBU</p>
        <h1 className={styles.attributeText}>23</h1>
      </div>
      <div className={styles.attributeContainer}>
        <p className={styles.attributeText}>Abv</p>
        <h1 className={styles.attributeText}>5,4%</h1>
      </div>
      <div className={styles.attributeContainer}>
        <p className={styles.attributeText}>Volume</p>
        <h1 className={styles.attributeText}>4oz</h1>
      </div>
    </div>
  </>
);

export default BeerContent;
