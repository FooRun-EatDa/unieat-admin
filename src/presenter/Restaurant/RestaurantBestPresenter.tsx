import React, { useState } from "react";
import { Restaurant } from "~/types";
import { KakaoMap, ListGroup, ListGroupItem } from "@component";
import { useNavigate } from "react-router-dom";
import { useModalContext, useRestaurantBestContext } from "~/hooks";

interface Props {
  isLoading: boolean
  data?: Array<Restaurant>
}

const RestaurantBestPresenter = ({ isLoading, data }: Props) => {
  const [ activeMarkerIndex, setActiveMarkerIndex ] = useState<number>(-1)
  const { restaurantSearchModal, restaurantBestRemoveConfirmModal } = useModalContext()
  const { setSelectedItems } = useRestaurantBestContext()

  const navigate = useNavigate()

  const handleClickItem = (id: number) => () => {
    navigate(`/restaurant/${id}`)
  }

  const handleMouseEnterListItem = (item: Restaurant, index: number) => () => {
    setActiveMarkerIndex(index)
  }

  const handleMouseLeaveListItem = () => {
    setActiveMarkerIndex(() => -1)
  }

  const handleClickListAddButton = () => {
    restaurantSearchModal.open()
  }

  const handleClickListRemoveButton = () => {
    restaurantBestRemoveConfirmModal.open()
  }

  const handleChangeSelectedItems = (items: Array<number>) => {
    if (data) {
      setSelectedItems(() => items.map(index => data[index]))
    }
  }

  return (
    <>
      <KakaoMap
        height={"50%"}
        level={5}
        activeMarkerIndex={activeMarkerIndex}
        markers={data?.map(({ name, latitude, longitude }, index) => ({
          title: `${index + 1}. ${name}`,
          coordinate: {
            latitude,
            longitude
          }
        }))}
      />

      <ListGroup
        title={"TOP 50 음식점 목록"}
        isLoading={isLoading}
        onChangeSelectedItems={handleChangeSelectedItems}
        onClickAdd={handleClickListAddButton}
        onClickRemove={handleClickListRemoveButton}>
        {
          !isLoading && data ? data.map((item, index) => {
            const { id, name, address, reviews, feelings, latitude, longitude } = item
            return (
              <ListGroupItem
                onMouseEnter={handleMouseEnterListItem(item, index)}
                onMouseLeave={handleMouseLeaveListItem}
                key={index}
                values={[
                  {
                    width: "30%",
                    value: name
                  },
                  {
                    width: "25%",
                    value: address
                  },
                  {
                    width: "10%",
                    value: `${reviews ? reviews?.length : 0}건의 리뷰`
                  },
                  {
                    width: "10%",
                    value: `${feelings ? feelings?.length : 0}건의 좋아요`
                  },
                  {
                    width: "5%",
                    icon: 'description',
                    align: 'center',
                    onClick: handleClickItem(id)
                  }
                ]}
              />
            )
          }) : <></>
        }
      </ListGroup>
    </>
  )
}

export default RestaurantBestPresenter
