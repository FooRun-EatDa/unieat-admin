import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface Context {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  filter: any
  setFilter: Dispatch<SetStateAction<any>>
  offset: number
}

export const RestaurantListContext = createContext<Context>({
  page: 0,
  setPage: () => {},
  filter: {},
  setFilter: () => {},
  offset: 10,
})

export const useRestaurantListContext = () => {
  return useContext(RestaurantListContext)
}

