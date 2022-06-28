import React from "react";
import { RestaurantDetailBusinessHourPresenter } from "~/presenter";
import { useRestaurantBusinessHoursQuery } from "~/hooks";
import { useMutation, useQueryClient } from "react-query";
import { saveRestaurantBusinessHours } from "~/api";

interface Props {
  restaurantId?: string
}

interface SaveRestaurantBusinessHourPayload {
  restaurantId: number
  businessHours: Array<string>
}

const RestaurantDetailBusinessHourContainer = ({ restaurantId }: Props) => {
  const { data, isLoading } = useRestaurantBusinessHoursQuery(restaurantId)
  const queryClient = useQueryClient()

  const mutateSaveRestaurantBusinessHours = useMutation(({ restaurantId, businessHours }: SaveRestaurantBusinessHourPayload) => saveRestaurantBusinessHours(restaurantId, businessHours), {
    onSuccess: response => {
      alert("영업시간 변경사항 저장이 성공적으로 처리되었습니다..")
      queryClient.invalidateQueries(['fetch-restaurant-business-hour'])
    },
    onError: error => {
      alert("처리 중 오류가 발생했습니다.")
    }
  })

  const handleSubmit = (businessHours: Array<string>) => {
    mutateSaveRestaurantBusinessHours.mutate({
      restaurantId: Number.parseInt(restaurantId!),
      businessHours
    })
  }

  return (
    <RestaurantDetailBusinessHourPresenter
      data={data}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  )
}

export default RestaurantDetailBusinessHourContainer
