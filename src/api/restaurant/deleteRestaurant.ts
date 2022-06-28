import defaultApiClient from "~/libs/DefaultApiClient";

const deleteRestaurant = async (restaurantId: number) => {
  return await defaultApiClient.delete(`/restaurant/${restaurantId}`)
}

export default deleteRestaurant
