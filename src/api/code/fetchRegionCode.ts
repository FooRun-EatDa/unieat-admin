import { Address } from "~/types";
import frontApiClient from "~/libs/FrontApiClient";

const fetchRegionCode = ({ sido, sgg }: Address) => async () => {
  const response = await frontApiClient.get(`/v1/search/region-code`, {
    params: {
      sido,
      sgg
    }
  })
  return await response.data.data
}

export default fetchRegionCode
