import defaultApiClient from "~/libs/DefaultApiClient";
import { Restaurant } from "~/types";

const deleteRestaurantBests = async (payload: Array<Restaurant>) => {
  return await defaultApiClient.delete(`/restaurant/best`, {
    params: {
      restaurantIds: payload.map(restaurant => restaurant.id).join(",")
    }
  })
}

export default deleteRestaurantBests
