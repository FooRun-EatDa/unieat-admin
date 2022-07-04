import frontApiClient from "~/libs/FrontApiClient";
import { Coordinate } from "~/types";

const fetchAddressCoordinate = (address: string) => async (): Promise<Coordinate> => {
  const response = await frontApiClient.get(`/v1/address/coordinate`, {
    params: {
      address
    }
  })
  return await response.data.data
}

export default fetchAddressCoordinate
