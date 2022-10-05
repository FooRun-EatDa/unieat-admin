import defaultApiClient from "~/libs/DefaultApiClient";

const fetchCategoryCode = async () => {
  const response = await defaultApiClient.get(`/code/category`)
  return await response.data.data
}

export default fetchCategoryCode
