import { useQuery, UseQueryResult } from "react-query";
import { Event } from "~/types";
import { fetchEventList } from "~/api";

const useEventListQuery = (): UseQueryResult<Array<Event>> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    queryKey: [ 'fetch-event-list', { }],
    queryFn: fetchEventList
  })
}

export default useEventListQuery
