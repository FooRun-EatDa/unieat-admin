import { RefObject, useEffect } from "react";

interface Props<T> {
  ref: RefObject<T>
  onClick: () => void
}

const useClickOutsideOfRef = <T extends HTMLElement>({ ref, onClick }: Props<T>) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref && !ref.current?.contains(e.target)) {
        onClick && onClick()
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }, [ onClick, ref ])
}

export default useClickOutsideOfRef
