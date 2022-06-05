import defaultApiClient from "~/libs/DefaultApiClient";

const fetchRestaurantBest = async () => {
  const response = await defaultApiClient.get(`/restaurant/best`)
  return await response.data.data
}

export default fetchRestaurantBest
