import defaultApiClient from "~/libs/DefaultApiClient";

const saveRestaurantHashTag = async (restaurantId: number, hashTagIds: Array<number>) => {
  return await defaultApiClient.put(`/restaurant/${restaurantId}/hash-tag`, [ ...hashTagIds ])
}

export default saveRestaurantHashTag
