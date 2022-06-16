import React, { useEffect, useState } from "react";
import { Button, Modal, Table, TableColumn, TableRow, Tag } from "@component";
import { ColorType } from "@enums";
import { PageResponse, Restaurant } from "~/types";
import { useRestaurantListContext } from "~/hooks";

interface Props {
  data?: PageResponse<Restaurant>
  isOpen: boolean
  isLoading: boolean
  submitLoading: boolean
  onSubmit: (data: Array<Restaurant>) => void
}

export const restaurantBestEditModalKey = "restaurantBestEditModal"

const RestaurantBestEditModalPresenter = ({ data, isOpen, isLoading, submitLoading, onSubmit }: Props) => {
  const { page, setPage, setFilter } = useRestaurantListContext()
  const [ selectedItems, setSelectedItems ]  = useState<Array<Restaurant>>([])

  useEffect(() => {
    setSelectedItems([])
  }, [ isOpen ])

  const handleSearch = (params: any) => {
    setFilter(params)
  }

  const handleChangePage = (page: number) => {
    setPage(() => page)
  }

  const handleClickTableRow = (item: Restaurant) => () => {
    setSelectedItems(items => [ ...items, item ])
  }

  const handleSubmit = () => {
    onSubmit && onSubmit(selectedItems)
  }

  return (
    <Modal
      modalKey={restaurantBestEditModalKey}
      title={"Top 50 음식점 추가하기"}
      description={"현재 데이터베이스에 존재하는 음식점 목록을 조회하여 BEST 음식점으로 추가할 수 있습니다. 조회된 음식점을 클릭하면 대상 후보로 아래에 추가됩니다."}
      width={"60vw"} buttons={{
      right: [
        <Button color={ColorType.PRIMARY}
                text={"추가하기"}
                iconWithText={true}
                onClick={handleSubmit}
                isLoading={submitLoading}
                icon={"add_circle_outline"} />
      ]
    }}>
      <div>
        <Table
          page={page}
          title={"음식점 목록"}
          headers={["식당명", "주소"]}
          isLoading={isLoading}
          onSearch={handleSearch}
          onChangePage={handleChangePage}
          lastPage={data?.totalPages}
          totalCount={data?.totalElements}>
          {
            data?.content ? data?.content.map(item => {
              const { name, address } = item
              return (
                <TableRow onClick={handleClickTableRow(item)}>
                  <TableColumn>{ name }</TableColumn>
                  <TableColumn>{ address }</TableColumn>
                </TableRow>
              )
            }) : <></>
          }
        </Table>
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          {
            selectedItems?.map(item => {
              return (
                <Tag text={item.name} width={"auto"} margin={"5px"} />
              )
            })
          }
        </div>
      </div>
    </Modal>
  )
}

export default RestaurantBestEditModalPresenter
