import React, { useEffect, useState } from "react";
import { Button, Container, MultipleAttributes, PageTemplate, Row, TextBox } from "@component";
import frontApiClient from "~/libs/FrontApiClient";
import { useNavigate, useParams } from "react-router-dom";
import { Restaurant } from "~/types";
import { ColorType } from "@enums/ColorType";

const RestaurantDetail = () => {
  const navigate = useNavigate()
  const { id }  = useParams()
  const [ restaurant, setRestaurant ] = useState<Restaurant>()
  const [ isEdit, setEdit ] = useState<boolean>(false)

  useEffect(() => {
    fetch().catch(error => console.log(error))
  }, [ id ])

  const fetch = async () => {
    const request = await frontApiClient.get(`/restaurant/${id}`)
    setRestaurant(request.data.data)
  }

  const handleClickBack = () => {
    navigate(-1)
  }

  const handleClickEdit = () => {
    setEdit(true)
  }

  const handleClickMenuAdd = () => {
    setRestaurant(restaurant => {
      const assigned: Restaurant = Object.assign({}, restaurant)
      const emptyMenu = {
        name: '',
        price: 0,
        files: []
      }
      if (assigned.menus) {
        assigned.menus.push(emptyMenu)
      } else {
        assigned.menus = [emptyMenu]
      }
      console.log('assigned', assigned)
      return assigned
    })
  }

  return (
    <PageTemplate>
      <Container classNames={["restaurantDetail"]}>
        {
          restaurant ? (
            <>
              <div className={"header"}>
                <Button color={ColorType.WHITE} icon={"arrow_back"} onClick={handleClickBack} />
                <h4 className={"title"}>{restaurant.name}</h4>
                <div className={"headerIcons"}>
                  <Button color={ColorType.WHITE} icon={"refresh"} text={"기존 값으로 초기화"} iconWithText={true} onClick={handleClickEdit} show={isEdit} />
                  <Button color={ColorType.PRIMARY} classNames={["save"]} icon={"save"} text={"저장하기"} iconWithText={true} onClick={handleClickEdit} show={isEdit} />
                  <Button color={ColorType.PRIMARY} icon={"edit"} text={"수정하기"} iconWithText={true} onClick={handleClickEdit} show={!isEdit} />
                </div>
              </div>
              <TextBox label={"고유 ID"} value={restaurant.id} enable={false} />
              <TextBox label={"식당명"} value={restaurant.name} enable={isEdit} />
              <TextBox label={"주소"} value={restaurant.address} enable={isEdit} />
              <Row>
                <TextBox label={"위도"} value={restaurant.latitude} enable={isEdit} />
                <TextBox label={"경도"} value={restaurant.longitude} enable={isEdit} />
              </Row>
              <TextBox label={"전화번호"} value={restaurant.phoneNumber} enable={isEdit} />
              <TextBox label={"소개글"} value={restaurant.explanation} enable={isEdit} />
              <TextBox label={"상세설명"} value={restaurant.content} enable={isEdit} />
              <Row>
                <TextBox label={"대표 음식 가격"} value={restaurant.price} enable={isEdit} />
                <TextBox label={"학생들이 부르는 지역 명칭"} value={restaurant.district} enable={isEdit} />
              </Row>
              <MultipleAttributes
                label={"메뉴 목록"}
                onClickAdd={() => handleClickMenuAdd()}
                items={restaurant.menus}
                attributes={[
                  {
                    key: "name",
                    name: "메뉴명",
                    type: "text",
                  },
                  {
                    key: "price",
                    name: "가격",
                    type: "text",
                  },
                  {
                    key: "files",
                    name: "이미지 목록",
                    type: "image-multi"
                  }
                ]}
              />
            </>
          ) : <></>
        }
      </Container>
    </PageTemplate>
  )
}

export default RestaurantDetail
