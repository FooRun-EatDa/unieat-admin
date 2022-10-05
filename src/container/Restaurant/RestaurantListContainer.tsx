import React, { useEffect, useState } from "react";
import { RestaurantInputModalPresenter, RestaurantListPresenter } from "~/presenter";
import { Coordinate } from "~/types";
import defaultApiClient from "~/libs/DefaultApiClient";
import {
  useCategoryCodeQuery,
  useHashTagQuery,
  useModalContext,
  useRestaurantListContext,
  useRestaurantListQuery,
  useTableContext
} from "~/hooks";
import { useNavigate } from "react-router-dom"
import { Filter, FilterItem } from "@component";

const RestaurantListContainer = () => {
  const navigate = useNavigate()
  const { page, filter, offset } = useRestaurantListContext()
  const { restaurantInputModal: { isOpen, close } } = useModalContext()
  const [ coordinate, setCoordinate ] = useState<Coordinate>()
  const { filters } = useTableContext()
  const [ queryFilterList, setQueryFilterList ] = useState({})
  const { data, isLoading } = useRestaurantListQuery(true, {
    page,
    offset,
    filter: {
      ...filter,
      ...queryFilterList
    }
  })
  const categoryCodeQuery = useCategoryCodeQuery(true, () => {})
  const hashTagQuery = useHashTagQuery(true)

  useEffect(() => {
    if (filters?.value) {
      let filterList: any = {}
      filters?.value
        .map(((filter: Filter) => ({
          [filter.key]: filter.items.filter((item: FilterItem) => item.checked).map(item => item.value).join(",")
        })))
        .forEach((filter: any) => {
          filterList = { ...filterList, ...filter }
        })
      setQueryFilterList(filterList)
    }
  }, [ filters ])

  useEffect(() => {
    if (categoryCodeQuery.data) {
      filters?.set((value: any) => {
        const newArray = value ? [ ...value ] : []
        return [
          ...newArray,
          {
            text: "카테고리 포함",
            key: "categories",
            items: categoryCodeQuery.data.map(({ name, id }) => ({
              text: name,
              value: id
            }))
          }
        ]
      })
    }
  }, [ categoryCodeQuery.data ])

  useEffect(() => {
    if (hashTagQuery.data) {
      filters?.set((value: any) => {
        const newArray = value ? [ ...value ] : []
        return [
          ...newArray,
          {
            text: "해시태그 포함",
            key: "hashTags",
            items: hashTagQuery.data.map(({ content }) => ({
              text: `#${content}`,
              value: content
            }))
          }
        ]
      })
    }
  }, [ hashTagQuery.data ])

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
