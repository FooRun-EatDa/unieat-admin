import React from "react";
import { RestaurantBestEditModalPresenter, RestaurantBestPresenter } from "~/presenter";
import { useQuery, UseQueryResult } from "react-query";
import { Restaurant } from "~/types";
import { fetchRestaurantBest } from "~/api";
import { useModalContext } from "~/hooks";

const RestaurantBestContainer = () => {
  const { isOpen } = useModalContext()

  const { data, isLoading }: UseQueryResult<Array<Restaurant>> = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    queryKey: [ 'fetch-restaurant-best', { }],
    queryFn: fetchRestaurantBest
  })

  return (
    <>
      <RestaurantBestPresenter
        isLoading={isLoading}
        data={data}
      />
      <RestaurantBestEditModalPresenter
        isOpen={isOpen}
        onSubmit={() => {}}
      />
    </>
  )
}

export default RestaurantBestContainer
