import { useQuery, UseQueryResult } from "react-query";
import { PageResponse, Restaurant } from "~/types";
import { fetchRestaurantList } from "~/api";

interface Props {
  page: number
  offset: number
  filter: Array<any>
}

const useRestaurantListQuery = (enableQuery: boolean, { page, offset, filter }: Props): UseQueryResult<PageResponse<Restaurant>> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: enableQuery,
    queryKey: [ 'fetch-restaurant-list', { filter, offset, page, enableQuery }],
    queryFn: fetchRestaurantList({ filter, offset, page })
  })
}

export default useRestaurantListQuery
