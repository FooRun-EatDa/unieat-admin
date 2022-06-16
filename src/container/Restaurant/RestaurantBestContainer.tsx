import React, { useEffect, useState } from "react";
import { RestaurantBestEditModalPresenter, RestaurantBestPresenter } from "~/presenter";
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
  const { restaurantBestEditModal, restaurantBestRemoveConfirmModal } = useModalContext()
  const restaurantListQuery = useRestaurantListQuery(enableQuery, { page, filter, offset })
  const restaurantBestQuery = useRestaurantBestQuery()
  const queryClient = useQueryClient()

  useEffect(() => {
    setEnableQuery(restaurantBestEditModal.isOpen)
  }, [ restaurantBestEditModal.isOpen ])

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
      restaurantBestEditModal.close()
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
      <RestaurantBestEditModalPresenter
        isOpen={restaurantBestEditModal.isOpen}
        onSubmit={items => mutateSaveBests.mutate(items)}
        data={restaurantListQuery.data}
        submitLoading={mutateSaveBests.isLoading}
        isLoading={restaurantListQuery.isLoading}
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
