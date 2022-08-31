import React, { useEffect, useState } from "react";
import { EventDetailPresenter, RestaurantSearchModalPresenter } from "~/presenter";
import { useEventDetailContext, useEventQuery, useModalContext, useRestaurantListContext } from "~/hooks";
import { useMutation, useQueryClient } from "react-query";
import { saveEvent } from "~/api";
import { Event, Restaurant } from "~/types";
import { useLocation } from "react-router";
import useRestaurantListQuery from "../../hooks/query/restaurant/useRestaurantListQuery";

interface Props {
  eventId?: string
}

const EventDetailContainer = ({ eventId }: Props) => {
  const { isLoading, data } = useEventQuery(eventId)
  const { pathname } = useLocation()
  const { page, filter, offset } = useRestaurantListContext()
  const { restaurantSearchModal } = useModalContext()
  const [ enableQuery, setEnableQuery ] = useState(false)
  const { setRestaurant } = useEventDetailContext()
  const restaurantListQuery = useRestaurantListQuery(enableQuery, { page, filter, offset })
  const queryClient = useQueryClient()

  useEffect(() => {
    setEnableQuery(restaurantSearchModal.isOpen)
  }, [ restaurantSearchModal.isOpen ])

  useEffect(() => {
    if (data?.restaurant) {
      setRestaurant(data.restaurant)
    }
  }, [ data ])

  const handleSubmitSearchModal = (items: Array<Restaurant>) => {
    setRestaurant(items[0])
    restaurantSearchModal.close()
  }

  const mutatePostEvent = useMutation((event: Event) => saveEvent(event), {
    onSuccess: _response => {
      alert("이벤트 정보 수정이 성공적으로 처리되었습니다.")
      queryClient.invalidateQueries(["fetch-event"])
    },
    onError: _error => {
      alert("처리 중 오류가 발생했습니다.")
    }
  })

  return (
    <>
      <EventDetailPresenter
        isLoading={isLoading}
        data={data}
        onSubmit={(event: Event) => mutatePostEvent.mutate(event)}
        mode={pathname.indexOf("/create") !== -1 ? "create" : "modify"}
      />
      <RestaurantSearchModalPresenter
        isOpen={restaurantSearchModal.isOpen}
        onSubmit={handleSubmitSearchModal}
        data={restaurantListQuery.data}
        submitLoading={false}
        isLoading={restaurantListQuery.isLoading}
        selectionMode={'single'}
        title={"음식점 선택하기"}
        description={"현재 데이터베이스에 존재하는 음식점 목록을 조회하여 이벤트를 진행하는 음식점을 선택할 수 있습니다."}
      />
    </>
  )
}

export default EventDetailContainer
