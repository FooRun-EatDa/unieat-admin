import React from "react";
import { Container, PageTemplate } from "@component";
import { RestaurantBestContainer } from "~/container";
import { ModalContext, useModal } from "~/hooks";

const LookupRestaurantBest = () => {
  const { isOpen, open, close } = useModal()

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      <PageTemplate>
        <Container classNames={["restaurantBest"]}>
          <RestaurantBestContainer />
        </Container>
      </PageTemplate>
    </ModalContext.Provider>
  )
}

export default LookupRestaurantBest
