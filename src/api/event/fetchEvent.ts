import frontApiClient from "~/libs/FrontApiClient";

const fetchEvent = (id: number) => async () => {
  const response = await frontApiClient.get(`/event/${id}`)
  return await response.data.data
}

export default fetchEvent
