import { createContext, Dispatch, useContext } from "react";
import { Restaurant } from "~/types";

interface Context {
  restaurant: Restaurant | undefined
  setRestaurant: Dispatch<Restaurant>
}

export const EventDetailContext = createContext<Context>({
  restaurant: undefined,
  setRestaurant: () => {}
})

export const useEventDetailContext = () => {
  return useContext(EventDetailContext)
}

