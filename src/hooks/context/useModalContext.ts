import { createContext, useContext } from "react";

interface Context {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const ModalContext = createContext<Context>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export const useModalContext = () => {
  return useContext(ModalContext)
}

