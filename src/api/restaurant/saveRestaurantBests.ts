import defaultApiClient from "~/libs/DefaultApiClient";
import { Restaurant } from "~/types";

const saveRestaurantBests = async (payload: Array<Restaurant>) => {
  return await defaultApiClient.post(`/restaurant/best`, {
    restaurantIds: [ ...payload.map(restaurant => restaurant.id)  ]
  })
}

export default saveRestaurantBests
