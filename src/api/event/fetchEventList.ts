import defaultApiClient from "~/libs/DefaultApiClient";

const fetchEventList = async () => {
  const response = await defaultApiClient.get(`/event`, {
    params: {
      page: 0
    }
  })
  return await response.data.data
}

export default fetchEventList
