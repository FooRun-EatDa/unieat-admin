import defaultApiClient from "~/libs/DefaultApiClient";

const deleteRestaurantHashTag = async (restaurantId: number, hashTagId: number) => {
  return await defaultApiClient.delete(`/restaurant/${restaurantId}/hash-tag/${hashTagId}`)
}

export default deleteRestaurantHashTag
