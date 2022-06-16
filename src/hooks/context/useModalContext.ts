import { createContext, useContext } from "react";

interface Context {
  [key: string]: {
    isOpen: boolean
    open: () => void
    close: () => void
  }
}

export const ModalContext = createContext<Context>({
  _: {
    isOpen: false,
    open: () => {},
    close: () => {},
  }
})

export const useModalContext = () => {
  return useContext(ModalContext)
}

