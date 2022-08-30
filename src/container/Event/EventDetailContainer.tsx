import React from "react";
import { EventDetailPresenter } from "~/presenter";
import { useEventQuery } from "~/hooks";
import { useMutation, useQueryClient } from "react-query";
import { saveEvent } from "~/api";
import { Event } from "~/types";

interface Props {
  eventId?: string
}

const EventDetailContainer = ({ eventId }: Props) => {
  const { isLoading, data } = useEventQuery(eventId)
  const queryClient = useQueryClient()

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
      />
    </>
  )
}

export default EventDetailContainer
