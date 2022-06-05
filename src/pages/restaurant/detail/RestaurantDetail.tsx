import React, { useEffect, useState } from "react";
import {
  AttributeType,
  Button,
  Container,
  Divider,
  ImageList,
  MultipleAttributes,
  PageTemplate,
  Row,
  TextBox
} from "@component";
import defaultApiClient from "~/libs/DefaultApiClient";
import { useNavigate, useParams } from "react-router-dom";
import { ApiResponse, FileDetail, Restaurant, RestaurantFood } from "~/types";
import { ColorType } from "@enums";
import { useMutation } from "react-query";

const RestaurantDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [ restaurantOriginal, setRestaurantOriginal ] = useState<Restaurant>()
  const [ restaurant, setRestaurant ] = useState<Restaurant>()
  const [ foods, setFoods ] = useState<Array<RestaurantFood>>([])
  const [ images, setImages ] = useState<Array<FileDetail>>([])
  const [ isEdit, setEdit ] = useState<boolean>(false)
  const [ isEditFoods, setEditFoods ] = useState<boolean>(false)
  const [ isEditImages, setEditImages ] = useState<boolean>(false)

  const saveRestaurantMutation = useMutation((restaurant: Restaurant) => defaultApiClient.put('/restaurant', restaurant), {
    onSuccess: () => {
      alert('변경사항 저장이 성공적으로 처리되었습니다.')
      setEdit(false)
    }
  })

  const saveImagesMutation = useMutation((files: Array<FileDetail>) => defaultApiClient.put(`/restaurant/${id}/files`, files), {
    onSuccess: () => {
      alert('변경사항 저장이 성공적으로 처리되었습니다.')
      setEditImages(false)
    }
  })

  const saveFoodsMutation = useMutation((foods: Array<RestaurantFood>) => defaultApiClient.put(`/restaurant/${id}/foods`, foods), {
    onSuccess: () => {
      alert('변경사항 저장이 성공적으로 처리되었습니다.')
      setEditFoods(false)
    }
  })

  useEffect(() => {
    if (id) {
      fetch(id).catch(error => console.error(error))
      fetchFoods(id).catch(error => console.error(error))
      fetchImages(id).catch(error => console.error(error))
    }
  }, [ id ])

  useEffect(() => {
    if (!id) {
      return
    }
    if (saveRestaurantMutation.isSuccess || saveRestaurantMutation.isIdle) {
      fetch(id).catch(error => console.error(error))
      fetchFoods(id).catch(error => console.error(error))
    }
  }, [ id, saveRestaurantMutation.isIdle, saveRestaurantMutation.isSuccess ])

  const fetch = async (id: string) => {
    const request = await defaultApiClient.get(`/restaurant/${id}`)
    const response: ApiResponse<Restaurant> = request.data
    setRestaurant(response.data)
    setRestaurantOriginal({...response.data})
  }

  const fetchFoods = async (id: string) => {
    const request = await defaultApiClient.get(`/restaurant/${id}/foods`)
    const response: ApiResponse<Array<RestaurantFood>> = request.data
    setFoods(response.data)
  }

  const fetchImages = async (id: string) => {
    const request = await defaultApiClient.get(`/restaurant/${id}/files`)
    const response: ApiResponse<Array<FileDetail>> = request.data
    setImages(response.data)
  }

  const handleClickBack = () => {
    navigate(-1)
  }

  const handleClickReset = () => {
    setRestaurant(Object.assign(restaurantOriginal, {}))
  }

  const handleClickSave = () => {
    if (window.confirm('저장하시겠습니까?')) {
      if (restaurant) {
        saveRestaurantMutation.mutate(restaurant)
      }
    }
  }

  const handleClickEdit = () => {
    setEdit(true)
  }

  const handleClickFoodsEdit = () => {
    setEditFoods(true)
  }

  const handleClickFoodsSave = (foods: Array<RestaurantFood>) => {
    if (window.confirm('저장하시겠습니까?')) {
      foods.filter(food => !food.delete)
        .forEach(food => {
          food.sequence = foods.indexOf(food)
        })
      saveFoodsMutation.mutate(foods)
    }
  }

  const handleClickImagesEditIcon = () => {
    setEditImages(true)
  }

  const handleClickImagesSaveIcon = () => {
    if (window.confirm('저장하시겠습니까?')) {
      images.filter(image => !image.delete)
        .forEach(image => {
          image.sequence = images.indexOf(image)
        })
      saveImagesMutation.mutate(images)
    }
  }

  const handleChange = (key: string, value: string) => {
    setRestaurant(restaurant => ({
      ...restaurant,
      [key]: value
    } as Restaurant))
  }

  const handleChangeImages = (files: Array<FileDetail>) => {
    setImages(() => files)
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
                  <Button color={ColorType.WHITE} icon={"refresh"} text={"기존 값으로 초기화"} iconWithText={true} onClick={handleClickReset} show={isEdit} />
                  <Button color={ColorType.PRIMARY} classNames={["save"]} icon={"save"} text={"기본정보 저장하기"} iconWithText={true} onClick={handleClickSave} show={isEdit} />
                  <Button color={ColorType.PRIMARY} icon={"edit"} text={"기본정보 수정하기"} iconWithText={true} onClick={handleClickEdit} show={!isEdit} />
                </div>
              </div>
              <section className={"section"}>
                <TextBox label={"고유 ID"} value={restaurant.id} enable={false} />
                <TextBox label={"식당명"} value={restaurant.name} enable={isEdit}
                         onChange={e => handleChange('name', e.currentTarget.value)} />
                <TextBox label={"주소"} value={restaurant.address} enable={isEdit}
                         onChange={e => handleChange('address', e.currentTarget.value)}/>
                <Row>
                  <TextBox label={"위도"} value={restaurant.latitude} enable={isEdit}
                         onChange={e => handleChange('latitude', e.currentTarget.value)} />
                  <TextBox label={"경도"} value={restaurant.longitude} enable={isEdit}
                         onChange={e => handleChange('longitude', e.currentTarget.value)} />
                </Row>
                {/*<Row>*/}
                {/*  <Select*/}
                {/*    enable={isEdit}*/}
                {/*    width={"100%"}*/}
                {/*    label={"광역시/도"}*/}
                {/*    defaultValue={2}*/}
                {/*    onChange={(item) => console.log(item)}*/}
                {/*    items={[{*/}
                {/*      text: '서울',*/}
                {/*      value: 1,*/}
                {/*    }, {*/}
                {/*      text: '경기도',*/}
                {/*      value: 2,*/}
                {/*    }]}*/}
                {/*  />*/}
                {/*</Row>*/}
                <TextBox label={"전화번호"} value={restaurant.phoneNumber} enable={isEdit}
                         onChange={e => handleChange('phoneNumber', e.currentTarget.value)} />
                <TextBox label={"소개글"} value={restaurant.explanation} enable={isEdit}
                         onChange={e => handleChange('explanation', e.currentTarget.value)} />
                <TextBox label={"상세설명"} value={restaurant.content} enable={isEdit}
                         onChange={e => handleChange('content', e.currentTarget.value)} />
                <Row>
                  <TextBox label={"대표 음식 가격"} value={restaurant.price} enable={isEdit}
                         onChange={e => handleChange('price', e.currentTarget.value)} />
                  <TextBox label={"학생들이 부르는 지역 명칭"} value={restaurant.district} enable={isEdit}
                         onChange={e => handleChange('district', e.currentTarget.value)} />
                </Row>
                <Divider />
                <MultipleAttributes
                  isEdit={isEditFoods}
                  label={"메뉴 목록"}
                  defaultItems={foods}
                  empty={{
                    name: '',
                    price: 0,
                    files: []
                  }}
                  onClickEdit={handleClickFoodsEdit}
                  onClickSave={handleClickFoodsSave}
                  attributes={[
                    {
                      key: "name",
                      name: "메뉴명",
                      type: AttributeType.TEXT,
                    },
                    {
                      key: "price",
                      name: "가격",
                      type: AttributeType.TEXT,
                    },
                    {
                      key: "files",
                      name: "메뉴 이미지 목록",
                      type: AttributeType.IMAGE_MULTI
                    }
                  ]}
                />
                <Divider />
                <Row classNames={["restaurantImagesRow"]}>
                  <h3>음식점 이미지 목록</h3>
                  <ImageList
                    imageWidth={"150px"}
                    imageHeight={"100px"}
                    enableUpload={isEditImages}
                    defaultItems={images}
                    useThumbnail={true}
                    edit={isEditImages}
                    onChange={handleChangeImages}
                  />

                  <Button
                    color={ColorType.PRIMARY}
                    text={`음식점 이미지 수정하기`}
                    icon={"add_circle_outline"}
                    iconWithText={true}
                    onClick={handleClickImagesEditIcon}
                    show={!isEditImages}
                    classNames={["editButton"]}
                    width={"100%"}
                  />

                  <Button
                    color={ColorType.PRIMARY}
                    text={`음식점 이미지 저장하기`}
                    icon={"save"}
                    iconWithText={true}
                    onClick={handleClickImagesSaveIcon}
                    show={isEditImages}
                    classNames={["saveButton"]}
                    width={"100%"}
                  />
                </Row>
              </section>
            </>
          ) : <></>
        }
      </Container>
    </PageTemplate>
  )
}

export default RestaurantDetail
