import React, { useState } from "react";
import { RestaurantInputModalPresenter, RestaurantListPresenter } from "~/presenter";
import { Coordinate } from "~/types";
import defaultApiClient from "~/libs/DefaultApiClient";
import { useModalContext, useRestaurantListContext, useRestaurantListQuery } from "~/hooks";
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

  return (
    <>
      <RestaurantListPresenter
        isLoading={isLoading}
        data={data}
      />
      <RestaurantInputModalPresenter
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
            title: data.title,
            address: data.address.address,
            districtCode: data.address.districtCode,
            latitude: data.address.coordinate?.latitude,
            longitude: data.address.coordinate?.longitude,
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
