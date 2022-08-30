import React from "react";
import { Container, PageTemplate } from "@component";
import { EventListContainer, RestaurantListContainer } from "~/container";

const EventList = () => {
  return (
    <PageTemplate>
      <Container classNames={["eventList"]}>
        <EventListContainer />
      </Container>
    </PageTemplate>
  )
}

export default EventList;
