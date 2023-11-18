import InfiniteScroll from "react-infinite-scroll-component";
import BeerCard from "../beer-card/BeerCard";
import style from "./BeerList.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

/**
 * BeerList component
 * @returns a list of beers, that should be dynamically loaded when the user scrolls down.
 */

type ReactionType = "unreact" | "upvote" | "downvote";

interface BeerListProps {
  beers: {
    beer_id: number;
    beer_name: string;
    brewery_name: string;
    vote_sum: number;
    beer_count: number;
    reaction: ReactionType;
  }[];
  fetchMore: (reset?: boolean) => Promise<void>;
}

const BeerList = (props: BeerListProps) => {
  const { searchString, sorting } = useContext(FilterContext);
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    setMounted(true);
    props.fetchMore();
  }

  useEffect(() => {
    props.fetchMore(true);
  }, [props, searchString, sorting]);

  return (
    <main>
      <InfiniteScroll
        dataLength={props.beers.length}
        next={props.fetchMore}
        hasMore={props.beers?.length < props.beers[0]?.beer_count}
        loader={
          <p style={{ textAlign: "center" }}>
            <b>Loading...</b>
          </p>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollThreshold={0.99}
        scrollableTarget="infiniteScrollTarget"
      >
        <ul className={style.list}>
          {props.beers?.map((beer) => (
            <li key={beer.beer_id}>
              <BeerCard
                beer_id={beer.beer_id}
                name={beer.beer_name}
                brewery={beer.brewery_name}
                votes={beer.vote_sum}
                reaction={beer.reaction}
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </main>
  );
};
export default BeerList;
