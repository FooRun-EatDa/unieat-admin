import { useState } from "react";

const usePopUp = () => {
  const [ isOpen, setOpen ] = useState<boolean>(false)

  const open = () => setOpen(() => true)
  const close = () => setOpen(false)

  return {
    isOpen, open, close
  }
}

export default usePopUp
