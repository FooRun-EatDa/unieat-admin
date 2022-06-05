import React from "react";
import { Container, PageTemplate } from "@component";
import { RestaurantBestContainer } from "~/container";

const LookupRestaurantBest = () => {
  return (
    <PageTemplate>
      <Container classNames={["restaurantBest"]}>
        <RestaurantBestContainer />
      </Container>
    </PageTemplate>
  )
}

export default LookupRestaurantBest
