import defaultApiClient from "~/libs/DefaultApiClient";

const fetchRestaurantBusinessHours = (restaurantId: number) => async () => {
  const response = await defaultApiClient.get(`/restaurant/${restaurantId}/business-hours`)
  return await response.data.data
}

export default fetchRestaurantBusinessHours
