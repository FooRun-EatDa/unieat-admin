import { useQuery, UseQueryResult } from "react-query";
import { fetchHashTagList } from "~/api";
import { HashTagType } from "~/types/HashTag";

const useHashTagQuery = (enableQuery: boolean): UseQueryResult<Array<HashTagType>> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: enableQuery,
    queryKey: [ 'fetch-hash-tag-list', { enableQuery }],
    queryFn: fetchHashTagList
  })
}

export default useHashTagQuery
