import React from "react";
import { RestaurantBestPresenter } from "~/presenter";
import { useQuery, UseQueryResult } from "react-query";
import { Restaurant } from "~/types";
import { fetchRestaurantBest } from "~/api";

const RestaurantBestContainer = () => {
  const { data, isLoading }: UseQueryResult<Array<Restaurant>> = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    queryKey: [ 'fetch-restaurant-best', { }],
    queryFn: fetchRestaurantBest
  })

  return (
    <RestaurantBestPresenter
      isLoading={isLoading}
      data={data}
    />
  )
}

export default RestaurantBestContainer
