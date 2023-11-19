import InfiniteScroll from "react-infinite-scroll-component";
import BeerCard from "../beer-card/BeerCard";
import style from "./BeerList.module.css";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";

/**
 * BeerList component
 * @returns a list of beers, that should be dynamically loaded when the user scrolls down.
 */
const BeerList = () => {
  const { searchString, sorting } = useContext(FilterContext);
  const { beers, fetchMore: fetchMoreBeers } = useFetchMoreBeers();

  // Store fetchMore in a ref
  const fetchMoreRef = useRef(fetchMoreBeers);
  fetchMoreRef.current = fetchMoreBeers;

  useEffect(() => {
    // Use the ref in the useEffect hook
    fetchMoreRef.current(true);
  }, [searchString, sorting]);

  return (
    <main>
      <InfiniteScroll
        dataLength={beers.length}
        next={() => fetchMoreRef.current()}
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
        <ul className={style.list}>
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
  );
};
export default BeerList;
