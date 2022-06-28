import React, { useState } from "react";
import { RestaurantInputModalPresenter, RestaurantListPresenter } from "~/presenter";
import { Coordinate } from "~/types";
import defaultApiClient from "~/libs/DefaultApiClient";
import { useModalContext, useRestaurantListContext, useRestaurantListQuery } from "~/hooks";
import { fetchAddressCoordinate } from "~/api";
import { useNavigate } from "react-router-dom"

const RestaurantListContainer = () => {
  const navigate = useNavigate()
  const { page, filter, offset } = useRestaurantListContext()
  const { restaurantInputModal: { isOpen, close } } = useModalContext()
  const [ coordinate, setCoordinate ] = useState<Coordinate>()
  const [ loading, setLoading ] = useState<boolean>(false)

  const { data, isLoading } = useRestaurantListQuery(true, {
    page, filter, offset
  })

  const fetchCoords = async (address: string) => {
    try {
      setLoading(() => true)
      const data: Coordinate = await fetchAddressCoordinate(address)
      setCoordinate(data)
    } catch (e) {
      alert("좌표를 찾을 수 없습니다.")
    } finally {
      setLoading(() => false)
    }
  }

  return (
    <>
      <RestaurantListPresenter
        isLoading={isLoading}
        data={data}
      />
      <RestaurantInputModalPresenter
        fetchedCoords={coordinate}
        fetchCoords={fetchCoords}
        isLoading={loading}
        isOpen={isOpen}
        onSubmit={async (isRedirect, data) => {
          const response = await defaultApiClient.post("/restaurant", {
            id: '',
            name: data.title,
            explanation: '',
            imgUrl: '',
            content: '',
            phoneNumber: '',
            operationTime: '',
            price: '',
            district: '',
            status: '',
            ...data,
            ...data.coordinate
          })
          alert("음식점 추가가 성공적으로 처리되었습니다.")
          close()
          const location = response.headers.location
          if (isRedirect) {
            navigate(location.replaceAll('/admin', ''))
          }
        }}
      />
    </>
  )
}

export default RestaurantListContainer
