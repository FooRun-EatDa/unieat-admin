import React, { useState } from "react";
import { Container, PageTemplate } from "@component";
import { RestaurantBestContainer } from "~/container";
import { ModalContext, RestaurantBestContext, RestaurantListContext, useModal } from "~/hooks";
import { restaurantBestRemoveConfirmModalKey, restaurantSearchModalKey } from "~/presenter";
import { Restaurant } from "~/types";

const LookupRestaurantBest = () => {
  const [ selectedItems, setSelectedItems ] = useState<Array<Restaurant>>([])
  const [ page, setPage ] = useState<number>(0);
  const [ offset ] = useState<number>(5);
  const [ filter, setFilter ] = useState<any>({})
  return (
    <RestaurantListContext.Provider value={{ page, setPage, offset, filter, setFilter }}>
      <RestaurantBestContext.Provider value={{ selectedItems: selectedItems, setSelectedItems: setSelectedItems }}>
        <ModalContext.Provider value={{
          [restaurantSearchModalKey]: useModal(),
          [restaurantBestRemoveConfirmModalKey]: useModal()
        }}>
          <PageTemplate>
            <Container classNames={["restaurantBest"]}>
              <RestaurantBestContainer />
            </Container>
          </PageTemplate>
        </ModalContext.Provider>
      </RestaurantBestContext.Provider>
    </RestaurantListContext.Provider>
  )
}

export default LookupRestaurantBest
