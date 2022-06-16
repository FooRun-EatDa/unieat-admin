import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Restaurant } from "~/types";

interface Context {
  selectedItems: Array<Restaurant>
  setSelectedItems: Dispatch<SetStateAction<Array<Restaurant>>>
}

export const RestaurantBestContext = createContext<Context>({
  selectedItems: [],
  setSelectedItems: () => {}
})

export const useRestaurantBestContext = () => {
  return useContext(RestaurantBestContext)
}

