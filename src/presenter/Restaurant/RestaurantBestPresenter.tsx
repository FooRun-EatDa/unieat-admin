import React from "react";
import { Restaurant } from "~/types";
import { ListGroup, ListGroupItem } from "@component";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading: boolean
  data?: Array<Restaurant>
}

const RestaurantBestPresenter = ({ isLoading, data }: Props) => {
  const navigate = useNavigate()

  const handleClickItem = (id: number) => () => {
    navigate(`/restaurant/${id}`)
  }

  return (
    <ListGroup title={"TOP 50 음식점 목록"}>
      {
        !isLoading ? data?.map((item, index) => {
          const { id, name, address, reviews, feelings } = item
          return (
            <ListGroupItem
              onClick={handleClickItem(id)}
              key={index}
              values={[
                {
                  width: "30%",
                  value: name
                },
                {
                  width: "30%",
                  value: address
                },
                {
                  width: "10%",
                  value: `${reviews?.length}건의 리뷰`
                },
                {
                  width: "10%",
                  value: `${feelings ? feelings?.length : 0}건의 좋아요`
                }
              ]}
            />
          )
        }) : <></>
      }
    </ListGroup>
  )
}

export default RestaurantBestPresenter
