import { useEffect, useState } from "react";
import { Beer } from "../types/types";

const fetchBeer = async (id: number, onSuccess: (data: Beer) => void) => {
  const query = { query: `{ beer(id: ${id}) }` };

  return await fetch(import.meta.env.VITE_APP_BACKEND_URL + "/beer", {
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
