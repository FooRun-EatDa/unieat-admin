import defaultApiClient from "~/libs/DefaultApiClient";
import { Event } from "~/types";

const saveEvent = async (event: Event) => {
  return await defaultApiClient.post(`/event`, {
    ...event
  })
}

export default saveEvent
