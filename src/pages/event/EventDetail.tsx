import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PageTemplate } from "@component";
import { EventDetailContainer } from "~/container";

const EventDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <PageTemplate>
      <Container classNames={["eventDetail"]}>
        <EventDetailContainer eventId={id} />
      </Container>
    </PageTemplate>
  )
}

export default EventDetail;
