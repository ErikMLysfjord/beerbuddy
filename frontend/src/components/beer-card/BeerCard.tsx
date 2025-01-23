import Voter from "../voter/Voter";
import styles from "./BeerCard.module.css";

type ReactionType = "unreact" | "upvote" | "downvote";

/**
 * The interface for the BeerCard component.
 * @param name - The name of the beer.
 * @param brewery - The brewery of the beer.
 * @param beer_id - The ID of the beer.
 * @param votes - The number of votes the beer has.
 * @param reaction - The reaction of the user to the beer.
 */
interface BeerCardInterface {
  name: string;
  brewery: string;
  beer_id: number;
  votes: number;
  reaction: ReactionType;
}

/**
 * A component for compactly displaying a beer in a list of beers
 * Works as a link to the beer page.
 * Displays the name, brewery and votes of the beer.
 * Contains a voter component for voting on the beer.
 * @param props : BeerCardInterface - The interface for the BeerCard component.
 * @returns  - The beer card component.
 */
const BeerCard = (props: BeerCardInterface) => {
  return (
    <a
      href={`./beer/${props.beer_id}`}
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
