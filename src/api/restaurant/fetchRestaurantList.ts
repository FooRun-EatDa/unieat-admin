import defaultApiClient from "~/libs/DefaultApiClient";
import { ApiResponse, PageResponse, Restaurant } from "~/types";

const fetchRestaurantList = ({ filter, page, offset }: any) => async (): Promise<PageResponse<Restaurant>> => {
  const request = await defaultApiClient.get("/restaurant/search", {
    params: {
      ...filter,
      page,
      offset
    }
  })
  const response: ApiResponse<PageResponse<Restaurant>> = await request.data
  return response.data
}

export default fetchRestaurantList
