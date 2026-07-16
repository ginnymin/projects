import { getBreeds } from "@api/getBreeds";
import useSWR from "swr";

export const useFetchBreeds = () => {
  const data = useSWR(["/dogs/breeds", undefined], getBreeds);

  return data;
};
