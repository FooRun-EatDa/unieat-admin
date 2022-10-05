import { useState } from "react";
import moment, { Moment } from "moment";
import { Filter } from "@component";

interface Props {
  initial?: {
    filters?: Array<Filter>
  }
}

const useTable = ({ initial }: Props) => {
  const defaultGte = moment().subtract(30, 'm')
  const defaultLte = moment()

  const [ keyword, setKeyword ] = useState<string>('')
  const [ from, setFrom ]  = useState<Moment>(defaultGte)
  const [ to, setTo ]  = useState<Moment>(defaultLte)
  const [ page, setPage ] = useState<number>(0)
  const [ filters, setFilters ] = useState<Array<Filter> | undefined>(initial?.filters)

  return {
    keyword: {
      value: keyword,
      set: setKeyword
    },
    fromDateTime: {
      value: from,
      set: setFrom
    },
    toDateTime: {
      value: to,
      set: setTo
    },
    page: {
      value: page,
      set: setPage
    },
    filters: {
      value: filters,
      set: setFilters
    }
  }
}

export default useTable
