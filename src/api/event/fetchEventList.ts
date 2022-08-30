import frontApiClient from "~/libs/FrontApiClient";

const fetchEventList = async () => {
  const response = await frontApiClient.get(`/event`, {
    params: {
      page: 0
    }
  })
  return await response.data.data
}

export default fetchEventList
