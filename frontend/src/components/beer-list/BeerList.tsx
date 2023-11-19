import InfiniteScroll from "react-infinite-scroll-component";
import BeerCard from "../beer-card/BeerCard";
import styles from "./BeerList.module.css";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import { Button } from "antd";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";

/**
 * Helper function for translating the sorting method to a more readable format.
 * @param sorting - The sorting method to translate.
 * @returns - The translated sorting method.
 */
const translateSorting = (sorting: string) => {
  switch (sorting) {
    case "top":
      return "Most popular";
    case "low":
      return "Least popular";
    case "atoz":
      return "A-Z";
    case "ztoa":
      return "Z-A";
    default:
      return "Most popular";
  }
};

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
  fetchMore: (reset?: boolean, noFilters?: boolean) => Promise<void>;
}

const BeerList = ({ beers, fetchMore }: BeerListProps) => {
  const {
    searchString,
    sorting,
    setABV,
    setIBU,
    setStyles,
    ABV,
    IBU,
    styles: beerStyles,
  } = useContext(FilterContext);

  const fetchMoreRef = useRef(fetchMore);
  fetchMoreRef.current = fetchMore;

  /**
   * Function for resetting filters and fetching more beers.
   */
  const resetFilters = () => {
    /* Only reset filters and fetch beers if there are active filters */
    if (
      beerStyles.length > 0 ||
      ABV[0] !== 0 ||
      ABV[1] !== 40 ||
      IBU[0] !== 0 ||
      IBU[1] !== 140
    ) {
      setABV([0, 40]);
      setIBU([0, 140]);
      setStyles([]);
      fetchMoreRef.current(true, true);
    }
  };

  useEffect(() => {
    fetchMore(true);
    // The following line is to ignore the lint warning. We know this is bad practice.
    // However, we will find a fix for this and remove it for the next delivery when we have more time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, sorting]);

  return (
    <>
      <section className={styles.resultsInfoContainer}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsInfo}>
            {beers[0]?.beer_count ?? 0} results
          </h2>
          <Button type="primary" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
        <p className={styles.resultsInfo}>Searched for: "{searchString}"</p>
        <p className={styles.resultsInfo}>
          Sorted by: {translateSorting(sorting)}
        </p>
      </section>
      <main id="main">
        <InfiniteScroll
          dataLength={beers.length}
          next={fetchMoreRef.current}
          hasMore={beers?.length < beers[0]?.beer_count}
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
          <ul className={styles.list}>
            {beers?.map((beer) => (
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
    </>
  );
};
export default BeerList;
