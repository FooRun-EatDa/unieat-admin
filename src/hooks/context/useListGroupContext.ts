import { createContext, useContext } from "react";

interface Context {
  items: Array<JSX.Element>
  selectedItems: Array<number>
  add: (index: number) => void
  remove: (index: number) => void
  isSelected: (index: number) => boolean
}

export const ListGroupContext = createContext<Context>({
  items: [],
  selectedItems: [],
  add: () => {},
  remove: () => {},
  isSelected: () => false,
})

export const useListGroupContext = () => {
  return useContext(ListGroupContext)
}

