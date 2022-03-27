import React, { useEffect, useState } from "react";
import { Container, PageTemplate, Table, TableColumn, TableRow } from "@component";
import defaultApiClient from "~/libs/DefaultApiClient";
import { useNavigate } from "react-router-dom";
import { ApiResponse, PageResponse, Restaurant } from "~/types";

const RestaurantList = () => {
  const navigate = useNavigate()
  const [ page, setPage ] = useState<number>(0);
  const [ offset, setOffset ] = useState<number>(10);
  const [ filter, setFilter ] = useState<any>({})
  const [ restaurants, setRestaurants ] = useState<PageResponse<Restaurant>>();

  useEffect(() => {
    fetch().catch(error => console.log(error))
  }, [ page, filter ])

  const fetch = async () => {
    const request = await defaultApiClient.get("/restaurant/search", {
      params: {
        ...filter,
        page,
        offset
      }
    })
    const response: ApiResponse<PageResponse<Restaurant>> = await request.data
    setRestaurants(response.data)
  }

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
    <PageTemplate>
      <Container>
        <Table
          page={page}
          title={"식당 콘텐츠 목록"}
          headers={["ID", "식당명", "주소"]}
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
      </Container>
    </PageTemplate>
  )
}

export default RestaurantList;
