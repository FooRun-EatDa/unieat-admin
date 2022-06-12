import React, { useEffect, useState } from "react";
import { RestaurantInputModalPresenter, RestaurantListPresenter } from "~/presenter";
import { ApiResponse, Coordinate, PageResponse, Restaurant } from "~/types";
import defaultApiClient from "~/libs/DefaultApiClient";
import { useModalContext, useRestaurantListContext } from "~/hooks";
import { fetchAddressCoordinate } from "~/api";
import { useNavigate } from "react-router-dom"

const RestaurantListContainer = () => {
  const navigate = useNavigate()
  const { page, filter, offset } = useRestaurantListContext()
  const [ restaurants, setRestaurants ] = useState<PageResponse<Restaurant>>();
  const { isOpen } = useModalContext()
  const [ coordinate, setCoordinate ] = useState<Coordinate>()

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

  const fetchCoords = async (address: string) => {
    try {
      const data: Coordinate = await fetchAddressCoordinate(address)
      setCoordinate(data)
    } catch (e) {
      alert("좌표를 찾을 수 없습니다.")
    }
  }

  return (
    <>
      <RestaurantListPresenter
        isLoading={false}
        data={restaurants}
      />
      <RestaurantInputModalPresenter
        fetchedCoords={coordinate}
        fetchCoords={fetchCoords}
        isOpen={isOpen}
        onSubmit={async (isRedirect, data) => {
          const response = await defaultApiClient.post("/restaurant/simple", {
            ...data
          })
          const location = response.headers.location
          if (isRedirect) {
            navigate(location)
          }
        }}
      />
    </>
  )
}

export default RestaurantListContainer
