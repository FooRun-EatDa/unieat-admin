import { createContext, Dispatch, SetStateAction, useContext } from "react";

type Context = {
  [key in 'keyword' | 'fromDateTime' | 'toDateTime' | 'page' | 'filters']?: {
    value: any
    set: Dispatch<SetStateAction<any>>
  }
}

export const TableContext = createContext<Context>({})

export const useTableContext = () => {
  return useContext(TableContext)
}

