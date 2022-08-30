import React from "react";
import { useEventListQuery } from "~/hooks";
import { EventListPresenter } from "~/presenter";

const EventListContainer = () => {
  const { isLoading, data } = useEventListQuery()
  return (
    <>
      <EventListPresenter isLoading={isLoading} data={data} />
    </>
  )
}

export default EventListContainer
