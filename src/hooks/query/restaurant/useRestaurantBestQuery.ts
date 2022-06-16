import { useQuery, UseQueryResult } from "react-query";
import { Restaurant } from "~/types";
import { fetchRestaurantBest } from "~/api";

const useRestaurantBestQuery = (): UseQueryResult<Array<Restaurant>> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    queryKey: [ 'fetch-restaurant-best', { }],
    queryFn: fetchRestaurantBest
  })
}

export default useRestaurantBestQuery
