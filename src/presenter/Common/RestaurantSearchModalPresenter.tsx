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
  selectionMode?: 'single' | 'multiple'
  title?: string
  description?: string
}

export const restaurantSearchModalKey = "restaurantSearchModal"

const defaultTitle = "음식점 검색하기"
const defaultDescription = "현재 데이터베이스에 존재하는 음식점 목록을 조회합니다."

const RestaurantSearchModalPresenter = ({ data, isOpen, isLoading, submitLoading, onSubmit, selectionMode = 'single', title = defaultTitle, description = defaultDescription }: Props) => {
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
    setSelectedItems(items => {
      const newItems = [ ...items, item ]
      if (selectionMode === 'single') {
        onSubmit && onSubmit(newItems)
      }
      return newItems
    })
  }

  const handleSubmit = () => {
    onSubmit && onSubmit(selectedItems)
  }

  return (
    <Modal
      modalKey={restaurantSearchModalKey}
      title={title}
      description={description}
      width={"60vw"} buttons={{
      right: selectionMode === 'multiple' ? [
        <Button color={ColorType.PRIMARY}
                text={"추가하기"}
                iconWithText={true}
                onClick={handleSubmit}
                isLoading={submitLoading}
                icon={"add_circle_outline"} />
      ] : []
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
        {
          selectionMode === 'multiple' ? (
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              {
                selectedItems?.map(item => {
                  return (
                    <Tag text={item.name} width={"auto"} margin={"5px"} />
                  )
                })
              }
            </div>
          ) : <></>
        }
      </div>
    </Modal>
  )
}

export default RestaurantSearchModalPresenter
