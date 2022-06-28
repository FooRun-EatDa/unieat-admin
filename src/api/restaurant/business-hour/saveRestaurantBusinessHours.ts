import defaultApiClient from "~/libs/DefaultApiClient";

const saveRestaurantBusinessHours = async (restaurantId: number, businessHours: Array<String>) => {
  return await defaultApiClient.put(`/restaurant/${restaurantId}/business-hours`, [ ...businessHours ])
}

export default saveRestaurantBusinessHours
