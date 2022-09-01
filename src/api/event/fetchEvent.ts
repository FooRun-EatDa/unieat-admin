import defaultApiClient from "~/libs/DefaultApiClient";

const fetchEvent = (id: number) => async () => {
  const response = await defaultApiClient.get(`/event/${id}`)
  return await response.data.data
}

export default fetchEvent
