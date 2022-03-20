import React, { useEffect, useState } from "react";
import { PageTemplate, Table, TableColumn, TableRow } from "@component";
import frontApiClient from "~/libs/FrontApiClient";

const RestaurantList = () => {
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

  return (
    <PageTemplate>
      <div className={"container"}>
        <Table
          title={"식당 콘텐츠 목록"}
          headers={["ID", "식당명"]}
          onSearch={search}
          totalCount={1523}>
          {
            restaurants ? restaurants.map((restaurant, index) => {
              const { id, name } = restaurant
              return (
                <TableRow key={index}>
                  <TableColumn align={"center"}>{id}</TableColumn>
                  <TableColumn>{name}</TableColumn>
                </TableRow>
              )
            }) : <></>
          }
        </Table>
      </div>
    </PageTemplate>
  )
}

export default RestaurantList;
