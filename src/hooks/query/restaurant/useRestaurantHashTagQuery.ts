import { useQuery, UseQueryResult } from "react-query";
import { RestaurantHashTag } from "~/types";
import { fetchRestaurantHashTag } from "~/api";

const useRestaurantHashTagQuery = (restaurantId?: string): UseQueryResult<Array<RestaurantHashTag>> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    queryKey: [ 'fetch-restaurant-hash-tag', { restaurantId }],
    queryFn: fetchRestaurantHashTag(Number.parseInt(restaurantId!))
  })
}

export default useRestaurantHashTagQuery
