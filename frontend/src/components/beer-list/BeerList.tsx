import InfiniteScroll from "react-infinite-scroll-component";
import BeerCard from "../beer-card/BeerCard";
import style from "./BeerList.module.css";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";
import { useContext, useState } from "react";
import { Button } from "antd";
import { FilterContext } from "../../context/FilterContext";

/**
 * BeerList component
 * @returns a list of beers, that should be dynamically loaded when the user scrolls down.
 */

const BeerList = () => {
  const { searchString, IBU, ABV, styles, sorting } = useContext(FilterContext);
  const { beers, fetchMore } = useFetchMoreBeers(
    10,
    searchString,
    ABV[0],
    ABV[1],
    IBU[0],
    IBU[1],
    styles,
    sorting
  );
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    setMounted(true);
    fetchMore();
  }

  return (
    <main>
      <Button
        type="primary"
        onClick={() => {
          console.log("searchString: ", searchString);
          console.log("IBU: ", IBU);
          console.log("ABV: ", ABV);
          console.log("styles: ", styles);
          console.log("sorting: ", sorting);
        }}
      >
        Log filter
      </Button>
      <Button
        type="primary"
        onClick={(e) => {
          e.preventDefault();
          fetchMore(true);
        }}
      >
        apply filter
      </Button>

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
        <ul className={style.list}>
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
