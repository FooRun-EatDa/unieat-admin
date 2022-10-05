import React, { useEffect, useState } from "react";
import { RestaurantBestPresenter, RestaurantSearchModalPresenter } from "~/presenter";
import { useModalContext, useRestaurantListContext } from "~/hooks";
import RestaurantBestRemoveConfirmModalPresenter
  from "../../presenter/Restaurant/RestaurantBestRemoveConfirmModalPresenter";
import useRestaurantListQuery from "../../hooks/query/restaurant/useRestaurantListQuery";
import useRestaurantBestQuery from "~/hooks/query/restaurant/useRestaurantBestQuery";
import { useMutation, useQueryClient } from "react-query";
import { Restaurant } from "~/types";
import { deleteRestaurantBests, saveRestaurantBests } from "~/api";

const RestaurantBestContainer = () => {
  const [ enableQuery, setEnableQuery ] = useState(false)
  const { page, filter, offset } = useRestaurantListContext()
  const { restaurantSearchModal, restaurantBestRemoveConfirmModal } = useModalContext()
  const restaurantListQuery = useRestaurantListQuery(enableQuery, { page, filter, offset })
  const restaurantBestQuery = useRestaurantBestQuery()
  const queryClient = useQueryClient()

  useEffect(() => {
    setEnableQuery(restaurantSearchModal.isOpen)
  }, [ restaurantSearchModal.isOpen ])

  const mutateDeleteBests = useMutation((payload: Array<Restaurant>) => deleteRestaurantBests(payload), {
    onSuccess: response => {
      alert("BEST 음식점 삭제가 성공적으로 처리되었습니다.")
      restaurantBestRemoveConfirmModal.close()
      queryClient.invalidateQueries(["fetch-restaurant-best"])
    },
    onError: error => {
      alert("처리 중 오류가 발생했습니다.")
    }
  })

  const mutateSaveBests = useMutation((payload: Array<Restaurant>) => saveRestaurantBests(payload), {
    onSuccess: response => {
      alert("BEST 음식점 추가가 성공적으로 처리되었습니다.")
      restaurantSearchModal.close()
      queryClient.invalidateQueries(["fetch-restaurant-best"])
    },
    onError: error => {
      alert("처리 중 오류가 발생했습니다.")
    }
  })

  return (
    <>
      <RestaurantBestPresenter
        isLoading={restaurantBestQuery.isLoading}
        data={restaurantBestQuery.data}
      />
      <RestaurantSearchModalPresenter
        isOpen={restaurantSearchModal.isOpen}
        onSubmit={items => mutateSaveBests.mutate(items)}
        data={restaurantListQuery.data}
        submitLoading={mutateSaveBests.isLoading}
        isLoading={restaurantListQuery.isLoading}
        selectionMode={'multiple'}
        title={"BEST 음식점 추가하기"}
        description={"현재 데이터베이스에 존재하는 음식점 목록을 조회하여 BEST 음식점으로 추가할 수 있습니다. 조회된 음식점을 클릭하면 대상 후보로 아래에 추가됩니다."}
      />
      <RestaurantBestRemoveConfirmModalPresenter
        isOpen={restaurantBestRemoveConfirmModal.isOpen}
        submitLoading={mutateDeleteBests.isLoading}
        onSubmit={items => mutateDeleteBests.mutate(items)}
      />
    </>
  )
}

export default RestaurantBestContainer
