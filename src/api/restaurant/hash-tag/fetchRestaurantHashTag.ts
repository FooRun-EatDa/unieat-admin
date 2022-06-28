import defaultApiClient from "~/libs/DefaultApiClient";

const fetchRestaurantHashTag = (restaurantId: number) => async () => {
  const response = await defaultApiClient.get(`/restaurant/${restaurantId}/hash-tag`)
  return await response.data.data
}

export default fetchRestaurantHashTag
