import { useContext, useState } from "react";
import { FilterContext } from "../context/FilterContext";

type ReactionType = "unreact" | "upvote" | "downvote";
interface Beer {
  beer_id: number;
  beer_name: string;
  brewery_name: string;
  vote_sum: number;
  beer_count: number;
  reaction: ReactionType;
}

/**
 * Custom hook for fetching more beers from the backend.
 * @param fetchSize - The number of beers to fetch per request.
 * @returns An object containing an array of beers and a function to fetch more beers.
 */

const useFetchMoreBeers = () => {
  const { searchString, IBU, ABV, styles, sorting } = useContext(FilterContext);
  const [beers, setBeers] = useState<Beer[]>([]);
  const userId = localStorage.getItem("userIdBeerBuddy");

  const fetchMore = async (reset?: boolean, noFilters?: boolean) => {
    await fetch(import.meta.env.VITE_APP_BACKEND_URL + "/beer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{ 
          beers(
            size: 10
            start: ${reset ? 0 : beers.length}
            userId: "${userId}"
            sort: "${sorting}" 
            minAbv: ${noFilters ? 0 : ABV[0]}
            maxAbv: ${noFilters ? 40 : ABV[1]}
            minIbu: ${noFilters ? 0 : IBU[0]}
            maxIbu: ${noFilters ? 140 : IBU[1]}
            search: "${searchString}"
            styles: ${noFilters ? "[]" : JSON.stringify(styles)}
          )
        }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setBeers(reset ? data.data.beers : [...beers, ...data.data.beers]);
      });

    reset
      ? document.getElementById("infiniteScrollTarget")?.scrollTo(0, 0)
      : null;
  };

  return { beers, fetchMore };
};

export default useFetchMoreBeers;
