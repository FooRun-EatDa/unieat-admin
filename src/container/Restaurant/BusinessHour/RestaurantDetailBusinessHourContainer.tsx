import React from "react";
import { RestaurantDetailBusinessHourPresenter } from "~/presenter";
import { useRestaurantBusinessHoursQuery } from "~/hooks";

interface Props {
  restaurantId?: string
}

const RestaurantDetailBusinessHourContainer = ({ restaurantId }: Props) => {
  const { data, isLoading } = useRestaurantBusinessHoursQuery(restaurantId)

  return (
    <RestaurantDetailBusinessHourPresenter
      data={data}
      isLoading={isLoading}
    />
  )
}

export default RestaurantDetailBusinessHourContainer
