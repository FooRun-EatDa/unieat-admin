import { useQuery, UseQueryResult } from "react-query";
import { Coordinate } from "~/types";
import { fetchAddressCoordinate } from "~/api";

const useAddressCoordinateQuery = (address: string, enableQuery: boolean, onError: (error: TypeError) => void): UseQueryResult<Coordinate> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: enableQuery,
    queryKey: [ 'fetch-address-coordinate', { address }],
    queryFn: fetchAddressCoordinate(address),
    onError: onError
  })
}

export default useAddressCoordinateQuery
