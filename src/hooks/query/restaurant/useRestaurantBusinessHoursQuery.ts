import { useQuery, UseQueryResult } from "react-query";
import { RestaurantBusinessHour } from "~/types";
import { fetchRestaurantBusinessHours } from "~/api";

const useRestaurantBusinessHoursQuery = (restaurantId?: string): UseQueryResult<Array<RestaurantBusinessHour>> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    queryKey: [ 'fetch-restaurant-business-hours', { restaurantId }],
    queryFn: fetchRestaurantBusinessHours(Number.parseInt(restaurantId!))
  })
}

export default useRestaurantBusinessHoursQuery
