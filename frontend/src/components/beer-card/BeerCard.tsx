import Voter from "../voter/Voter";
import styles from "./BeerCard.module.css";

interface BeerCardInterface {
  name: string;
  brewery: string;
  beer_id: number;
  votes: number;
}

const BeerCard = (props: BeerCardInterface) => {
  return (
    <a href={"./project2/beer/" + props.beer_id}>
      <button aria-label={props.name} className={styles.card}>
        <div className={styles.textWrapper}>
          <h1 className={styles.beerName}>{props.name}</h1>
          <p className={styles.breweryName}>{props.brewery}</p>
        </div>
        <Voter votes={props.votes} />
      </button>
    </a>
  );
};
export default BeerCard;
