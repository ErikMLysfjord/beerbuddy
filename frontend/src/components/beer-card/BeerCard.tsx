import Voter from "../voter/Voter";
import styles from "./BeerCard.module.css";

type ReactionType = "unreact" | "upvote" | "downvote";
interface BeerCardInterface {
  name: string;
  brewery: string;
  beer_id: number;
  votes: number;
  reaction: ReactionType;
}

const BeerCard = (props: BeerCardInterface) => {
  return (
    <a
      href={"./" + import.meta.env.VITE_APP_BASEURL + "beer/" + props.beer_id}
      aria-label={props.name}
      className={styles.card}
    >
      <div className={styles.textWrapper}>
        <h1 className={styles.beerName}>{props.name}</h1>
        <p className={styles.breweryName}>{props.brewery}</p>
      </div>
      <Voter
        votes={props.votes}
        reaction={props.reaction}
        beerId={props.beer_id}
      />
    </a>
  );
};
export default BeerCard;
