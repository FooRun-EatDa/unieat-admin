import React from "react";
import { RestaurantDetailHashTagPresenter } from "~/presenter";
import { useRestaurantHashTagQuery } from "~/hooks";

interface Props {
  restaurantId?: string
}

const RestaurantDetailHashTagContainer = ({ restaurantId }: Props) => {
  const { data, isLoading } = useRestaurantHashTagQuery(restaurantId)

  return (
    <RestaurantDetailHashTagPresenter
      data={data}
      isLoading={isLoading}
    />
  )
}

export default RestaurantDetailHashTagContainer
