import InfiniteScroll from "react-infinite-scroll-component";
import BeerCard from "../beer-card/BeerCard";
import styles from "./BeerList.module.css";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";
import { useState } from "react";

/**
 * BeerList component
 * @returns a list of beers, that should be dynamically loaded when the user scrolls down.
 */
const BeerList = () => {
  const { beers, fetchMore } = useFetchMoreBeers(10);

  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    setMounted(true);
    fetchMore();
  }

  return (
    <main>
      <InfiniteScroll
        dataLength={beers.length}
        next={fetchMore}
        hasMore={beers.length < 2410 ? true : false}
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
        scrollThreshold={1}
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
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </main>
  );
};
export default BeerList;
