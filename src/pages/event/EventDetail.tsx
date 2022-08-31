import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, PageTemplate } from "@component";
import { EventDetailContainer } from "~/container";
import { restaurantSearchModalKey } from "~/presenter";
import { RestaurantListContext, EventDetailContext, ModalContext, useModal } from "~/hooks";
import { Restaurant } from "~/types";

const EventDetail = () => {
  const { id } = useParams()
  const [ restaurant, setRestaurant ] = useState<Restaurant | undefined>()
  const [ page, setPage ] = useState<number>(0);
  const [ offset ] = useState<number>(5);
  const [ filter, setFilter ] = useState<any>({})
  return (
    <RestaurantListContext.Provider value={{ page, setPage, offset, filter, setFilter }}>
      <EventDetailContext.Provider value={{ restaurant, setRestaurant }}>
        <ModalContext.Provider value={{
          [restaurantSearchModalKey]: useModal(),
        }}>
          <PageTemplate>
            <Container classNames={["eventDetail"]}>
              <EventDetailContainer eventId={id} />
            </Container>
          </PageTemplate>
        </ModalContext.Provider>
      </EventDetailContext.Provider>
    </RestaurantListContext.Provider>
  )
}

export default EventDetail;
