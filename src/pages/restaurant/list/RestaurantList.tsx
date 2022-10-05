import React, { useState } from "react";
import { Container, PageTemplate } from "@component";
import { ModalContext, RestaurantListContext, TableContext, useModal } from "~/hooks";
import { restaurantInputModalKey } from "~/presenter";
import { RestaurantListContainer } from "~/container";
import useTable from "~/hooks/state/useTable";

const RestaurantList = () => {
  const [ page, setPage ] = useState<number>(0);
  const [ offset ] = useState<number>(10);
  const [ filter, setFilter ] = useState<any>({})
  const { isOpen, open, close } = useModal()
  const tableState = useTable({
    initial: {}
  })

  return (

    <RestaurantListContext.Provider value={{ page, setPage, offset, filter, setFilter }}>
      <TableContext.Provider value={tableState}>
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
      </TableContext.Provider>
    </RestaurantListContext.Provider>
  )
}

export default RestaurantList;
