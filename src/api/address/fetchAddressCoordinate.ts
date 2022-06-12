import frontApiClient from "~/libs/FrontApiClient";

const fetchAddressCoordinate = async (address: string) => {
  const response = await frontApiClient.get(`/v1/address/coordinate`, {
    params: {
      address
    }
  })
  return await response.data.data
}

export default fetchAddressCoordinate
