import React from "react";
import { PageResponse, Restaurant } from "~/types";
import { Button, Table, TableColumn, TableRow } from "@component";
import { ColorType } from "@enums";
import { useModalContext, useRestaurantListContext } from "~/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading: boolean
  data?: PageResponse<Restaurant>
}

const RestaurantListPresenter = ({ isLoading, data: restaurants }: Props) => {
  const navigate = useNavigate()
  const { page, setPage, setFilter } = useRestaurantListContext()
  const { restaurantInputModal: { open } } = useModalContext()

  const search = (params: any) => {
    setFilter(params)
  }

  const handleClickTableRow = (restaurant: Restaurant) => {
    navigate(`/restaurant/${restaurant.id}`)
  }

  const handleChangePage = (page: number) => {
    setPage(() => page)
  }

  return (
    <>
      <Table
        page={page}
        title={"식당 콘텐츠 목록"}
        headers={["ID", "식당명", "주소"]}
        isLoading={isLoading}
        onSearch={search}
        onChangePage={handleChangePage}
        lastPage={restaurants?.totalPages}
        totalCount={restaurants?.totalElements}>
        {
          restaurants?.content ? restaurants.content.map((restaurant: Restaurant, index) => {
            const { id, name, address } = restaurant
            return (
              <TableRow key={index} enableDetailButton={true} onClickDetailButton={() => handleClickTableRow(restaurant)}>
                <TableColumn align={"center"}>{id}</TableColumn>
                <TableColumn>{name}</TableColumn>
                <TableColumn>{address}</TableColumn>
              </TableRow>
            )
          }) : <></>
        }
      </Table>
      <Button
        color={ColorType.PRIMARY}
        iconWithText={true}
        icon={"add_circle_outline"}
        text={"음식점 추가하기"}
        onClick={open}
      />
    </>
  )
}

export default RestaurantListPresenter
