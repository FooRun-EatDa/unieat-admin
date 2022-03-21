import React, { useEffect, useState } from "react";
import { Container, PageTemplate, Table, TableColumn, TableRow } from "@component";
import frontApiClient from "~/libs/FrontApiClient";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "~/types";

const RestaurantList = () => {
  const navigate = useNavigate()
  const [ page, setPage ] = useState(0);
  const [ restaurants, setRestaurants ] = useState([]);

  useEffect(() => {
    fetch().catch(error => console.log(error))
  }, [ page ])

  const fetch = async () => {
    const request = await frontApiClient.get("/restaurant", {
      params: {
        page
      }
    })
    setRestaurants(request.data.data)
  }

  const search = (params: any) => {
    setPage(params.page)
  }

  const handleClickTableRow = (restaurant: Restaurant) => {
    navigate(`/restaurant/${restaurant.id}`)
  }

  return (
    <PageTemplate>
      <Container>
        <Table
          title={"식당 콘텐츠 목록"}
          headers={["ID", "식당명"]}
          onSearch={search}
          totalCount={1523}>
          {
            restaurants ? restaurants.map((restaurant: Restaurant, index) => {
              const { id, name } = restaurant
              return (
                <TableRow key={index} enableDetailButton={true} onClickDetailButton={() => handleClickTableRow(restaurant)}>
                  <TableColumn align={"center"}>{id}</TableColumn>
                  <TableColumn>{name}</TableColumn>
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
