import { Address } from "~/types";
import frontApiClient from "~/libs/FrontApiClient";

const fetchRegionCode = (address: Address) => async () => {
  const response = await frontApiClient.get(`/v1/search/region-code`, {
    params: {
      ...address
    }
  })
  return await response.data.data
}

export default fetchRegionCode
