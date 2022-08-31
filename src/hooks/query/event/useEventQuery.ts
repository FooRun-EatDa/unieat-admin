import { useQuery, UseQueryResult } from "react-query";
import { Event } from "~/types";
import { fetchEvent } from "~/api";

const useEventQuery = (eventId?: string): UseQueryResult<Event> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!eventId,
    queryKey: [ 'fetch-event', { eventId }],
    queryFn: fetchEvent(Number.parseInt(eventId!))
  })
}

export default useEventQuery
