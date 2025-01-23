import { useEffect, useState } from "react";
import { Beer } from "../types/types";

/**
 * fetch information about a single beer.
 * @param id - the id of the beer to fetch
 * @param onSuccess - callback for when the fetch is successful
 * @returns - the beer object
 */
const fetchBeer = async (id: number, onSuccess: (data: Beer) => void) => {
  const userId = localStorage.getItem("userIdBeerBuddy");
  const query = {
    query: `{ beer(id: ${id} userId: "${userId}") }`,
  };

  return await fetch(import.meta.env.VITE_APP_BACKEND_URL, {
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
 * @param newVote - boolean to indicate if a new vote has been cast
 * @returns - the beer object, loading state and error state
 */
const useFetchBeer = ({
  id,
  newVote,
  newComment,
}: {
  id: number;
  newVote?: boolean;
  newComment?: boolean;
}) => {
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
  }, [id, newVote, newComment]);

  return { beer, isLoading, isError };
};

export default useFetchBeer;
