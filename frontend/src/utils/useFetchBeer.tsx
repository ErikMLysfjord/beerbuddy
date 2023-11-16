import { useEffect, useState } from "react";
import { Beer } from "../types/types";

/**
 * fetch information about a single beer.
 * @param id - the id of the beer to fetch
 * @param onSuccess - callback for when the fetch is successful
 * @returns - the beer object
 */
const fetchBeer = async (id: number, onSuccess: (data: Beer) => void) => {
  const query = { query: `{ beer(id: ${id}) }` };

  return await fetch("http://it2810-15.idi.ntnu.no:4000/beer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data.data.beer[0]);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

/**
 * Custom hook for fetching a single beer.
 * @param id - the id of the beer to fetch
 * @returns - the beer object, loading state and error state
 */
const useFetchBeer = ({ id }: { id: number }) => {
  const [beer, setBeer] = useState<Beer>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onSuccess = (data: Beer) => {
    setIsLoading(false);
    setIsError(false);
    setBeer(data);
  };

  useEffect(() => {
    fetchBeer(id, onSuccess);
  }, [id]);

  return { beer, isLoading, isError };
};

export default useFetchBeer;
