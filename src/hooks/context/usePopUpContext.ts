import { createContext, useContext } from "react";

interface Context {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const PopUpContext = createContext<Context>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export const usePopUpContext = () => {
  return useContext(PopUpContext)
}

