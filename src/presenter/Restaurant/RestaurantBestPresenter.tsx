import React, { useEffect, useState } from "react";
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
  const [ items, setItems ] = useState<Array<Restaurant> | undefined>(data)

  const navigate = useNavigate()

  useEffect(() => {
    setItems(data)
  }, [ data ])

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

  const handleChangeFilterText = (text: string) => {
    setItems(() => {
      return data?.filter(item => item.name.indexOf(text) !== -1)
    })
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
        title={"BEST 음식점 목록"}
        isLoading={isLoading}
        onFilterText={handleChangeFilterText}
        onChangeSelectedItems={handleChangeSelectedItems}
        onClickAdd={handleClickListAddButton}
        onClickRemove={handleClickListRemoveButton}>
        {
          !isLoading && items ? items.map((item, index) => {
            const { id, name, address, reviews, feelings, latitude, longitude } = item
            return (
              <ListGroupItem
                onMouseEnter={handleMouseEnterListItem(item, index)}
                onMouseLeave={handleMouseLeaveListItem}
                boldIndices={[1]}
                key={index}
                values={[
                  {
                    width: "5%",
                    value: index + 1
                  },
                  {
                    width: "25%",
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
