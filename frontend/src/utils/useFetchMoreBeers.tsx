import { useState } from "react";

interface Beer {
  beer_id: number;
  beer_name: string;
  brewery_name: string;
  vote_sum: number;
}

/**
 * Custom hook for fetching more beers from the backend.
 * @param fetchSize - The number of beers to fetch per request.
 * @returns An object containing an array of beers and a function to fetch more beers.
 */
const useFetchMoreBeers = (
  fetchSize: number,
  searchString: string,
  minAbv: number,
  maxAbv: number,
  minIbu: number,
  maxIbu: number,
  styles: string[],
  sort: string
) => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const userId = localStorage.getItem("userIdBeerBuddy");

  const fetchMore = async (reset?: boolean) => {
    await fetch("http://localhost:4000/beer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{ 
          beers(
            size: ${fetchSize}
            start: ${beers.length}
            userId: ${userId}
            sort: "${sort}" 
            minAbv: ${minAbv}
            maxAbv: ${maxAbv}
            minIbu: ${minIbu}
            maxIbu: ${maxIbu}
            search: "${searchString}"
            styles: ${JSON.stringify(styles)}
          )
        }`,
      }),
    })
      .then((r) => r.json())
      .then((data) =>
        setBeers(reset ? data.data.beers : [...beers, ...data.data.beers])
      );
  };

  return { beers, fetchMore };
};

export default useFetchMoreBeers;
