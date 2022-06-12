import React, { useEffect, useState } from "react";
import { RestaurantInputModalPresenter, RestaurantListPresenter } from "~/presenter";
import { ApiResponse, PageResponse, Restaurant } from "~/types";
import defaultApiClient from "~/libs/DefaultApiClient";
import { useModalContext, useRestaurantListContext } from "~/hooks";

const RestaurantListContainer = () => {
  const { page, filter, offset } = useRestaurantListContext()
  const [ restaurants, setRestaurants ] = useState<PageResponse<Restaurant>>();
  const { isOpen } = useModalContext()

  useEffect(() => {
    fetch().catch(error => console.log(error))
  }, [ page, filter ])

  const fetch = async () => {
    const request = await defaultApiClient.get("/restaurant/search", {
      params: {
        ...filter,
        page,
        offset
      }
    })
    const response: ApiResponse<PageResponse<Restaurant>> = await request.data
    setRestaurants(response.data)
  }

  const fetchCoords = (address: string) => {

  }

  return (
    <>
      <RestaurantListPresenter
        isLoading={false}
        data={restaurants}
      />
      <RestaurantInputModalPresenter
        fetchCoords={fetchCoords}
        isOpen={isOpen}
        onSubmit={() => console.log('dd')}
      />
    </>
  )
}

export default RestaurantListContainer
