import defaultApiClient from "~/libs/DefaultApiClient";

const fetchHashTagList = async () => {
  const response = await defaultApiClient.get(`/hash-tag`)
  return await response.data.data
}

export default fetchHashTagList
