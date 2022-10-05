import { useQuery, UseQueryResult } from "react-query";
import { CategoryCode } from "~/types";
import { fetchCategoryCode } from "~/api";

const useCategoryCodeQuery = (enableQuery: boolean, onError: (error: TypeError) => void): UseQueryResult<Array<CategoryCode>> => {
  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: enableQuery,
    queryKey: [ 'fetch-category-code', { } ],
    queryFn: fetchCategoryCode,
    onError: onError
  })
}

export default useCategoryCodeQuery
