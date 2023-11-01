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
const useFetchMoreBeers = (fetchSize: number) => {
  const [beers, setBeers] = useState<Beer[]>([]);

  const query = `
      query Beers($size: Int! $start: Int!) {
        beers(size: $size, start: $start)
      }
    `;

  const fetchMore = async () => {
    await fetch("http://localhost:4000/beer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { start: beers.length, size: fetchSize },
      }),
    })
      .then((r) => r.json())
      .then((data) => setBeers([...beers, ...data.data.beers]));
  };

  return { beers, fetchMore };
};

export default useFetchMoreBeers;
