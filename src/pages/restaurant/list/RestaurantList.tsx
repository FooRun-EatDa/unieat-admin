import React, { useState } from "react";
import { Container, PageTemplate } from "@component";
import { ModalContext, RestaurantListContext, useModal } from "~/hooks";
import { restaurantInputModalKey } from "~/presenter";
import { RestaurantListContainer } from "~/container";

const RestaurantList = () => {
  const [ page, setPage ] = useState<number>(0);
  const [ offset ] = useState<number>(10);
  const [ filter, setFilter ] = useState<any>({})
  const { isOpen, open, close } = useModal()

  return (
    <RestaurantListContext.Provider value={{ page, setPage, offset, filter, setFilter }}>
      <ModalContext.Provider value={{
        [restaurantInputModalKey]: {
          isOpen, open, close
        }
      }}>
        <PageTemplate>
          <Container>
            <RestaurantListContainer />
          </Container>
        </PageTemplate>
      </ModalContext.Provider>
    </RestaurantListContext.Provider>
  )
}

export default RestaurantList;
